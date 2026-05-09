'use client';

import { useState } from 'react';
import { agency, contactBranches, contactPackages } from '@/ui/marketing/data';

export function ContactForm() {
  const [status, setStatus] = useState('');
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get('name') ?? '').trim();
    const email = String(fd.get('email') ?? '').trim();
    const branch = String(fd.get('branch') ?? '');
    const paket = String(fd.get('paket') ?? '');
    const message = String(fd.get('message') ?? '').trim();
    const company = String(fd.get('company') ?? '');
    if (!name || !email) {
      setStatus('Bitte Name und E-Mail ausfüllen.');
      return;
    }
    setPending(true);
    setStatus('');
    try {
      const res = await fetch('/api/marketing/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, email, branch, paket, message, company })
      });
      if (res.ok) {
        setStatus('Danke — wir haben Deine Nachricht erhalten und melden uns bald.');
        form.reset();
        setPending(false);
        return;
      }
      if (res.status === 503) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setStatus(body.error ?? 'Server-Mail ist nicht konfiguriert. Es öffnet sich Dein E-Mail-Programm …');
        const mailBody = [
          `Name: ${name}`,
          `E-Mail: ${email}`,
          `Branche: ${branch}`,
          `Paket-Interesse: ${paket}`,
          '',
          message
        ].join('\n');
        const url = `mailto:${agency.email}?subject=${encodeURIComponent(`Anfrage – ${name}`)}&body=${encodeURIComponent(mailBody)}`;
        window.location.href = url;
        setPending(false);
        return;
      }
      const err = (await res.json().catch(() => ({ error: 'Senden fehlgeschlagen.' }))) as { error?: string };
      setStatus(err.error ?? 'Senden fehlgeschlagen.');
    } catch {
      setStatus('Netzwerkfehler. Bitte später erneut versuchen oder uns direkt per E-Mail schreiben.');
    }
    setPending(false);
  }

  return (
    <form className="fm-contact-form" onSubmit={handleSubmit}>
      <input type="text" name="company" autoComplete="off" tabIndex={-1} aria-hidden style={{ display: 'none' }} />
      <div className="fm-contact-form__grid">
        <label className="fm-contact-field">
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" required disabled={pending} />
        </label>
        <label className="fm-contact-field">
          <span>E-Mail</span>
          <input name="email" type="email" autoComplete="email" required disabled={pending} />
        </label>
        <label className="fm-contact-field">
          <span>Branche</span>
          <select name="branch" defaultValue="" disabled={pending}>
            <option value="" disabled>
              Bitte wählen
            </option>
            {contactBranches.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>
        <label className="fm-contact-field">
          <span>Paket-Interesse</span>
          <select name="paket" defaultValue="" disabled={pending}>
            <option value="" disabled>
              Bitte wählen
            </option>
            {contactPackages.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <label className="fm-contact-field fm-contact-field--full">
          <span>Ihre Nachricht</span>
          <textarea name="message" rows={6} placeholder="Kurz beschreiben, was Du brauchst …" disabled={pending} />
        </label>
      </div>
      <button type="submit" className="button" style={{ marginTop: 20 }} disabled={pending}>
        {pending ? 'Wird gesendet …' : 'Anfrage senden'}
      </button>
      {status ? <p className="fm-contact-status">{status}</p> : null}
      <p className="fm-contact-legal">
        Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten gemäß unserer{' '}
        <a href="/datenschutz" style={{ textDecoration: 'underline' }}>
          Datenschutzerklärung
        </a>{' '}
        zu.
      </p>
    </form>
  );
}
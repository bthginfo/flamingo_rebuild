'use client';

import { useState } from 'react';
import { agency, contactBranches, contactPackages } from '@/ui/marketing/data';

export function ContactForm() {
  const [status, setStatus] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get('name') ?? '').trim();
    const email = String(fd.get('email') ?? '').trim();
    const branch = String(fd.get('branch') ?? '');
    const paket = String(fd.get('paket') ?? '');
    const message = String(fd.get('message') ?? '').trim();
    if (!name || !email) {
      setStatus('Bitte Name und E-Mail ausfüllen.');
      return;
    }
    const body = [
      `Name: ${name}`,
      `E-Mail: ${email}`,
      `Branche: ${branch}`,
      `Paket-Interesse: ${paket}`,
      '',
      message
    ].join('\n');
    const url = `mailto:${agency.email}?subject=${encodeURIComponent(`Anfrage – ${name}`)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    setStatus('Dein E-Mail-Programm sollte sich öffnen …');
  }

  return (
    <form className="fm-contact-form" onSubmit={handleSubmit}>
      <div className="fm-contact-form__grid">
        <label className="fm-contact-field">
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label className="fm-contact-field">
          <span>E-Mail</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label className="fm-contact-field">
          <span>Branche</span>
          <select name="branch" defaultValue="">
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
          <select name="paket" defaultValue="">
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
          <textarea name="message" rows={6} placeholder="Kurz beschreiben, was Du brauchst …" />
        </label>
      </div>
      <button type="submit" className="button" style={{ marginTop: 20 }}>
        Anfrage senden
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

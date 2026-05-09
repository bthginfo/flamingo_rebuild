'use client';

export function InternalCrmLogoutButton() {
  return (
    <button
      type="button"
      className="button secondary"
      onClick={async () => {
        await fetch('/api/internal/crm/logout', { method: 'POST' });
        window.location.href = '/internal/crm/login';
      }}
    >
      Logout
    </button>
  );
}

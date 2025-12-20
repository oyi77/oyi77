'use client';

export default function DesktopGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-dark-bg grid-pattern overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-surface to-dark-bg opacity-50" />
      {children}
    </div>
  );
}


import { Children } from 'react';

export default function SectionHeader({ title, children }) {
  return (
    <div className="mb-4">
      <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
      {children}
    </div>
  );
}

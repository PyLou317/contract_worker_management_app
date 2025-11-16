import { Children } from 'react';

export default function SectionHeader({ title, children, addClasses }) {
  return (
    <>
      <div className={`mb-4 ${addClasses}`}>
        <h3 className="text-2xl font-semibold">{title}</h3>
        {children}
      </div>
      <div className="border-b border-gray-200 mt-6 mb-10"></div>
    </>
  );
}

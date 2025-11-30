export default function SettingCardWrapper({ children }) {
  return (
    <div className="flex w-full items-center mb-2 px-6 py-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:scale-101 transition-transform duration-200">
      {children}
    </div>
  );
}

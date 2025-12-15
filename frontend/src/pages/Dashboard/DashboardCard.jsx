import '@/utilities/toolTipStyles.css';

export default function WorkerSkillList({
  className,
  heading,
  subHeading,
  children,
}) {
  return (
    <>
      <div
        className={`overflow-x-auto my-4 bg-white rounded-2xl shadow-md items-center space-x-4 hover:scale-101 transition-transform duration-200 ${className}`}
      >
        <div className="pt-4 px-4">
          <h1 className="font-semibold text-xl text-gray-900">{heading}</h1>
          <small className="text-xs text-gray-500">{subHeading}</small>
        </div>
        {children}
      </div>
    </>
  );
}

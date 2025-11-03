import Input from './StandardInput';

export default function LabeledInput({ label, id, labelClasses, ...props }) {
  return (
    <div className="relative">
      <Input id={id} {...props} />
      <label
        htmlFor={id}
        className={`peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 absolute text-gray-500 left-0 -top-4.5 text-sm transition-all cursor-text ${labelClasses}`}
      >
        {label}
      </label>
    </div>
  );
}

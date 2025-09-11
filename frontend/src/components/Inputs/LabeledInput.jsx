import Input from './StandardInput';

export default function LabeledInput({ label, id, labelClasses, ...props }) {
  return (
    <div>
      <label
        htmlFor={id}
        className={labelClasses}
      >
        {label}
      </label>
      <Input id={id} {...props} />
    </div>
  );
}
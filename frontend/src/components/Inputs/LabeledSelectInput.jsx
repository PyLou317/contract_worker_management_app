import Input from './SelectInput';

export default function LabeledInput({ label, id, inputClasses, ...props }) {
  return (
    <div>
      <label
        htmlFor={id}
        className={inputClasses}
      >
        {label}
      </label>
      <Input id={id} {...props} label={label} />
    </div>
  );
}
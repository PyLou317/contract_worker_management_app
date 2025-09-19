import Input from './SelectInput';

export default function LabeledInput({ label, id, labelClasses, ...props }) {
  return (
    <div>
      <label
        htmlFor={id}
        className={labelClasses}
      >
        {label}
      </label>
      <Input id={id} {...props} label={label} />
    </div>
  );
}
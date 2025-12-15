import CapitalizeFirstLetter from '@/utilities/capitalizeFirstLetter';

export default function FloatingSelectInput(props) {
  const { label, id, value, options, className, ...restProps } = props;

  const isFloating = !!value;

  const labelClasses = `
    absolute transition-all duration-200 pointer-events-none 
    ${
      isFloating
        ? 'left-0 -top-4.5 text-sm text-gray-500'
        : 'left-3 top-1/2 -translate-y-1/2 text-base text-gray-400'
    }
  `;

  const vowels = ['a', 'e', 'i', 'o', 'u'];

  // Determine the placeholder text
  let placeholder;
  if (label) {
    const isVowel = vowels.includes(label[0].toLowerCase());
    placeholder = isVowel ? `Select an ${label}` : `Select a ${label}`;
  } else {
    placeholder = 'Select an option';
  }

  const validOptions = Array.isArray(options) ? options : [];

  return (
    <div className="relative w-full">
      <select
        {...restProps}
        value={value}
        className={`
          peer p-2 block w-full placeholder-transparent caret-gray-800 text-gray-800 border-b-2 border-b-gray-500 appearance-none focus:border-yellow-500 focus:outline-none ${
            className || ''
          }
        `}
      >
        {/* Label */}
        <option value="" disabled hidden></option>

        {validOptions.map((option) => (
          <option
            key={option.value ? option.value : option}
            value={option.value ? option.value : option}
          >
            {option.label
              ? CapitalizeFirstLetter(option.label)
              : CapitalizeFirstLetter(option)}
          </option>
        ))}
      </select>
      <label htmlFor={id} className={labelClasses}>
        {isFloating ? label : placeholder}
      </label>
    </div>
  );
}

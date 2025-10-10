import React from 'react';

export default function SelectInput(props) {
  const { label, value, options, className, ...restProps } = props;
  const vowels = ['a', 'e', 'i', 'o', 'u'];

  // Determine the placeholder text
  let placeholder;
  if (label) {
    const isVowel = vowels.includes(label[0].toLowerCase());
    placeholder = isVowel ? `Select an ${label}` : `Select a ${label}`;
  } else {
    placeholder = 'Select an option';
  }

  const placeholderValue = '';

  // Check if options is valid before mapping (a defensive measure)
  const validOptions = Array.isArray(options) ? options : [];

  return (
    <div>
      <select
        {...restProps}
        value={value}
        className={`
          mt-1 p-2 block w-full rounded-md shadow-sm
          focus:ring-blue-500 focus:border-blue-500
          ${className || ''}
        `}
      >
        <option value={placeholderValue} disabled>
          {placeholder}
        </option>

        {validOptions.map((option) => (
          <option
            key={option.value ? option.value : option}
            value={option.value ? option.value : option}
          >
            {option.label ? option.label : option}
          </option>
        ))}
      </select>
    </div>
  );
}

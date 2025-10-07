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
    placeholder = "Select an option";
  }

  // Determine the default value for the placeholder option
  // Use an empty string so the placeholder is selected when props.value is empty/null/undefined
  const placeholderValue = "";

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
        
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
export default function SelectInput(props) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];

  const isVowel = vowels.includes(props.label[0].toLowerCase());

  let firstOption = '';
  if (isVowel) {
    firstOption = <option value="">Select an {props.label}</option>;
  } else {
    firstOption = <option value="">Select a {props.label}</option>;
  }

  return (
    <div>
      <select
        {...props}
        className={`
        mt-1 p-2 block w-full rounded-md shadow-sm
        focus:ring-blue-500 focus:border-blue-500
        ${props.className || ''}
      `}
      >
        {firstOption}
        {props.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

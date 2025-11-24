export default function Input(props) {
  return (
    <input
      {...props}
      className={`
        peer p-2 block w-full placeholder-transparent border-b-2 border-b-gray-500 focus:border-yellow-500 focus:outline-none
        ${props.className || ''}
      `}
      placeholder={props.placeholder}
    />
  );
}

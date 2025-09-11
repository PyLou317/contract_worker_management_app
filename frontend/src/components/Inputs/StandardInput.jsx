export default function Input(props) {
  return (
    <div>
      <input
        {...props}
        className={`
        mt-1 p-2 block w-full rounded-md shadow-sm
        focus:ring-blue-500 focus:border-blue-500
        ${props.className || ''}
      `}
      />
    </div>
  );
}

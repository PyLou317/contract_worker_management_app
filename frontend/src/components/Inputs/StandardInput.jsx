export default function InputDiv({ label, value, onChange, type, id, name, ...props }) {
  return (
    <div>
      <label htmlFor="first_name" className="block text-sm font-medium text-gray-200">
        {label}
      </label>
      <input
        {...props}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required
        autoFocus
        className="mt-1 p-2 block w-full rounded-md border bg-gray-800 border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  );
}

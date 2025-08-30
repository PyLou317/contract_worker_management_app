export default function SelectInput({ label, type, id, name, value, onChange, options }) {

  return (
    <div>
      <label htmlFor="current_contract" className="block text-sm font-medium text-gray-200">
        {label}
      </label>
      <select
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="mt-1 p-2 block w-full rounded-md bg-gray-800 border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

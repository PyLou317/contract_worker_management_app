export default function InlineField({
  label,
  name,
  value,
  editValue,
  isEditing,
  onChange,
}) {
  const inputStyle =
    'bg-gray-100 border border-gray-300 rounded-md px-1 w-full box-border';
  const displayStyle = 'px-1';

  return (
    <div className="flex mb-1">
      <div className="flex-grow">
        {isEditing ? (
          <input
            type="text"
            name={name}
            value={editValue}
            onChange={onChange}
            className={inputStyle}
          />
        ) : (
          <div className={displayStyle}>{value}</div>
        )}
      </div>
    </div>
  );
}

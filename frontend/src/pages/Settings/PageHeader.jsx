import AddBtn from '@/pages/SEttings/SettingsAddBtn';
import capitalizeFirstLetter from '@/utilities/capitalizeFirstLetter';

export default function PageHeader({ label, count }) {
  return (
    <div className="flex justify-between items-start">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Active {capitalizeFirstLetter(label)}
        </h1>
        <small>
          Active {label} count: {count}
        </small>
      </div>
      <AddBtn label={`Add ${capitalizeFirstLetter(label)}`} />
    </div>
  );
}

import Input from '../../Inputs/LabeledInput';
import SelectInput from '../../Inputs/LabeledSelectInput';

export default function WorkerDetails({ formData, handleInputChange, agencyNames, selectInputClasses }) {
  return (
    <>
      <h3 className="text-2xl font-semibold text-white mb-4 mt-12">Work Details</h3>
      <div>
        <div className="grid grid-cols-2 gap-4">
          <SelectInput
            label="Agency"
            type="text"
            id="agency"
            name="agency"
            value={formData.agency}
            onChange={handleInputChange}
            options={agencyNames}
            className={selectInputClasses}
          />
          <Input
            label="Manager"
            type="text"
            id="manager"
            name="manager"
            value={formData.manager}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full rounded-md bg-gray-800 border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="border-b border-gray-700 mt-4"></div>
    </>
  );
}

import Input from '@/components/Inputs/LabeledInput';
import SelectInput from '@/components/Inputs/LabeledSelectInput';

export default function AddSkill({
  addSkillIsVisible,
  handleAddSkill,
  handleAddSkillInputChange,
  newSkillFormData,
  skillNames,
  addSkillInputClasses,
  inputLabelClasses,
}) {
  return (
    <div
      className={`overflow-hidden transition-all duration-500 ease-in-out ${
        addSkillIsVisible ? 'max-h-[400px]' : 'max-h-0'
      }`}
    >
      <div className="p-4 rounded-xl shadow-sm border border-gray-700 bg-gray-100">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-700">New Skill</h3>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <SelectInput
            label="Skill"
            type="text"
            id="skill_name"
            name="skill_name"
            value={newSkillFormData.skill_name}
            onChange={handleAddSkillInputChange}
            options={skillNames}
            className={addSkillInputClasses}
            labelClasses={inputLabelClasses}
            required
          />
          <Input
            label="Level"
            type="number"
            step="1"
            min="1"
            max="5"
            id="level"
            name="level"
            value={newSkillFormData.level}
            onChange={handleAddSkillInputChange}
            required
            className={addSkillInputClasses}
            labelClasses={inputLabelClasses}
          />
          <Input
            label="Certification Date"
            type="date"
            id="certification_date"
            name="certification_date"
            value={newSkillFormData.certification_date}
            onChange={handleAddSkillInputChange}
            required
            className={addSkillInputClasses}
            labelClasses={inputLabelClasses}
          />
          <Input
            label="Expiration Date"
            type="date"
            id="expiration_date"
            name="expiration_date"
            value={newSkillFormData.expiration_date}
            onChange={handleAddSkillInputChange}
            required
            className={addSkillInputClasses}
            labelClasses={inputLabelClasses}
          />
        </div>
        <button
          type="button"
          className="px-4 py-2 mt-4 w-full text-black bg-yellow-400 font-medium rounded-lg hover:bg-yellow-300 transition-colors"
          onClick={handleAddSkill}
        >
          Add Skill
        </button>
      </div>
    </div>
  );
}

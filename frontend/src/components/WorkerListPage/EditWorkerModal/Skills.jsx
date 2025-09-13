import Input from '../../Inputs/LabeledInput';
import AddSkill from './AddSkill';

export default function Skills({
  addSkillIsVisible,
  toggleAddSkillVisibility,
  handleAddSkill,
  handleAddSkillInputChange,
  newSkillFormData,
  skillNames,
  inputLabelClasses,
  addSkillInputClasses,
  formData,
  handleWorkerSkillChange,
}) {
  return (
    <>
      <div className="flex justify-between items-center align-baseline mt-12">
        <div>
          <h2 className="text-2xl font-semibold text-white">Skills</h2>
        </div>
        <button type="button" onClick={toggleAddSkillVisibility} className="font-semibold cursor-pointer">
          {addSkillIsVisible ? 'Cancel' : '+ Add Skill'}
        </button>
      </div>
      <AddSkill
        addSkillIsVisible={addSkillIsVisible}
        handleAddSkill={handleAddSkill}
        handleAddSkillInputChange={handleAddSkillInputChange}
        newSkillFormData={newSkillFormData}
        skillNames={skillNames}
        inputLabelClasses={inputLabelClasses}
        addSkillInputClasses={addSkillInputClasses}
      />
      <div className="grid grid-cols-1 gap-4 mt-4">
        {formData.worker_skills &&
          formData.worker_skills.map((workerSkill, index) => (
            <div key={index} className="p-4 rounded-xl shadow-sm border border-gray-700 bg-gray-800">
              <h3 className="font-semibold text-white mb-4">Skill Name: {workerSkill.skill.skill_name}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Input
                  label="Level"
                  type="number"
                  step="1"
                  min="1"
                  max="10"
                  id={`level-${index}`}
                  name={`level-${index}`}
                  value={workerSkill.level || ''}
                  onChange={(e) => handleWorkerSkillChange(index, 'level', e.target.value)}
                  className="mt-1 p-2 block w-full rounded-md bg-gray-800 border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <Input
                  label="Certification Date"
                  type="date"
                  id={`cert-date-${index}`}
                  name={`certification_date-${index}`}
                  value={workerSkill.certification_date || ''}
                  onChange={(e) => handleWorkerSkillChange(index, 'certification_date', e.target.value)}
                  className="mt-1 p-2 block w-full rounded-md bg-gray-800 border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <Input
                  label="Expiration Date"
                  type="date"
                  id={`exp-date-${index}`}
                  name={`expiration_date-${index}`}
                  value={workerSkill.expiration_date || ''}
                  onChange={(e) => handleWorkerSkillChange(index, 'expiration_date', e.target.value)}
                  className="mt-1 p-2 block w-full rounded-md bg-gray-800 border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}
      </div>
      <div className="border-b border-gray-700 mt-4"></div>
    </>
  );
}

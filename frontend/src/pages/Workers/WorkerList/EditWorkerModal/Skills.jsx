import Section from './Section';
import Input from '@/components/Inputs/LabeledInput';
import AddSkill from './AddSkill';
import SectionHeader from '../../../../components/SectionHeader';

export default function Skills({
  addSkillIsVisible,
  toggleAddSkillVisibility,
  handleAddSkill,
  handleAddSkillInputChange,
  newSkillFormData,
  skillNames,
  formData,
  handleWorkerSkillChange,
}) {
  return (
    <Section>
      <div className="flex justify-between items-center align-baseline">
        <SectionHeader title="Skills" />
        <button
          type="button"
          onClick={toggleAddSkillVisibility}
          className="font-semibold cursor-pointer"
        >
          {addSkillIsVisible ? 'Cancel' : '+ Add Skill'}
        </button>
      </div>
      <AddSkill
        addSkillIsVisible={addSkillIsVisible}
        handleAddSkill={handleAddSkill}
        handleAddSkillInputChange={handleAddSkillInputChange}
        newSkillFormData={newSkillFormData}
        skillNames={skillNames}
      />
      <div className="grid grid-cols-1 gap-4 mt-4">
        {formData.worker_skills &&
          formData.worker_skills.map((workerSkill, index) => (
            <div key={index} className="p-4 rounded-xl shadow-sm bg-white">
              <h3 className="font-semibold text-gray-800 mb-2">
                {workerSkill.skill.skill_name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 mt-8">
                <Input
                  label="Level"
                  type="number"
                  step="1"
                  min="1"
                  max="10"
                  id={`level-${index}`}
                  name={`level-${index}`}
                  placeholder="Level"
                  value={workerSkill.level || ''}
                  onChange={(e) =>
                    handleWorkerSkillChange(index, 'level', e.target.value)
                  }
                />
                <Input
                  label="Certification Date"
                  type="date"
                  id={`cert-date-${index}`}
                  name={`certification_date-${index}`}
                  placeholder="Certification Date"
                  value={workerSkill.certification_date || ''}
                  onChange={(e) =>
                    handleWorkerSkillChange(
                      index,
                      'certification_date',
                      e.target.value
                    )
                  }
                />
                <Input
                  label="Expiration Date"
                  type="date"
                  id={`exp-date-${index}`}
                  name={`expiration_date-${index}`}
                  placeholder="Expiration Date"
                  value={workerSkill.expiration_date || ''}
                  onChange={(e) =>
                    handleWorkerSkillChange(
                      index,
                      'expiration_date',
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          ))}
      </div>
    </Section>
  );
}

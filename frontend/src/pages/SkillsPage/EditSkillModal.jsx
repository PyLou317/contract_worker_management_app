import { useContext, useRef } from 'react';
import { SkillsContext } from './skills-page-ctx';

import Input from '@/components/Inputs/LabeledInput';
import SelectInput from '@/components/Inputs/LabeledSelectInput';
import CancelBtn from '@/components/Buttons/CancelBtn';
import SubmitBtn from '@/components/Buttons/SubmitBtn';
import ColorSelector from './ColorSelector';

export default function EditSkillModal({ skillId }) {
  const { showEditSkillModal, onClose, handleSubmit, formData } = useContext(SkillsContext);
  const dialogRef = useRef(null);

  const skillNames = ['Skill 1', 'Skill 2', 'Skill 3'];

  const {
    data: skillData,
    isPending: skillIsPending,
    error: skillError,
  } = useQuery({
    queryKey: ['skill', skillId],
    queryFn: () => getWorkerDetails({ skillId: skillId }),
    enabled: !!skillId, // Only run this query if an ID exists
  });

  function getAcronym(str) {
    if (!str) {
      return '';
    }
    return str
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase();
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Temporary variable to hold the updated data
    let newData = { ...formData, [name]: value };

    // If skill_name changes, update the acronym
    if (name === 'skill_name') {
      newData.abreviation = getAcronym(value);
    }
    setFormData(newData);
  };

  const inputFieldClasses =
    'mt-1 p-2 block w-full rounded-md border bg-gray-800 border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500';
  const inputLabelClasses = 'block text-sm font-medium text-gray-200';
  const selectInputClasses = 'bg-gray-800 text-gray-200 border border-gray-400 text-gray-200';

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
        showEditSkillModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-gray-800/75 absolute inset-0" onClick={onClose}></div>
      <dialog
        ref={dialogRef}
        className={` bg-gray-900 text-white p-8 rounded-2xl shadow-xl max-w-lg w-full transform transition-transform duration-300 relative ${
          showEditSkillModal ? 'scale-100' : 'scale-95'
        }`}
        open={showEditSkillModal}
        onClose={onClose}
      >
        <div className="flex justify-between items-center pb-3">
          <h3 className="text-2xl font-semibold text-white">Edit Skill</h3>
          <button onClick={onClose} className="text-gray-200 hover:text-gray-700">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <SelectInput
            label="Skill Name"
            type="text"
            id="skill_name"
            name="skill_name"
            value={''}
            onChange={handleInputChange}
            options={skillNames}
            className={selectInputClasses}
          />
          <Input
            type="text"
            id="abreviation"
            name="abreviation"
            label="Abreviation"
            value={''}
            onChange={handleInputChange}
            className={inputFieldClasses}
            labelClasses={inputLabelClasses}
          />
          <Input
            type="text"
            id="description"
            name="description"
            label="Description"
            value={''}
            onChange={handleInputChange}
            className={inputFieldClasses}
          />
          <ColorSelector
            extraClasses="bg-gray-800 border-gray-400 text-white"
            onColorChange={(color) => setFormData({ ...formData, base_color: color })}
          />
          <div className="mt-6 flex justify-end gap-3">
            <CancelBtn onClick={onClose} label="Cancel" />
            <SubmitBtn
              label="Save Changes"
              //   disabled={addWorkerMutation.isPending}
            />
          </div>
        </form>
      </dialog>
    </div>
  );
}

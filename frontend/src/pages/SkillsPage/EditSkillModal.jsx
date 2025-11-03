import { useEffect, useContext, useRef, useState } from 'react';
import { SkillsContext } from './skills-page-ctx';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/utilities/apiClient';

import Input from '@/components/Inputs/LabeledInput';
import SelectInput from '@/components/Inputs/FloatingSelectInput';
import CancelBtn from '@/components/Buttons/CancelBtn';
import SubmitBtn from '@/components/Buttons/SubmitBtn';
import ColorSelector from './ColorSelector';
import skillColorClasses from './SkillColorClasses';

const colors = Object.keys(skillColorClasses);

export default function EditSkillModal({ skillId }) {
  const { showEditSkillModal, onClose, handleSubmit } =
    useContext(SkillsContext);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const dialogRef = useRef(null);

  const [formData, setFormData] = useState({
    skill_name: '',
    abreviation: '',
    base_color: '',
    description: '',
  });

  const {
    data: skillData,
    isPending: skillIsPending,
    error: skillError,
  } = useQuery({
    queryKey: ['skill', skillId],
    queryFn: () => apiFetch(`/skills/${skillId}`),
    enabled: !!skillId,
  });

  useEffect(() => {
    if (skillData) {
      setFormData({
        skill_name: skillData.skill_name,
        abreviation: skillData.abreviation,
        base_color: skillData.base_color,
        description: skillData.description,
      });

      setSelectedColor(skillData.base_color);
    }
  }, [skillData]);

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
    console.log(newData);

    // If skill_name changes, update the acronym
    if (name === 'skill_name') {
      newData.abreviation = getAcronym(value);
    }
    setFormData(newData);
  };

  const handleColorSelectChange = (e) => {
    const color = e.target.value;
    setSelectedColor(color);
    setFormData({ ...formData, base_color: color });
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
        showEditSkillModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-gray-800/75 absolute inset-0" onClick={onClose}></div>
      <dialog
        ref={dialogRef}
        className={` bg-white text-white p-8 rounded-2xl shadow-xl max-w-lg w-full transform transition-transform duration-300 relative ${
          showEditSkillModal ? 'scale-100' : 'scale-95'
        }`}
        open={showEditSkillModal}
        onClose={onClose}
      >
        <div className="flex justify-between items-center pb-3">
          <h3 className="text-2xl font-semibold text-gray-800">Edit Skill</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8 mt-8">
          <Input
            label="Skill Name"
            type="text"
            id="skill_name"
            name="skill_name"
            placeholder="Skill Name"
            value={formData.skill_name}
            onChange={handleInputChange}
          />
          <Input
            label="Abreviation"
            type="text"
            id="abreviation"
            name="abreviation"
            placeholder="Abreviation"
            value={formData.abreviation}
            onChange={handleInputChange}
          />
          <div className="flex flex-row items-center gap-4 w-full">
            <SelectInput
              label="Color"
              type="text"
              id="base_color"
              name="base_color"
              value={formData.base_color}
              onChange={handleColorSelectChange}
              options={colors}
              required
              className="flex-grow-1"
            />
            <div
              className={`h-10 w-10 rounded-lg border border-gray-300 shadow-lg transition-all duration-300 ${skillColorClasses[selectedColor][1]}`}
            ></div>
          </div>
          {/* <ColorSelector
            onColorChange={(color) =>
              setFormData({ ...formData, base_color: color })
            }
          /> */}
          <div className="relative">
            <textarea
              id="description"
              name="description"
              rows={1}
              value={formData.description}
              placeholder="Description"
              onChange={handleInputChange}
              className="peer p-2 block w-full placeholder-transparent bg-white rounded-t-lg caret-gray-800 text-gray-800 border-b-2 border-b-gray-600 focus:border-yellow-500 focus:outline-none mt-12"
            ></textarea>
            <label
              htmlFor="comment"
              className="peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 absolute text-gray-500 left-0 -top-5.5 text-sm transition-all cursor-text"
            >
              Description
            </label>
          </div>
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

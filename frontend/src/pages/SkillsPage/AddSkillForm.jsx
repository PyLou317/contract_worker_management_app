import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import ColorSelector from './ColorSelector';
import addSkill from '@/hooks/addSkill';
import SubmitButton from '@/components/Buttons/SubmitBtn';
import getAcronym from '@/utilities/getAcronym';

export default function AddSkillForm() {
  const [formData, setFormData] = useState({
    skill_name: '',
    abreviation: '',
    base_color: '',
    description: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newData = { ...formData, [name]: value };
    if (name === 'skill_name') {
      newData.abreviation = getAcronym(value);
    }
    setFormData(newData);
  };

  const queryClient = useQueryClient();
  const addSkillMutation = useMutation({
    mutationFn: addSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      setFormData({
        skill_name: '',
        abreviation: '',
        base_color: '',
        description: '',
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    },
    onError: (error) => {
      console.error('Error adding skill:', error);
      alert('Failed to add skill. Please try again. ' + error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    addSkillMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto p-8 bg-white shadow-xl rounded-2xl">
      {showSuccess && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">Skill added successfully!</span>
        </div>
      )}
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">Add New Skill</h1>
      <div className="flex flex-col">
        <div className="flex flex-col xl:flex-row gap-4 items-baseline">
          <div>
            <label className="block text-gray-700 text-xs font-bold mb-2 grow" htmlFor="skill_name">
              Skill Name
            </label>
            <input
              className="border border-gray-600 rounded-lg shadow-md p-2 w-full h-[40px] bg-white  focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="skill_name"
              name="skill_name"
              onChange={handleInputChange}
              value={formData.skill_name}
              placeholder="Ex: First Aid"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="abreviation">
              Abreviation
            </label>
            <input
              className="border border-gray-600 rounded-lg shadow-md p-2 w-20 h-[40px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="abreviation"
              name="abreviation"
              onChange={handleInputChange}
              value={formData.abreviation}
              placeholder="FA"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="description">
              Description
            </label>
            <input
              className="border border-gray-600 rounded-lg shadow-md p-2 w-full lg:w-lg h-[40px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="description"
              name="description"
              onChange={handleInputChange}
              value={formData.description}
              placeholder="Ex: Level 1 First Aid certification completed by Red Cross"
            />
          </div>
          <ColorSelector onColorChange={(color) => setFormData({ ...formData, base_color: color })} />
        </div>
        <SubmitButton
          type="submit"
          label="Add Skill"
          disabled={addSkillMutation.isPending}
          className="px-4 py-2 mt-8 w-full bg-yellow-400 font-medium rounded-lg hover:bg-yellow-300 transition-colors"
        />
      </div>
    </form>
  );
}

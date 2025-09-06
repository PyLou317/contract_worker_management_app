import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import ColorSelector from './ColorSelector';
import addSkill from '../../api/addSkill';

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

    // Temporary variable to hold the updated data
    let newData = { ...formData, [name]: value };

    // If skill_name changes, update the acronym
    if (name === 'skill_name') {
      newData.abreviation = getAcronym(value);
    }
    setFormData(newData);
  };

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
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Add New Skill</h1>
      <div className="flex flex-col">
        <div className="flex flex-row gap-4 items-baseline">
          <div>
            <label className="block text-gray-700 text-xs font-bold mb-2 grow" htmlFor="skill_name">
              Skill Name
            </label>
            <input
              className="border rounded-lg p-2 w-[320px] h-[40px] focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="border rounded-lg p-2 w-[80px] h-[40px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="abreviation"
              name="abreviation"
              onChange={handleInputChange}
              value={formData.abreviation}
              placeholder="FA"
              required
            />
          </div>
          {/* <div>
            <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="level">
              Level
            </label>
            <select
              className="border rounded-lg p-2 w-fullh-[40px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="level"
              name="level"
              onChange={handleInputChange}
              value={formData.level}
              required
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="4">5</option>
            </select>
          </div> */}
          {/* <div>
            <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="skill_name">
              Certification Date
            </label>
            <input
              className="border rounded-lg p-2 h-[40px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="date"
              id="certification_date"
              name="certification_date"
              onChange={handleInputChange}
              value={formData.certification_date}
            />
          </div> */}
          {/* <div>
            <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="skill_name">
              Expiration Date
            </label>
            <input
              className="border rounded-lg p-2 h-[40px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="date"
              id="expiration_date"
              name="expiration_date"
              onChange={handleInputChange}
              value={formData.expiration_date}
            />
          </div> */}
          <div>
            <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="description">
              Description
            </label>
            <input
              className="border rounded-lg p-2 w-[455px] h-[40px] focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <button
          type="submit"
          className="px-4 py-2 mt-4 w-full bg-yellow-300 text-stone-500 font-medium rounded-lg hover:bg-yellow-400 hover:text-stone-600 transition-colors"
          disabled={addSkillMutation.isPending}
        >
          Add Skill
        </button>
      </div>
    </form>
  );
}

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Input from '@/components/Inputs/LabeledInput';
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
    <>
      {showSuccess && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">Skill added successfully!</span>
        </div>
      )}
      <div className="container mx-auto p-8 bg-white shadow-xl rounded-2xl lg:w-3/4 w-full mb-16">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Add New Skill
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4">
            <Input
              label="Skill Name"
              type="text"
              id="skill_name"
              name="skill_name"
              placeholder="Skill Name"
              value={formData.skill_name}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Abbreviation"
              type="text"
              id="abreviation"
              name="abreviation"
              placeholder="Abbreviation"
              onChange={handleInputChange}
              value={formData.abreviation}
              required
            />
            {/* <Input
          label="Description"
          type="text"
          id="description"
          name="description"
          placeholder="Description"
          onChange={handleInputChange}
          value={formData.description}
          /> */}
            <ColorSelector
              onColorChange={(color) =>
                setFormData({ ...formData, base_color: color })
              }
            />
          </div>
          <div className="relative">
            <textarea
              id="description"
              name="description"
              rows={2}
              value={formData.description}
              placeholder="Description"
              onChange={handleInputChange}
              className="peer p-2 block w-full placeholder-transparent bg-white rounded-t-lg caret-gray-800 text-gray-800 border-b-2 border-b-gray-600 focus:border-yellow-500 focus:outline-none mt-12"
            ></textarea>
            <label
              htmlFor="comment"
              className="peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 absolute text-gray-400 left-0 -top-5.5 text-sm transition-all cursor-text"
            >
              Description
            </label>
          </div>
          <SubmitButton
            type="submit"
            label="Add Skill"
            disabled={addSkillMutation.isPending}
            className="px-4 py-2 mt-8 w-full bg-yellow-400 font-medium rounded-lg hover:bg-yellow-300 transition-colors"
          />
        </form>
      </div>
    </>
  );
}

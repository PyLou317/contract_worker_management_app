import { useState, useRef } from 'react';
import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import refreshToken from '../../api/refreshToken';
import attemptFetch from '../../api/attemptFetch';
import Input from '../Inputs/LabeledInput';
import SelectInput from '../Inputs/LabeledSelectInput';

import { getAgencies } from '../../api/getAgencyDataApi';
import { getWorkerDetails } from '../../api/getWorkerDetailApi';
import { fetchData } from '../../api/fetchData';
import { editWorker } from '../../api/editWorker';

export default function EditWorkerModal({ showModal, onClose, editingWorker, id }) {
  const contract = ['Hello Fresh'];
  const [addSkillIsVisible, setAddSkillIsVisible] = useState(false);
  const [newSkill, setNewSkill] = useState([]);
  const [newSkillFormData, setNewSkillFormData] = useState({
    skill_name: '',
    level: '',
    certification_date: '',
    expiration_date: '',
  });

  const {
    data: skillData,
    isPending: skillsIsPending,
    error: skillsError,
  } = useQuery({
    queryKey: ['skill'],
    queryFn: () => fetchData({ api: 'skills' }),
    keepPreviousData: true,
  });

  const skills = skillData?.results || [];
  const skillNames = skills.map((skill) => skill.skill_name);

  const {
    data: workerData,
    isPending: workerIsPending,
    error: workerError,
  } = useQuery({
    queryKey: ['worker', id],
    queryFn: () => getWorkerDetails({ workerId: id }),
    enabled: !!id, // Only run this query if an ID exists
  });

  const {
    data: agenciesData,
    isPending: agenciesPending,
    error: agenciesError,
  } = useQuery({
    queryKey: ['agencies'],
    queryFn: getAgencies,
    keepPreviousData: true,
  });

  const agencies = agenciesData?.results || [];
  const agencyNames = agencies.map((agency) => agency.name);
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    agency: '',
    manager: '',
    comment: '',
    attendance_score: '',
    performance_score: '',
    communication_score: '',
    skills_score: '',
    skills: [],
  });

  useEffect(() => {
    // Check if workerData is not null or undefined
    if (workerData) {
      const ratings = workerData.ratings?.[0] || [];
      const skills = workerData.worker_skills || [];

      setFormData({
        first_name: workerData.first_name || '',
        last_name: workerData.last_name || '',
        email: workerData.email || '',
        phone_number: workerData.phone_number || '',
        agency: workerData.agency_details || '',
        manager: ratings.manager ? `${ratings.manager.first_name || ''} ${ratings.manager.last_name || ''}`.trim() : '',
        comment: ratings.comment || '',
        attendance_score: ratings.attendance_score || '',
        performance_score: ratings.performance_score || '',
        communication_score: ratings.communication_score || '',
        skills_score: ratings.skills_score || '',
        skills: skills,
      });
      console.log(skills);
    }
  }, [workerData]);

  const dialogRef = useRef(null);

  const editWorkerMutation = useMutation({
    mutationFn: editWorker,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['worker'] });
    },
    onError: (error) => {
      console.error('Error editing worker:', error);
      alert('Failed to edit worker. Please try again. ' + error.message);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleWorkerSkillChange = (index, field, value) => {
    setFormData((prevData) => {
      const newSkills = [...prevData.skills];
      newSkills[index] = {
        ...newSkills[index],
        [field]: value,
      };
      return { ...prevData, skills: newSkills };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit button clicked', formData, id);
    console.log(formData);
    editWorkerMutation.mutate({ formData, id });
  };

  const toggleAddSkillVisibility = () => {
    setAddSkillIsVisible(!addSkillIsVisible);
    console.log('Form Data:', formData);
    console.log('Skills');
  };

  const handleAddSkillInputChange = (e) => {
    const { name, value } = e.target;
    setNewSkillFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(newSkillFormData);
  };

  const handleAddSkill = (e) => {
    const selectedSkill = skills.find((skill) => skill.skill_name === newSkillFormData.skill_name);

    if (
      selectedSkill &&
      newSkillFormData.level &&
      newSkillFormData.certification_date &&
      newSkillFormData.expiration_date
    ) {
      setFormData((prevData) => ({
        ...prevData,
        skills: [
          ...prevData.skills,
          {
            skill: selectedSkill, // Use the full skill object
            level: newSkillFormData.level,
            certification_date: newSkillFormData.certification_date,
            expiration_date: newSkillFormData.expiration_date,
          },
        ],
      }));

      // Reset the new skill form and hide it
      setNewSkillFormData({
        skill_name: '',
        level: '',
        certification_date: '',
        expiration_date: '',
      });
      setAddSkillIsVisible(false);
    } else {
      alert('Please fill in all fields for the new skill.');
    }
  };

  // Conditionally render based on loading/error states
  if (workerIsPending || agenciesPending || skillsIsPending) {
    return <div>Loading worker data...</div>;
  }
  if (workerError) {
    return <div>Error loading worker data: {workerError.message}</div>;
  }
  if (agenciesPending) {
    return <div>Loading agencies...</div>;
  }
  if (agenciesError) {
    return <div>Error loading agencies: {agenciesError.message}</div>;
  }
  if (skillsError) {
    return <div>Error loading skills data: {skillsError.message}</div>;
  }

  const inputLabelClasses = 'block text-sm font-medium text-gray-700';
  const addSkillInputClasses = 'bg-white text-gray-900 border border-gray-400 text-gray-200';
  const selectInputClasses = 'bg-gray-800 text-gray-200 border border-gray-400 text-gray-200';

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
        showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-gray-800/75 absolute inset-0" onClick={onClose}></div>
      <dialog
        ref={dialogRef}
        className={` bg-gray-900 text-white p-8 rounded-2xl shadow-xl w-full sm:w-2/3 md:w-1/2 transform transition-transform duration-300 relative h-full sm:h-screen md:h-3/4 overflow-y-auto ${
          showModal ? 'scale-100' : 'scale-95'
        }`}
        open={showModal}
        onClose={onClose}
      >
        <div className="flex justify-between pb-3 mb-8 border-b border-gray-700">
          <h3 className="text-4xl font-semibold text-white">Edit Worker</h3>
          <button onClick={onClose} className="text-gray-200 hover:text-gray-700">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <h3 className="text-2xl font-semibold text-white mb-4">Personal Details</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              required
              className="bg-gray-800 border border-gray-400"
            />
            <Input
              label="Last Name"
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              required
              className="bg-gray-800 border border-gray-400"
            />
            <Input
              label="Email"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="bg-gray-800 border border-gray-400"
            />
            <Input
              label="Phone Number"
              type="text"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              required
              className="bg-gray-800 border border-gray-400"
            />
          </div>

          <div className="border-b border-gray-700 mt-4"></div>

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

          <div className="flex justify-between items-center align-baseline mt-12">
            <div>
              <h2 className="text-2xl font-semibold text-white">Ratings</h2>
              <small>Each rating is out of 5 and will produce an average overal rating</small>
            </div>
            <p className="text-black font-semibold text-center bg-yellow-300 px-4 py-2 rounded-md">
              Average Rating:{' '}
              {workerData.ratings?.[0]?.average_rating ? workerData.ratings?.[0]?.average_rating : 'N/A'}
            </p>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-4">
            <Input
              step="0.25"
              min="0"
              max="5"
              label="Attendance"
              type="number"
              id="attendance_score"
              name="attendance_score"
              value={formData.attendance_score}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full rounded-md bg-gray-800 border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <Input
              step="0.25"
              min="0"
              max="5"
              label="Communication"
              type="number"
              id="communication_score"
              name="communication_score"
              value={formData.communication_score}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full rounded-md bg-gray-800 border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <Input
              step="0.25"
              min="0"
              max="5"
              label="Performance"
              type="number"
              id="performance_score"
              name="performance_score"
              value={formData.performance_score}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full rounded-md bg-gray-800 border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <Input
              step="0.25"
              min="0"
              max="5"
              label="Skills"
              type="number"
              id="skills_score"
              name="skills_score"
              value={formData.skills_score}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full rounded-md bg-gray-800 border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="border-b border-gray-700 mt-4"></div>

          <div className="flex justify-between items-center align-baseline mt-12">
            <div>
              <h2 className="text-2xl font-semibold text-white">Skills</h2>
            </div>
            <button type="button" onClick={toggleAddSkillVisibility} className="font-semibold cursor-pointer">
              {addSkillIsVisible ? 'Cancel' : '+ Add Skill'}
            </button>
          </div>
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              addSkillIsVisible ? 'max-h-[400px]' : 'max-h-0'
            }`}
          >
            <div className={`p-4 rounded-xl shadow-sm border border-gray-700 bg-gray-200 `}>
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-700">New Skill</h3>
                <button
                  className="font-semibold px-4 py-2 text-gray-900 bg-yellow-200 rounded-md hover:bg-yellow-300 hover:text-gray-700"
                  onClick={handleAddSkill}
                >
                  Add
                </button>
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
                  inputClasses={inputLabelClasses}
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
                  inputClasses={inputLabelClasses}
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
                  inputClasses={inputLabelClasses}
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
                  inputClasses={inputLabelClasses}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4">
            {formData.skills &&
              formData.skills.map((workerSkill, index) => (
                <div key={index} className="p-4 rounded-xl shadow-sm border border-gray-700 bg-gray-800">
                  <h3 className="font-semibold text-white mb-4">Skill Name: {workerSkill.skill.skill_name}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  </div>
                </div>
              ))}
          </div>
          <div className="border-b border-gray-700 mt-4"></div>
          <div>
            <h3 className="text-2xl font-semibold text-white mt-12">Comments</h3>
            <div>
              <textarea
                id="comment"
                name="comment"
                rows={3}
                value={formData.comment}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full rounded-md bg-gray-800 border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
              disabled={editWorkerMutation.isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              disabled={editWorkerMutation.isPending}
            >
              {editWorkerMutation.isPending ? 'Adding...' : editingWorker ? 'Save Changes' : 'Add Worker'}
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}

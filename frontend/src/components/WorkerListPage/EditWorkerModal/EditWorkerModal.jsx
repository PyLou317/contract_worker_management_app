import { useState, useRef } from 'react';
import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Header from './Header';
import PersonalDetails from './PersonalDetails';
import WorkerDetails from './WorkerDetails';
import Ratings from './Ratings';
import Skills from './Skills';
import Comments from './Comments';
import CancelBtn from '../../Buttons/CancelBtn';
import SubmitBtn from '../../Buttons/SubmitBtn';

import { getAgencies } from '../../../api/getAgencyDataApi';
import { getWorkerDetails } from '../../../api/getWorkerDetailApi';
import { fetchData } from '../../../api/fetchData';
import { editWorker } from '../../../api/editWorker';

export default function EditWorkerModal({ showModal, onClose, editingWorker, id }) {
  const [addSkillIsVisible, setAddSkillIsVisible] = useState(false);
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
  console.log('Worker Data:', workerData);

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

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    agency: '',
    rating: {},
    worker_skills: [],
  });

  useEffect(() => {
    // Check if workerData is not null or undefined
    if (workerData) {
      const rating = workerData.rating || {};
      const skills = workerData.worker_skills || [];

      const skillsArray = Array.isArray(skills) ? skills : [skills];

      setFormData({
        first_name: workerData.first_name || '',
        last_name: workerData.last_name || '',
        email: workerData.email || '',
        phone_number: workerData.phone_number || '',
        agency: workerData.agency_details || '',
        rating: {
          id: rating.id || null,
          attendance_score: rating.attendance_score || '',
          communication_score: rating.communication_score || '',
          performance_score: rating.performance_score || '',
          skills_score: rating.skills_score || '',
          comment: rating.comment || '',
        },
        worker_skills: skillsArray,
      });
    }
  }, [workerData]);

  const dialogRef = useRef(null);
  const queryClient = useQueryClient();

  const editWorkerMutation = useMutation({
    mutationFn: (payload) => editWorker(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['worker'] });
      queryClient.invalidateQueries({ queryKey: ['workers'] });
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
      const newSkills = [...prevData.worker_skills];
      newSkills[index] = {
        ...newSkills[index],
        [field]: value,
      };
      return { ...prevData, worker_skills: newSkills };
    });
  };

  const handleRatingChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newRating = {
        ...prevData.rating,
        [name]: value,
      };
      return {
        ...prevData,
        rating: newRating,
      };
    });
  };

  const toggleAddSkillVisibility = () => {
    setAddSkillIsVisible(!addSkillIsVisible);
  };

  const handleAddSkillInputChange = (e) => {
    const { name, value } = e.target;
    setNewSkillFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
        worker_skills: [
          ...prevData.worker_skills,
          {
            skill: selectedSkill,
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const ratingsId = workerData.rating?.[0]?.id || null;

    const ratingPayload = {
      ...formData.rating, // Spread all properties from the state first
      id: ratingsId, // Then, explicitly set the 'id' to the correct value
    };

    const skillsPayload = formData.worker_skills.map((workerSkill) => {
      return {
        id: workerSkill.id,
        skill: workerSkill.skill, // Corrected: Send the full skill object
        level: workerSkill.level,
        certification_date: workerSkill.certification_date,
        expiration_date: workerSkill.expiration_date,
      };
    });

    const finalPayload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone_number: formData.phone_number,
      agency: formData.agency,
      rating: formData.rating,
      worker_skills: skillsPayload,
    };
    console.log('Final Payload:', finalPayload);
    editWorkerMutation.mutate({ formData: finalPayload, id });
    onClose();
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
        <Header onClick={onClose} />
        <form>
          <PersonalDetails formData={formData} handleInputChange={handleInputChange} />
          <WorkerDetails
            formData={formData}
            handleInputChange={handleInputChange}
            agencyNames={agencyNames}
            selectInputClasses={selectInputClasses}
          />
          <Ratings workerData={workerData} formData={formData} handleInputChange={handleRatingChange} />
          <Skills
            addSkillIsVisible={addSkillIsVisible}
            toggleAddSkillVisibility={toggleAddSkillVisibility}
            handleAddSkill={handleAddSkill}
            handleAddSkillInputChange={handleAddSkillInputChange}
            newSkillFormData={newSkillFormData}
            skillNames={skillNames}
            inputLabelClasses={inputLabelClasses}
            addSkillInputClasses={addSkillInputClasses}
            formData={formData}
            handleWorkerSkillChange={handleWorkerSkillChange}
          />
          <Comments formData={formData} handleInputChange={handleRatingChange} />
          <div className="mt-6 flex justify-end gap-3">
            <CancelBtn onClick={onClose} disabled={editWorkerMutation.isPending} label="Cancel" />
            <SubmitBtn
              label={editWorkerMutation.isPending ? 'Adding...' : editingWorker ? 'Save Changes' : 'Add Worker'}
              disabled={editWorkerMutation.isPending}
              handleSubmit={handleSubmit}
            />
          </div>
        </form>
      </dialog>
    </div>
  );
}

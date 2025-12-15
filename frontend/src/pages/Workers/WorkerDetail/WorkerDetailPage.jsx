import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { apiFetch } from '@/utilities/apiClient';
import sendData from '@/hooks/sendData';

import Loader from '@/components/Loader';
import SucessNotification from '@/components/SuccessNotification';
import PageContainer from '@/components/PageContainer';
import PersonalDetails from '@/pages/Workers/WorkerList/EditWorkerModal/PersonalDetails.jsx';
import WorkerDetails from '@/pages/Workers/WorkerList/EditWorkerModal/WorkerDetails.jsx';
import Ratings from '@/pages/Workers/WorkerList/EditWorkerModal/Ratings.jsx';
import Skills from '@/pages/Workers/WorkerList/EditWorkerModal/Skills.jsx';
import Comments from '@/pages/Workers/WorkerList/EditWorkerModal/Comments.jsx';
import SubmitBtn from '@/components/Buttons/SubmitBtn';
import SectionHeader from '@/components/SectionHeader';
import { NavLink, useParams } from 'react-router';

export default function WorkerDetailPage() {
  const { workerId } = useParams();
  const successRef = useRef();
  const loader = <Loader size="6" />;
  const [showSuccess, setShowSuccess] = useState(false);
  const [addSkillIsVisible, setAddSkillIsVisible] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
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
    queryFn: () => apiFetch('/skills'),
    keepPreviousData: true,
  });
  const skills = skillData?.results || [];
  const skillNames = skills.map((skill) => skill.skill_name);

  const {
    data: workerData,
    isPending: workerIsPending,
    error: workerError,
  } = useQuery({
    queryKey: ['worker', workerId],
    queryFn: () => apiFetch(`/workers/${workerId}`),
    enabled: !!workerId,
  });

  const {
    data: agenciesData,
    isPending: agenciesPending,
    error: agenciesError,
  } = useQuery({
    queryKey: ['agencies'],
    queryFn: () => apiFetch('/agencies'),
    keepPreviousData: true,
  });
  const agencies = agenciesData?.results || [];
  const agencyNames = agencies.map((agency) => {
    return {
      label: agency.name,
      value: agency.id,
    };
  });

  const {
    data: managersData,
    isPending: managersPending,
    error: managersError,
  } = useQuery({
    queryKey: ['managers'],
    queryFn: () => apiFetch('/managers'),
    keepPreviousData: true,
  });
  const managers = managersData?.results || [];
  const managerNames = managers.map((agency) => {
    return {
      label: agency.name,
      value: agency.id,
    };
  });

  const [initialData, setInitialData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    agency: '',
    manager: '',
    rating: {},
    worker_skills: [],
  });

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    agency: '',
    manager: '',
    rating: {},
    worker_skills: [],
  });

  useEffect(() => {
    if (workerData) {
      const rating = workerData.rating || {};
      const skills = workerData.worker_skills || [];
      const skillsArray = Array.isArray(skills) ? skills : [skills];

      setInitialData({
        first_name: workerData.first_name || '',
        last_name: workerData.last_name || '',
        email: workerData.email || '',
        phone_number: workerData.phone_number || '',
        agency: workerData.agency || '',
        manager: workerData?.rating?.manager || '',
        rating: {
          id: rating.id || null,
          attendance_score:
            rating.attendance_score >= 0 ? rating.attendance_score : 0,
          communication_score:
            rating.communication_score >= 0 ? rating.communication_score : 0,
          performance_score:
            rating.performance_score >= 0 ? rating.performance_score : 0,
          skills_score: rating.skills_score >= 0 ? rating.skills_score : 0,
          comment: rating.comment || '',
        },
        worker_skills: skillsArray,
      });

      setFormData({
        first_name: workerData.first_name || '',
        last_name: workerData.last_name || '',
        email: workerData.email || '',
        phone_number: workerData.phone_number || '',
        agency: workerData.agency || '',
        manager: workerData?.rating?.manager || '',
        rating: {
          id: rating.id || null,
          attendance_score:
            rating.attendance_score >= 0 ? rating.attendance_score : 0,
          communication_score:
            rating.communication_score >= 0 ? rating.communication_score : 0,
          performance_score:
            rating.performance_score >= 0 ? rating.performance_score : 0,
          skills_score: rating.skills_score >= 0 ? rating.skills_score : 0,
          comment: rating.comment || '',
        },
        worker_skills: skillsArray,
      });
    }
  }, [workerData]);

  const queryClient = useQueryClient();
  const editWorkerMutation = useMutation({
    mutationFn: (payload) =>
      sendData(payload.formData, payload.endpoint, payload.method),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['worker'] });
      queryClient.invalidateQueries({ queryKey: ['workers'] });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    },
    onError: (error) => {
      console.error('Error editing worker:', error);
      alert('Failed to edit worker. Please try again. ' + error.message);
    },
  });

  const areObjectsDifferent = (objA, objB) => {
    return JSON.stringify(objA) !== JSON.stringify(objB);
  };

  useEffect(() => {
    const formIsDirty = areObjectsDifferent(initialData, formData);
    setHasChanges(formIsDirty);
  }, [initialData, formData]);

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
    const selectedSkill = skills.find(
      (skill) => skill.skill_name === newSkillFormData.skill_name
    );

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

  const handleScrollToTop = function () {
    if (successRef.current) {
      successRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (showSuccess) {
      const timeoutId = setTimeout(() => {
        handleScrollToTop();
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [showSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const skillsPayload = formData.worker_skills.map((workerSkill) => {
      return {
        id: workerSkill.id,
        skill: workerSkill.skill,
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

    const payload = {
      formData: finalPayload,
      endpoint: `/workers/${workerId}/`,
      method: 'PATCH',
    };

    editWorkerMutation.mutate(payload);
  };

  return (
    <>
      <div className="flex justify-between">
        <SectionHeader
          title={workerData?.first_name + ' ' + workerData?.last_name}
        />
        <NavLink to="/workers">
          <button className="flex items-center gap-2 cursor-pointer hover:scale-101">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            <span>Return to Workers List</span>
          </button>
        </NavLink>
      </div>

      {showSuccess && (
        <SucessNotification
          successRef={successRef}
          message="Worker updated successfully!"
        />
      )}

      <form>
        <PersonalDetails
          formData={formData}
          handleInputChange={handleInputChange}
        />
        <WorkerDetails
          formData={formData}
          handleInputChange={handleInputChange}
          agencyNames={agencyNames}
          managerNames={managerNames}
        />
        <Ratings
          workerData={workerData}
          formData={formData}
          handleInputChange={handleRatingChange}
        />
        <Skills
          addSkillIsVisible={addSkillIsVisible}
          toggleAddSkillVisibility={toggleAddSkillVisibility}
          handleAddSkill={handleAddSkill}
          handleAddSkillInputChange={handleAddSkillInputChange}
          newSkillFormData={newSkillFormData}
          skillNames={skillNames}
          formData={formData}
          handleWorkerSkillChange={handleWorkerSkillChange}
        />
        <Comments formData={formData} handleInputChange={handleRatingChange} />
        <div className="mt-10 flex justify-end gap-3">
          <SubmitBtn
            label={
              editWorkerMutation.isPending ? (
                <span className="flex justify-centeritems-center gap-2 mx-auto">
                  {loader} Updating...
                </span>
              ) : (
                'Save Changes'
              )
            }
            handleSubmit={handleSubmit}
            disabled={!hasChanges}
            extraClasses="w-full"
          />
        </div>
      </form>
    </>
  );
}

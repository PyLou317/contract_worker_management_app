import { useState } from 'react';
import { SkillsContext } from './skills-page-ctx';

import AddSkillForm from './AddSkillForm';
import SkillsList from './SkillsList';

export default function SkillsPage() {
  const [showEditSkillModal, setShowEditSkillModal] = useState(false);

  const onClose = () => {
    setShowEditSkillModal(false);
  };

  const handleOpenEditSkillModal = () => {
    setShowEditSkillModal(true);
  };

  const handleOpenDeleteSkillModal = (skillId) => {
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const ctxValue = {
    showEditSkillModal: showEditSkillModal,
    onClose: onClose,
    openEditSkillModal: handleOpenEditSkillModal,
    openDeleteSkillModal: handleOpenDeleteSkillModal,
    handleSubmit: handleSubmit,
  };

  return (
    <SkillsContext.Provider value={ctxValue}>
      <div className="container mx-auto p-4">
        <AddSkillForm />
        <div className="mt-8 w-full border-t border-gray-200"></div>
        <SkillsList />
      </div>
    </SkillsContext.Provider>
  );
}

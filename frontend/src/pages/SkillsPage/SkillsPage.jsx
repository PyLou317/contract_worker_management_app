import { SkillsContext } from './skills-page-ctx';

import AddSkillForm from './AddSkill';
import SkillsList from './SkillsList';

export default function SkillsPage() {
  const handleOpenEditSkillModal = () => {
    console.log('Opening edit skill modal for skill ID:', skillId);
    onClose();
  };

  const handleOpenDeleteSkillModal = () => {
    console.log('Opening delete skill modal for skill ID:', skillId);
    onClose();
  };

  const ctxValue = {
    openEditSkillModal: handleOpenEditSkillModal,
    openDeleteSkillModal: handleOpenDeleteSkillModal,
  };

  return (
    <SkillsContext.Provider value={ctxValue}>
      <div className="container mx-auto p-8 bg-white">
        <AddSkillForm />
        <div className="mt-8 w-full border-t border-gray-200"></div>
        <SkillsList />
      </div>
    </SkillsContext.Provider>
  );
}

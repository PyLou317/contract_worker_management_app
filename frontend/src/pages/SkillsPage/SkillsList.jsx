import { useState } from 'react';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSkills } from '../../api/getSkillsDataApi';

import SkillCard from './SkillsCard';
import ActionMenu from './ActionMenu';

export default function SkillsList() {
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['skills'],
    queryFn: getSkills,
    keepPreviousData: true,
  });

  const skills = data?.results || [];

  const handleOpenEditSkillModal = (skillId, event) => {
    console.log('Opening action menu for skill ID:', skillId);
    setEditingSkillId(skillId);
    setShowActionMenu(true);

    const rect = event.currentTarget.getBoundingClientRect();
    console.log(rect);
    setMenuPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
  };

  const handleCloseActionMenu = () => {
    setShowActionMenu(false);
    setEditingSkillId(null);
  };

  if (isPending || isFetching) {
    return <div className="mt-8 text-center text-gray-500">Loading skills...</div>;
  }

  if (error) {
    return <div className="mt-8 text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="mt-8 w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Active Skills</h1>
        {skills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {skills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                colorClass={skill.base_color}
                handleEditSkillClick={(event) => handleOpenEditSkillModal(skill.id, event)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-4 w-full overflow-x-auto border border-gray-200 bg-gray-100/50 rounded-lg p-4">
            <p className="text-gray-500">No active skills found. Please add new skills above.</p>
          </div>
        )}
      </div>
      {showActionMenu && (
        <ActionMenu skillId={editingSkillId} onClose={handleCloseActionMenu} position={menuPosition} />
      )}
    </div>
  );
}

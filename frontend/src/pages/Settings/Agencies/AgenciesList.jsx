import { useState } from 'react';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/utilities/apiClient';

import AgencyCard from '@/pages/Settings/Agencies/AgencyCard';
import ActionMenu from '@/components/ActionMenu';
import LoadingSpinner from '@/components/Loader';

export default function AgenciesList() {
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['agencies'],
    queryFn: () => apiFetch('/agencies'),
    keepPreviousData: true,
  });

  const agencies = data?.results || [];

  const handleCloseActionMenu = () => {
    setShowActionMenu(false);
    setEditingSkillId(null);
  };

  const handleOpenActionMenu = (agencyId, event) => {
    setEditingSkillId(agencyId);
    setShowActionMenu(true);

    const mouseX = event.clientX;
    const mouseY = event.clientY;
    setMenuPosition({
      top: mouseY,
      left: mouseX,
    });
  };

  if (isPending || isFetching) {
    return (
      <div className="mt-8 text-center text-gray-500">
        Loading agencies...
        <span>
          <div className="flex justify-center items-center h-[400px]">
            <LoadingSpinner size="10" />
          </div>
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 text-center text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="mt-8 lg:w-full">
      <div className="mb-8">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Active Agencies</h1>
          <small>Active agencies count: {agencies.length}</small>
        </div>

        {agencies.length > 0 ? (
          <ul>
            {agencies.map((agency) => (
              <AgencyCard
                key={agency.id}
                agency={agency}
                handleEditAgencyClick={(event) =>
                  handleOpenActionMenu(agency.id, event)
                }
              />
            ))}
          </ul>
        ) : (
          <div className="mt-8 w-full">
            <div className="mt-4 w-fit mx-auto overflow-x-auto border border-gray-200 bg-gray-100/50 rounded-lg p-4">
              <p className="text-gray-500">
                No active agencies found. Please add new agency above.
              </p>
            </div>
          </div>
        )}
      </div>
      {showActionMenu && (
        <ActionMenu
          skillId={editingSkillId}
          position={menuPosition}
          onClose={handleCloseActionMenu}
        />
      )}
      {/* <EditSkillModal skillId={editingSkillId} /> */}
    </div>
  );
}

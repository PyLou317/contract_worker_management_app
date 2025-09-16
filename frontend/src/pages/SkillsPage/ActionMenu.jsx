import { useContext } from 'react';
import { SkillsContext } from './skills-page-ctx';

export default function ActionMenu({ skillId, position }) {
  if (!skillId) {
    return null;
  }

  const { openEditSkillModal, openDeleteSkillModal } = useContext(SkillsContext);

  return (
    <div
      style={{ top: position.top, left: position.left }}
      className="absolute flex flex-col justify-start bg-white border border-gray-200 text-gray-500 w-fit px-2 py-2 rounded-sm text-sm"
    >
      <ul>
        <li
          onClick={openEditSkillModal}
          className="text-gray-500 hover:text-gray-700 transition-colors duration-200 py-1 border-b border-gray-200 cursor-default"
          aria-label="Edit skill"
        >
          Edit
        </li>
        <li
          onClick={openDeleteSkillModal}
          className="text-red-500 hover:text-red-700 transition-colors duration-200 py-1 cursor-default"
          aria-label="Edit skill"
        >
          Delete
        </li>
      </ul>
    </div>
  );
}

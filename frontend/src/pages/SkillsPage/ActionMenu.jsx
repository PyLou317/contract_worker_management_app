import { useContext, useRef, useEffect } from 'react';
import { SkillsContext } from './skills-page-ctx';

export default function ActionMenu({ skillId, position, onClose }) {
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef, onClose]);

  if (!skillId) {
    return null;
  }

  const { openEditSkillModal, openDeleteSkillModal } =
    useContext(SkillsContext);

  return (
    <div
      ref={menuRef}
      style={{ top: position.top, left: position.left }}
      className="absolute flex flex-col items-start bg-white border border-gray-200 text-gray-500 w-fit px-1 py-2 rounded-sm text-sm"
    >
      <ul>
        <li
          onClick={() => openEditSkillModal(skillId)}
          className="text-gray-500 hover:text-gray-700 hover:border-blue-600 hover:border transition-colors duration-200 px-2 py-1 cursor-default"
          aria-label="Edit skill"
        >
          Edit
        </li>
        <li
          onClick={() => openDeleteSkillModal(skillId)}
          className="text-red-500 hover:text-red-500 hover:border-blue-600 hover:border transition-colors duration-200 px-2 py-1 cursor-default"
          aria-label="Edit skill"
        >
          Delete
        </li>
      </ul>
    </div>
  );
}

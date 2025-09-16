import skillColorClasses from './SkillColorClasses';
import './SkillCard.css';

export default function SkillsCard({ skill, handleEditSkillClick }) {
  const colorClass = skillColorClasses[skill.base_color][1] || skillColorClasses.gray;

  return (
    <div className="flex items-center h-[100px] gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
      <div
        className={`h-10 w-10 rounded-full ${colorClass} text-white flex items-center justify-center font-bold text-sm`}
      >
        {skill.abreviation}
      </div>
      <div className="truncate">
        <h3 className="font-semibold text-gray-900 md:font-sm">{skill.skill_name}</h3>
        <p className="text-sm text-gray-500 overflow-hidden text-ellipsis">{skill.description}</p>
      </div>
      <button
        onClick={(event) => handleEditSkillClick(event)}
        className="text-xl font-bold text-gray-500 hover:text-gray-700 hover:cursor-pointer transition-colors duration-200 ms-auto mt-auto"
      >
        ...
      </button>
    </div>
  );
}

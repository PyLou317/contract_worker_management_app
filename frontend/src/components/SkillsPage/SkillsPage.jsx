import AddSkillForm from './AddSkill';
import SkillsList from './SkillsList';

export default function SkillsPage() {
  return (
    <div className="container mx-auto p-8 bg-white">
      {/* <p className="text-gray-600 mt-2">Add new skills</p> */}
      <AddSkillForm />
      <div className="mt-8 w-full border-t border-gray-200"></div>
      <SkillsList />
    </div>
  );
}

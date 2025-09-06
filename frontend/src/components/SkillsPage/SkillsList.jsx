export default function SkillsList() {
  const skills = [];

  const content = {};
  return (
    <div className="mt-8 w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Active Skills</h1>
        {skills.length > 0 ? (
          content
        ) : (
          <div className="mt-4 w-full overflow-x-auto border border-gray-200 bg-gray-100/50 rounded-lg p-4">
            <p>No skills found, please add new skills above</p>
          </div>
        )}
      </div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Inactive Skills</h1>
        {skills.length > 0 ? (
          content
        ) : (
          <div className="mt-4 w-full overflow-x-auto border border-gray-200 bg-gray-100/50 rounded-lg p-4">
            <p>No skills found, please add new skills above</p>
          </div>
        )}
      </div>
    </div>
  );
}

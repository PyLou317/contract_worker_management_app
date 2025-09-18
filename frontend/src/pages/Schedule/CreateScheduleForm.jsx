export default function CreateScheduleForm() {
  return (
    <form className="container mx-auto p-8 bg-white shadow-md rounded-2xl">
      {/* {showSuccess && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">Skill added successfully!</span>
        </div>
      )} */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Create New Schedule</h1>
        <p className="text-gray-700 mb-6">Select the area and manager aligned to the new schedule:</p>
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row gap-4 md:items-end">
            <div>
              <label className="block text-gray-700 text-xs font-bold mb-2 grow" htmlFor="skill_name">
                Area
              </label>
              <select
                className="flex flex-grow-1 border rounded-lg p-2 w-full md:w-[250px] h-[40px] bg-white  focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="skill_name"
                name="skill_name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="abreviation">
                Manager
              </label>
              <select
                className="flex flex-grow-1 border rounded-lg p-2 w-full md:w-[250px] h-[40px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="manager"
                name="manager"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-400 font-medium rounded-lg hover:bg-yellow-300 transition-colors"
            >
              Create Schedule
            </button>
          </div>
        </div>
        <div className="">
          <h1 className="text-2xl font-semibold text-gray-800 mt-12 mb-2">Add Shifts to Schedule</h1>
          <p className="text-gray-700 mb-6">Select the days and times for each shift:</p>
          <div className="flex flex-col md:flex-row gap-4 md:items-end">
            <div>
              <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="abreviation">
                Day
              </label>
              <select
                className="flex flex-grow-1 border rounded-lg p-2 w-full md:w-[250px] h-[40px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="manager"
                name="manager"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="abreviation">
                Start Time
              </label>
              <select
                className="flex flex-grow-1 border rounded-lg p-2 w-full md:w-[250px] h-[40px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="manager"
                name="manager"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="abreviation">
                End Time
              </label>
              <select
                className="flex flex-grow-1 border rounded-lg p-2 w-full md:w-[250px] h-[40px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="manager"
                name="manager"
                required
              />
            </div>
          </div>
        </div>
        <div className="mt-4 bg-gray-200/40 hover:bg-gray-200/50 p-4 rounded-lg">
          {/* Plus Circle (SVG) */}
          <button className="flex items-center text-blue-500 hover:text-blue-600 transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 mr-1" // Added a color for visibility
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span>Add Shift</span>
          </button>
          {/* <div className="flex-1 border-t border-gray-700"></div> */}
        </div>
      </div>
    </form>
  );
}

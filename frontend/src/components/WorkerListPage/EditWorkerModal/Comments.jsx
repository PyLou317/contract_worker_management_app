export default function Comments({ formData, handleInputChange }) {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-white mt-12">Comments</h3>
      <div>
        <textarea
          id="comment"
          name="comment"
          rows={3}
          value={formData.comment}
          onChange={handleInputChange}
          className="mt-1 p-2 block w-full rounded-md bg-gray-800 border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        ></textarea>
      </div>
    </div>
  );
}

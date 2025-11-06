import Section from './Section';
import SectionHeader from './SectionHeader';

export default function Comments({ formData, handleInputChange }) {
  const ratings = formData?.rating;
  const comment = ratings?.comment;

  return (
    <Section>
      <SectionHeader title="Comments" />
      <div className='relative'>
        <textarea
          id="comment"
          name="comment"
          rows={2}
          value={comment}
          placeholder="Add a comment..."
          onChange={handleInputChange}
          className="peer p-2 block w-full placeholder-transparent bg-white rounded-t-lg caret-gray-800 text-gray-800 border-b-2 border-b-gray-600 focus:border-yellow-500 focus:outline-none mt-8"
        ></textarea>
        <label
          htmlFor="comment"
          className="peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 absolute text-gray-400 left-0 -top-5.5 text-sm transition-all cursor-text"
        >
          Add a comment...
        </label>
      </div>
    </Section>
  );
}

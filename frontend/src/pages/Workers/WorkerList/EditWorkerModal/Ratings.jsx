import Section from './Section';
import Input from '@/components/Inputs/LabeledInput';
import SectionHeader from '../../../../components/SectionHeader';

export default function Ratings({ workerData, formData, handleInputChange }) {
  const averageRating =
    formData.rating?.attendance_score &&
    formData.rating?.communication_score &&
    formData.rating?.performance_score &&
    formData.rating?.skills_score
      ? (Number(formData.rating?.attendance_score) +
          Number(formData.rating?.communication_score) +
          Number(formData.rating?.performance_score) +
          Number(formData.rating?.skills_score)) /
        4
      : 'N/A';
  let roundedAverageRating = 'N/A';
  if (typeof averageRating === 'number') {
    roundedAverageRating = averageRating.toFixed(2);
  }

  return (
    <Section>
      <div className="flex justify-between items-center align-baseline gap-2">
        <div>
          <SectionHeader title="Ratings">
            <small>
              Each rating is out of 5 and will produce an average overal rating
            </small>
          </SectionHeader>
        </div>
        <p className="text-black font-semibold text-center bg-yellow-300 px-4 py-2 rounded-full drop-shadow-lg drop-shadow-yellow-500/35 hover:scale-105">
          {roundedAverageRating} <span className="text-sm">average rating</span>
        </p>
      </div>
      <div className="grid grid-cols-4 gap-x-4 mt-6">
        <Input
          step="0.25"
          min="0"
          max="5"
          label="Attendance"
          type="number"
          id="attendance_score"
          name="attendance_score"
          placeholder="Attendance"
          value={formData.rating.attendance_score}
          onChange={handleInputChange}
        />
        <Input
          step="0.25"
          min="0"
          max="5"
          label="Communication"
          type="number"
          id="communication_score"
          name="communication_score"
          placeholder="Communication"
          value={formData.rating.communication_score}
          onChange={handleInputChange}
        />
        <Input
          step="0.25"
          min="0"
          max="5"
          label="Performance"
          type="number"
          id="performance_score"
          name="performance_score"
          placeholder="Performance"
          value={formData.rating.performance_score}
          onChange={handleInputChange}
        />
        <Input
          step="0.25"
          min="0"
          max="5"
          label="Skills"
          type="number"
          id="skills_score"
          name="skills_score"
          placeholder="Skills"
          value={formData.rating.skills_score}
          onChange={handleInputChange}
        />
      </div>
    </Section>
  );
}

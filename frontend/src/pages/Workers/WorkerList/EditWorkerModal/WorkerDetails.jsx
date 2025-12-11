import Section from './Section';
import SelectInput from '@/components/Inputs/FloatingSelectInput';
import SectionHeader from '@/components/SectionHeader';

export default function WorkerDetails({
  formData,
  handleInputChange,
  agencyNames,
  managerNames,
}) {
  return (
    <Section>
      <SectionHeader title="Work Details" />
      <div>
        <div className="grid grid-cols-2 gap-x-4 mt-8">
          <SelectInput
            label="Agency"
            type="text"
            id="agency"
            name="agency"
            value={formData.agency}
            onChange={handleInputChange}
            options={agencyNames}
          />
          <SelectInput
            label="Manager"
            type="text"
            id="manager"
            name="manager"
            value={formData.manager}
            onChange={handleInputChange}
            options={managerNames}
          />
        </div>
      </div>
    </Section>
  );
}

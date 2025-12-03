import Section from './Section';
import SectionHeader from '../../../../components/SectionHeader';
import Input from '@/components/Inputs/LabeledInput';
import formatPhoneNumber from '@/utilities/formatPhoneNumber';

export default function PersonalDetails({ formData, handleInputChange }) {
  return (
    <Section>
      <SectionHeader title="Personal Details" />
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 mt-8">
        <Input
          label="First Name"
          type="text"
          id="first_name"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleInputChange}
          required
        />
        <Input
          label="Last Name"
          type="text"
          id="last_name"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleInputChange}
          required
        />
        <Input
          label="Email"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <Input
          label="Phone Number"
          type="text"
          id="phone_number"
          name="phone_number"
          placeholder="Phone Number"
          value={formatPhoneNumber(formData.phone_number)}
          onChange={handleInputChange}
          required
        />
      </div>
    </Section>
  );
}

import Section from './Section';
import SectionHeader from './SectionHeader';
import Input from '@/components/Inputs/LabeledInput';

export default function PersonalDetails({ formData, handleInputChange }) {
  return (
    <Section>
      <SectionHeader title="Personal Details" />
      <div className="grid grid-cols-2 gap-4">
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
          value={formData.phone_number}
          onChange={handleInputChange}
          required
        />
      </div>
    </Section>
  );
}

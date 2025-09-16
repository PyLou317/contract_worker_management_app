import Input from '@/components/Inputs/LabeledInput';

export default function PersonalDetails({ formData, handleInputChange }) {
  return (
    <>
      <h3 className="text-2xl font-semibold text-white mb-4">Personal Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
          required
          className="bg-gray-800 border border-gray-400"
        />
        <Input
          label="Last Name"
          type="text"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleInputChange}
          required
          className="bg-gray-800 border border-gray-400"
        />
        <Input
          label="Email"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="bg-gray-800 border border-gray-400"
        />
        <Input
          label="Phone Number"
          type="text"
          id="phone_number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleInputChange}
          required
          className="bg-gray-800 border border-gray-400"
        />
      </div>
      <div className="border-b border-gray-700 mt-4"></div>
    </>
  );
}

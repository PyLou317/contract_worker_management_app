export default function formatPhoneNumber(value) {
  if (!value) return '';

  // 1. Strip non-digits and limit to 10 digits
  const cleaned = ('' + value).replace(/\D/g, '').substring(0, 10);

  // 2. Apply the regex formatting
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  // Return the cleaned partial string if less than 10 digits
  // This allows the user to see the input while they are typing
  return cleaned; 
}
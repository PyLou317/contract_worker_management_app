export default function WORKER_REQUEST_TEMPLATE({
  agencyName,
  userName,
  userTitle,
  userEmail,
}) {
  return `Dear ${agencyName},
    
    We are submitting an urgent request for staff to cover shifts at our facility.
    
    ---
    Request Details:
    ---
    
    1. Required Role(s):
    [Warehouse Workers] - Quantity: [X]
    [Certified Reach Truck Operators] - Quantity: [Y]
    
    2. Shift Dates & Times:
    [MM/DD/YYYY] | Shift: [e.g., 7:00 AM - 3:00 PM (Day)]
    [MM/DD/YYYY] | Shift: [e.g., 3:00 PM - 11:00 PM (Evening)]
    
    3. Specific Requirements (if any):
    * [e.g., Must have 2 years Reach Truck experience.]
    * [e.g., Required to have current forklift class 2 certification.]
    
    4. Additional Notes:
    [e.g., First day details, managers name.]
    
    Please confirm your ability to fill these shifts as soon as possible. We require confirmation by [Time, e.g., 1:00 PM today].
    
    Thank you for your prompt attention to this critical need.
    
    Sincerely,
    
    ${userName}
    ${userTitle}
    ${userEmail}`;
}

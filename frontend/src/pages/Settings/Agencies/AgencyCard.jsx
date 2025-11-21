import { useState } from 'react';

import EditIcon from '@/Icons/EditSquareIcon';

export default function AgencyCard({ agency, handleEditAgencyClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAgencyCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="flex w-full items-center mb-2 p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:scale-101 transition-transform duration-200"
      //   onClick={(event) => handleEditAgencyClick(event)}
    >
      <div className="w-full">
        <div className="flex justify-between">
          <span className="flex gap-2 items-center">
            <h3 className="text-xl font-semibold text-gray-900 sm:text-3xl">
              {agency.name}
            </h3>
            <div className='cursor-pointer'>
              <EditIcon />
            </div>
          </span>
          <button type="button" onClick={toggleAgencyCard}>
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 15.75 7.5-7.5 7.5 7.5"
                />
              </svg>
            )}
          </button>
        </div>
        {isOpen && (
          <>
            <div className="border-b border-gray-200 mt-6 mb-6"></div>

            <div className="ms-2">
              <h1 className="font-semibold text-md">Contact:</h1>
              <div className="flex flex-col gap-1 ms-4">
                <div className="flex flex-row gap-2 items-baseline">
                  <h3>Name:</h3>
                  <span className="text-sm text-gray-500 overflow-hidden text-ellipsis">
                    {agency.contact_first_name} {agency.contact_last_name}
                  </span>
                </div>
                <div className="flex flex-row gap-2 items-baseline">
                  <h3>Phone Number:</h3>
                  <span className="text-sm text-gray-500 overflow-hidden text-ellipsis">
                    {agency.phone_number}
                  </span>
                </div>
                <div className="flex flex-row gap-2 items-baseline">
                  <h3>Email:</h3>
                  <span className="text-sm text-gray-500 overflow-hidden text-ellipsis">
                    {agency.contact_email}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 ms-2">
              <h1 className="font-semibold text-md">Address:</h1>
              <div className="flex flex-col gap-1 ms-4">
                <div className="flex flex-row gap-2 items-baseline">
                  <h3>Street:</h3>
                  <span className="text-sm text-gray-500 overflow-hidden text-ellipsis">
                    {agency.address}
                  </span>
                </div>
                <div className="flex flex-row gap-2 items-baseline">
                  <h3>City:</h3>
                  <span className="text-sm text-gray-500 overflow-hidden text-ellipsis">
                    {agency.city}
                  </span>
                </div>
                <div className="flex flex-row gap-2 items-baseline">
                  <h3>Province:</h3>
                  <span className="text-sm text-gray-500 overflow-hidden text-ellipsis">
                    {agency.province}
                  </span>
                </div>
                <div className="flex flex-row gap-2 items-baseline">
                  <h3>Postal Code:</h3>
                  <span className="text-sm text-gray-500 overflow-hidden text-ellipsis">
                    {agency.postal_code}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex flex-col gap-1 ms-2">
                <div className="flex flex-row gap-2 items-baseline">
                  <h1 className="font-semibold text-md">Website:</h1>
                  <a
                    href={agency.website}
                    target="blank"
                    className="text-sm text-blue-500 overflow-hidden text-ellipsis"
                  >
                    {agency.website}
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

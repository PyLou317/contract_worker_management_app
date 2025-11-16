import { forwardRef } from 'react';

const PageContainer = forwardRef(({ children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className="container mx-auto p-8 bg-white shadow-md rounded-2xl"
      {...props}
    >
      {children}
    </div>
  );
});

export default PageContainer;

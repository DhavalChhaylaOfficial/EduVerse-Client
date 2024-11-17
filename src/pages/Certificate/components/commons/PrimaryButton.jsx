import React from 'react';

const PrimaryButton = React.memo(({ title, isLoading, icon: Icon, ...props }) => {
  return (
    <button
      type="submit"
      className={`${isLoading ? 'opacity-40 cursor-not-allowed' : ''} min-w-[80%] flex mx-auto items-center justify-center py-3 px-6 mt-6 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-md shadow-green-500 hover:bg-gradient-to-l hover:scale-105 active:scale-110 active:duration-0 transition ease-in-out delay-150 duration-300`}
      disabled={isLoading}
      {...props}
    >
      {Icon && <Icon className="mr-2" />} {/* Add icon before the title */}
      {title}
    </button>
  );
});

export default PrimaryButton;

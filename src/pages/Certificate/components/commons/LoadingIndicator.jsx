import React from "react";

const LoadingIndicator = React.memo(({ loadingText }) => {
  return (
    <div className="flex flex-col items-center justify-center fixed z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-400 p-4 rounded-xl bg-[radial-gradient(#bbb,#444)]">
      <div className="flex p-2 bg-[conic-gradient(#fff,#ec4899,#a855f7,#581c87)] rounded-full animate-spin">
        <div className="rounded-full p-2 bg-[radial-gradient(#eee,#444)] animate-[spin_300ms_linear_infinite_reverse]">
          <div className="w-4 h-4 rounded-full bg-[radial-gradient(#aaa,#222)]"></div>
        </div>
      </div>
      <p className="mt-1 font-medium text-sm">{loadingText}</p>
    </div>
  );
});

export default LoadingIndicator;

import React from 'react';

const Footer = () => {
  return (
    <div className="flex  w-full justify-center bg-gray-100 pb-8 bg-pink">
      <div className="flex w-full max-w-screen-xl flex-col items-center px-6">
        <div className="my-4 w-full"></div>
        <div className="flex w-full flex-col items-center justify-between gap-4 md:gap-0 lg:flex-row">
          <div className="flex w-full flex-col gap-2 px-1 font-normal text-gray-700 md:w-auto md:flex-row md:items-center md:gap-8">
            <p className="text-sm text-white">&copy; 2024 SantaHost.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

import React from 'react'
import { FadeLoader  } from 'react-spinners';

const Loader = () => {
  return (
    <div className="w-full h-screen z-50 absolute flex justify-center items-center bg-white">
      <FadeLoader  color="#0A2647" />
    </div>
  );
}

export default Loader


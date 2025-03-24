import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Viewpaste() {
  const { id } = useParams(); // Get paste ID from the URL
  const navigate = useNavigate(); // For navigation
  const paste = useSelector((state) =>
    state.paste.pastes.find((item) => item._id === id)
  );
  
  if (!paste) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold">Paste not found</h1>
        <button
          className="mt-5 px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => navigate('/')}
        >
          Go back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10" >
      <h1 className="text-3xl font-bold text-center mb-5">{paste.title}</h1>
      <div className="p-4 bg-color rounded-md shadow-md">
        {paste.value}
      </div>
      <div className="text-center mt-5">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => navigate('/paste')}
        >
          View All Pastes
        </button>
      </div>
    </div>
  );
}

export default Viewpaste;

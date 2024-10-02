import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { MdMusicNote } from 'react-icons/md';
import { BiUserCircle } from 'react-icons/bi';
import { useSnackbar } from 'notistack';

const URLModal = ({ onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [songURL, setSongURL] = useState('');

  const songRetrieveFromURL = () => {
    // change this later to send to backend
    console.log('Song URL:', songURL);
    navigator.clipboard.writeText("AHK Script would be here");
    enqueueSnackbar("Song info retrieved successfully!", { variant: "success" });
  };

  return (
    <div
      className='fixed bg-black bg-opacity-60 top-0 bottom-0 left-0 right-0 z-50 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        className='w-[600px] max-w-full h-auto bg-white rounded-xl p-4 flex flex-col relative overflow-y-auto'
        onClick={(event) => event.stopPropagation()}
      >
        <AiOutlineClose
          className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
          onClick={onClose}
        />

        <h2 className='text-lg font-semibold mb-2 pt-3'>
          Input Song's pianoletternotes.blogspot URL:
        </h2>

        
        <input
          type='text'
          className='border border-gray-300 p-2 w-full mb-4 rounded-lg'
          placeholder="Paste song's URL here"
          value={songURL}
          onChange={(e) => setSongURL(e.target.value)}
        />

        <div className='flex items-center justify-center mb-5'>
          <button
            className='bg-blue-600 text-white px-4 py-2 text-sm rounded-xl hover:bg-blue-700'
            onClick={songRetrieveFromURL}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default URLModal;

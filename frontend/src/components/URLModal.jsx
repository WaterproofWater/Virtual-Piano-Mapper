import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { MdMusicNote } from 'react-icons/md';
import { BiUserCircle } from 'react-icons/bi';
import { useSnackbar } from 'notistack';

const URLModal = ({ onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  
  const songRetrieveFromURL = () => {
    navigator.clipboard.writeText(song.AHKScript);
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

        <h2 className='text-lg font-semibold mb-2 pt-3'> Input Song's pianoletternotes.blogspot URL: </h2>

        <div className='flex items-center justify-center mb-5'>
          <button
            className='absolute right-0 bg-blue-600 text-white px-2 py-1 text-sm rounded-xl hover:bg-blue-700 m-1'
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

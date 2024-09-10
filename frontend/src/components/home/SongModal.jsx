import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { MdMusicNote } from 'react-icons/md';
import { BiUserCircle } from 'react-icons/bi';

const SongModal = ({ song, onClose }) => {
  return (
    <div
      className='fixed bg-black bg-opacity-60 top-0 bottom-0 left-0 right-0 z-50 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        className='w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative'
        onClick={(event) => event.stopPropagation()}
      >
        <AiOutlineClose
          className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
          onClick={onClose}
        />
        <h2 className='w-fit px-4 py-1 bg-gray-500 rounded-lg'> {song.notes} </h2>
        <div className='flex justify-start items-center gap-x-2'>
          <MdMusicNote className='text-red-300 text-2xl' />
          <h2 className='my-1'> {song.title} </h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <BiUserCircle className='text-red-300 text-2xl' />
          <h2 className='my-1'> {song.author} </h2>
        </div>
      </div>
    </div>
  );
};

export default SongModal;

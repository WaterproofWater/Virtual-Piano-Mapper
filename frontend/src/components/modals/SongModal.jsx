import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { MdMusicNote, MdPiano } from 'react-icons/md';
import { BiUserCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const SongModal = ({ song, onClose }) => {
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
          className='absolute right-6 top-6 text-3xl text-red-600 hover:text-red-700 transition cursor-pointer'
          onClick={onClose}
        />
        
        <div className='flex justify-start items-center gap-x-2'>
          <MdMusicNote className='text-red-300 text-2xl flex-shrink-0' />
          <h2 className='my-1 break-words w-[475px] text-2xl'> {song.title} </h2>
        </div>
        
        <div className='flex justify-start items-center gap-x-2'>
          <BiUserCircle className='text-red-300 text-2xl' />
          <h2 className='my-1 text-sm'> {song.author} </h2>
        </div>

        <h2 className='text-lg font-semibold mb-2 pt-3'> Song notes: </h2>
        
        <div 
          className='p-4 bg-gray-200 rounded-xl w-full max-h-[500px] overflow-y-auto custom-scrollbar' 
          style={{ whiteSpace: 'pre-wrap' }}
        >
          <p className='text-gray-700 break-words'>{song.notes}</p>
        </div>

        <div className='flex justify-center mt-4'>
          <Link to={`/songs/map/${song._id}`}>
            <button className='flex items-center gap-2 bg-sky-900 text-white px-4 py-2 rounded-full hover:bg-sky-700 transition'>
              <MdPiano className='text-white text-2xl' />
              <span> Map Song to Piano </span>
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default SongModal;

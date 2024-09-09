import React from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { BiUserCircle } from 'react-icons/bi';
import { MdOutlineDelete } from 'react-icons/md';
import { MdMusicNote } from 'react-icons/md';

const CardView = ({songs}) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {songs.map((item) => (
            <div className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-lg' key={item._id}>
                <h4 className='my-2 text-gray-400'> {item._id} </h4>
                <h2 className='absolute top-1 right-2 px-4 py-1 bg-gray-500 rounded-lg'> {item.notes} </h2>
                <div className='flex justify-start items-center gap-x-2'> 
                    <MdMusicNote className='text-red-300 text-2xl' />
                    <h2 className='my-1'> {item.title} </h2>
                </div>
                <div className='flex justify-start items-center gap-x-2'> 
                    <BiUserCircle className='text-red-300 text-2xl' />
                    <h2 className='my-1'> {item.author} </h2>
                </div>
                <div className='flex justify-between items-center gap-x-2 mt-4 p-4'> 
                    <Link to={`/songs/details/${item._id}`}>
                      <BsInfoCircle className='text-2xl text-green-700 hover:text-black' />
                    </Link>
                    <Link to={`/songs/edit/${item._id}`}>
                      <AiOutlineEdit className='text-2xl text-yellow-700 hover:text-black' />
                    </Link>
                    <Link to={`/songs/delete/${item._id}`}>
                      <MdOutlineDelete className='text-2xl text-red-700 hover:text-black' />
                    </Link>
                </div>
            </div>
        ))};

            

    </div>
  )
}

export default CardView
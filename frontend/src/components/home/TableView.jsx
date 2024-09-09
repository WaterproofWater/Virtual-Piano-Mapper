import React from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const TableView = ({songs}) => {
  return (
    <table className='w-full border-separate border-spacing-2'>
    <thead>
      <tr>
        <th className='border border-slate-600 rounded-md'> No. </th>
        <th className='border border-slate-600 rounded-md w-1/6'> Author </th>
        <th className='border border-slate-600 rounded-md w-4/6'> Title </th>
        <th className='border border-slate-600 w-1/4'> Operations </th>
      </tr>
    </thead>
    <tbody>
      {songs.map((song, index) => {
        return (
          <tr key={song._id} className='h-8'>
            <td className='border border-slate-800 rounded-md text-center'> {index + 1} </td>
            <td className='border border-slate-800 rounded-md text-center'> {song.author} </td>
            <td className='border border-slate-800 rounded-md text-center'> {song.title} </td>
            <td className='border border-slate-800 rounded-md text-center max-md:hidden'>
              <div className='flex justify-center gap-x-4'>
                <Link to={`/songs/details/${song._id}`}>
                  <BsInfoCircle className='text-2xl text-green-700' />
                </Link>
                <Link to={`/songs/edit/${song._id}`}>
                  <AiOutlineEdit className='text-2xl text-yellow-700' />
                </Link>
                <Link to={`/songs/delete/${song._id}`}>
                  <MdOutlineDelete className='text-2xl text-red-700' />
                </Link>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
  )
}

export default TableView
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { MdOutlineDelete, MdMusicNote } from 'react-icons/md';
import SongModal from './SongModal';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const CardView = ({ songs }) => {
  const [activeSong, setActiveSong] = useState(null);
  const [updatedSongs, setUpdatedSongs] = useState(songs); 
  const { enqueueSnackbar } = useSnackbar();
  const sortedSongs = [...updatedSongs].sort((a, b) => b.favorited - a.favorited);

  const openModal = (song) => {
    setActiveSong(song);
  };

  const closeModal = () => {
    setActiveSong(null);
  };

  const toggleFavorite = async (song) => {
    const updatedFavoriteStatus = !song.favorited; 

    try {
      axios.put(`http://localhost:5988/songs/favorite/${song._id}`, {
        ...song,
        favorited: updatedFavoriteStatus,
      });

      const newSongs = updatedSongs.map((item) =>
        item._id === song._id ? { ...item, favorited: updatedFavoriteStatus } : item
      );

      setUpdatedSongs(newSongs);
      enqueueSnackbar("Favorite status updated!", { variant: "success" });
    } 
    catch (error) {
      console.error("Error updating favorite status:", error);
      enqueueSnackbar("Error: updating favorite status failed!", { variant: "error" });
    }
  };

  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {sortedSongs.map((item) => (
        <div
          className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-lg'
          key={item._id}
        >
          <div className='absolute top-1 left-2 mt-2 cursor-pointer'>
            {item.favorited ? (
              <AiFillStar
                className='text-yellow-400 text-2xl'
                onClick={() => toggleFavorite(item)} 
              />
            ) : (
              <AiOutlineStar
                className='text-gray-400 text-2xl'
                onClick={() => toggleFavorite(item)} 
              />
            )}
          </div>

          <h2 className='absolute top-1 right-2 px-4 py-1 bg-gray-500 rounded-lg text-gray-100'>
            {item._id}
          </h2>
          <div className='flex justify-start items-center gap-x-2 mt-10'>
            <MdMusicNote className='text-red-300 text-2xl flex-shrink-0' />
            <h2 className='my-1 w-full truncate text-xl'> {item.title} </h2>
          </div>
          <div className='flex justify-start items-center gap-x-2'>
            <BiUserCircle className='text-red-300 text-2xl' />
            <h2 className='my-1 text-sm font-semibold'> {item.author} </h2>
          </div>
          <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
            <BiShow
              className='text-3xl text-blue-800 hover:text-black cursor-pointer'
              onClick={() => openModal(item)}
            />
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
      ))}
      {activeSong && <SongModal song={activeSong} onClose={closeModal} />}
    </div>
  );
};

export default CardView;

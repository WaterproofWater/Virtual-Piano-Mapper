import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';

const DeleteSong = () => {
  const [loading, setLoading] = useState(false);
  const id = useParams().id;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteSong = () => {
    setLoading(true);
    axios.delete(`http://localhost:5988/songs/${id}`).then(() => {
      setLoading(false);
      navigate('/');
      enqueueSnackbar("Song deleted successfuly!", { variant: "success"});
    }).catch((error) => {
      setLoading(false);
      enqueueSnackbar("Error: Song deletion failed, please check console!", { variant: "error", style: { backgroundColor: 'red', color: 'white' }});
      console.log(error);
    });
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'> Delete Song </h1>

      {loading ? (<Spinner />) : ('')}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'> Are you sure you want to delete this song? </h3>
        <button className='p-4 bg-red-600 m-8 text-white w-full' onClick={handleDeleteSong}> Delete </button>
      </div>
    </div>
  )
}

export default DeleteSong;
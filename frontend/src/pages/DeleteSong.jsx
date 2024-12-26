import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';

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
      <h1 className='text-3xl my-4'>Song Delete:</h1>

      {loading ? (<Spinner />) : ('')}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this song?</h3>
        <div className="flex flex-row w-full justify-between mt-8">
          <Link to="/" className='p-4 bg-blue-600 hover:bg-blue-700 transition text-white rounded-full w-1/2 mr-2 text-center'>Cancel</Link>
          <button className='p-4 bg-red-600 hover:bg-red-700 transition text-white rounded-full w-1/2 ml-2' onClick={handleDeleteSong}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteSong;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';

const MapSong = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [notes, setNotes] = useState('');
  const [favorited, setFavorited] = useState(false); 
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5988/songs/${id}`)
      .then((response) => {
        setNotes(response.notes);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error: Song notes failed to retrieve, please check console!", { variant: "error" });
        console.error(error);
      });
  }, [id, enqueueSnackbar]);

  const handleMapSong = () => {
    if (!notes) {
      alert("This song have no notes!");
      return;
    }
    setLoading(true);
    console.log("at mapping logic.");
    navigate('/');
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'> Song Mapper: </h1>

      {loading ? <Spinner /> : null}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-700'> Title </label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-700'> Author </label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-700'> Notes </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full h-40 resize-none'
            rows='5'
          />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-700'> Favorited </label>
          <input
            type='checkbox'
            checked={favorited}
            onChange={() => setFavorited(!favorited)}
            className='border-2 border-gray-500 px-4 py-2'
          />
        </div>

        <button className='p-2 bg-blue-600 m-8 text-white transition' onClick={handleMapSong}>
          Map to AutoHotKey Script
        </button>
      </div>
    </div>
  );
};

export default MapSong;

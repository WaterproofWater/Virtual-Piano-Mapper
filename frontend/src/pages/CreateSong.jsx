import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const CreateSong = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveSong = () => {
    const data = {title, author, notes};
    if (!title || !author || !notes) {
      alert("All of tile, author, and notes fields are required.");
      return;
    }
    setLoading(true);
    axios.post(`http://localhost:5988/songs`, data).then(() => {
      setLoading(false);
      navigate('/');
    }).catch((error) => {
      setLoading(false);
      alert('Error: Song creation failed, please check console.');
      console.log(error);
    });
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'> Song Creation: </h1>

      {loading ? (<Spinner />) : ('')}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-700'> Title </label>
          <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-700'> Author </label>
          <input type='text' value={author} onChange={(e) => setAuthor(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-700'> Notes </label>
          <input type='text' value={notes} onChange={(e) => setNotes(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>

        <button className='p-2 bg-sky-950 m-8 text-white' onClick={handleSaveSong}> Save </button>
      </div>
    </div>
  )
}

export default CreateSong
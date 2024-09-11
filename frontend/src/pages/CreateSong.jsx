import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';

const CreateSong = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const notesRef = useRef(null); 
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveSong = () => {
    const data = { title, author, notes };
    if (!title || !author || !notes) {
      alert("All of title, author, and notes fields are required.");
      return;
    }

    setLoading(true);
    axios.post(`http://localhost:5988/songs`, data).then(() => {
      setLoading(false);
      enqueueSnackbar("Song created successfuly!", { variant: "success"});
      navigate('/');
    }).catch((error) => {
      setLoading(false);
      enqueueSnackbar("Error: Song creation failed, please check console!", { variant: "error", style: { backgroundColor: 'red', color: 'white' }});
      console.log(error);
    });
  };

  const handleTextareaResize = (event) => {
    const textarea = event.target;
    textarea.style.height = 'auto'; 
    textarea.style.height = `${textarea.scrollHeight}px`; 

    if (textarea.scrollHeight > 1000) {
      textarea.style.height = '1000px';
      textarea.style.overflowY = 'auto'; 
    } 
    else {
      textarea.style.overflowY = 'hidden';
    }
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'> Song Creation: </h1>

      {loading ? (<Spinner />) : ('')}

      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-700'> Title </label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100} 
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
          <p className='text-sm text-gray-500'> {title.length}/100 </p>
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-700'> Author </label>
          <input
            type='text' value={author}
            onChange={(e) => setAuthor(e.target.value)}
            maxLength={100}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
          <p className='text-sm text-gray-500'> {author.length}/100 </p>  
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-700'> Notes </label>
          <textarea
            ref={notesRef} 
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              handleTextareaResize(e); 
            }}
            className='border-2 border-gray-500 px-4 py-2 w-full h-32 resize-y max-h-[1000px] overflow-auto'
            rows={3} 
            style={{ minHeight: '60px', maxHeight: '1000px', whiteSpace: 'pre-wrap' }} 
          />
        </div>

        <button className='p-2 bg-blue-600 m-8 text-white' onClick={handleSaveSong}> Save </button>
      </div>
    </div>
  );
};

export default CreateSong;

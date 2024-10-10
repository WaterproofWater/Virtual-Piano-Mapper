import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useSnackbar } from 'notistack';
import axios from 'axios';

const URLModal = ({ onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [url, setUrl] = useState('');

  const handleURLSubmit = async () => {
    if (!url) {
      enqueueSnackbar("Please enter a valid URL!", { variant: "warning" });
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5988/songs/scrape', { url });

      if (response.status === 201) {
        console.log(response.data);
        enqueueSnackbar("Song's data scraped and loaded successfully!", { variant: "success" });
        onClose();
      } 
      else {
        enqueueSnackbar("Failed to scrape song info.", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Error scraping song info.", { variant: "error" });
      console.error('Error:', error);
    }
  };

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
          className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
          onClick={onClose}
        />

        <h2 className='text-lg font-semibold mb-2 pt-3'>Input Song's pianoletternotesblogspot URL:</h2>

        <input
          type='text'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full mb-4'
          placeholder="Enter URL here"
        />

        <div className='flex items-center justify-center mb-5'>
          <button
            className={`bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 m-1`}
            onClick={handleURLSubmit}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default URLModal;

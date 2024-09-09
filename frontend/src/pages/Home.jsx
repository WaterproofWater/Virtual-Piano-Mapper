import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import CardView from '../components/home/CardView';
import TableView from '../components/home/TableView';

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewType, setViewType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:5988/songs")
      .then((response) => {
        setSongs(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>

      <div className='flex justify-center items-center gap-x-4'>
        <button className='bg-gray-700 hover:bg-gray-500 px-4 py-1 rounded-lg text-white' onClick={() => setViewType('table')}> Table </button>
        <button className='bg-gray-700 hover:bg-gray-500 px-4 py-1 rounded-lg text-white' onClick={() => setViewType('card')}> Card </button>
      </div>

      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'> Song List </h1>
        <Link to='/songs/create'>
          <MdOutlineAddBox className='text-black text-4xl' />
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        viewType === 'table' ? (
          <TableView songs={songs} />
        ) : (
          <CardView songs={songs} />
        )
      )}
    </div>
  );
};

export default Home;

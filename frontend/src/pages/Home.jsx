import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import CardView from '../components/home/CardView';

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

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
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'> Song List </h1>
        <Link to='/songs/create'>
          <MdOutlineAddBox className='text-black text-4xl' />
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <CardView songs={songs} />
      )}
    </div>
  );
};

export default Home;

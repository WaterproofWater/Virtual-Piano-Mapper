import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowSong = () => {
    const [song, setSong] = useState({});
    const [loading, setLoading] = useState(false);
    const id = useParams().id; 

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5988/songs/${id}`)
          .then((response) => {
            setSong(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      }, [id]);

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'> Song Info: </h1>

            {loading ? (
                <Spinner />
            ) : (
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'> 
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-600'> ID: </span>
                        <span className='text-xl mr-4 text-gray-600'> {song._id} </span>
                    </div>
                    
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-600'> Favorited: </span>
                        <span className='text-xl mr-4 text-gray-600'> {song.favorited?.toString()} </span>
                    </div>

                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-600'> Title: </span>
                        <span className='text-xl mr-4 text-gray-600'> {song.title} </span>
                    </div>

                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-600'> Author: </span>
                        <span className='text-xl mr-4 text-gray-600'> {song.author} </span>
                    </div>

                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-600'> Notes: </span>
                        <span className='text-xl mr-4 text-gray-600'> {song.notes} </span>
                    </div>

                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-600'> Creation Time: </span>
                        <span className='text-xl mr-4 text-gray-600'> {new Date(song.createdAt).toString()} </span>
                    </div>

                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-600'> Last Updated Time: </span>
                        <span className='text-xl mr-4 text-gray-600'> {new Date(song.updatedAt).toString()} </span>
                    </div>
                </div> 
            )}

        </div>
    )
}

export default ShowSong;

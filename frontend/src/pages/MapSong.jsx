import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';
import { MdMusicNote } from 'react-icons/md';
import { BiUserCircle } from 'react-icons/bi';
import pianoKeys from '../components/images/piano-keys.png';
import MapModal from '../../mapper/MapModal';
import NotesMapper from '../../mapper/NotesMapper';

const MapSong = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [keyMap, setKeyMap] = useState({
    c1: '', d1: '', e1: '', f1: '', g1: '', a1: '', b1: '', C1: '', D1: '', F1: '', G1: '', A1: '',
    c2: '', d2: '', e2: '', f2: '', g2: '', a2: '', b2: '', C2: '', D2: '', F2: '', G2: '', A2: '',
    c3: '', d3: '', e3: '', f3: '', g3: '', a3: '', b3: '', C3: '', D3: '', F3: '', G3: '', A3: '',
    c4: '', d4: '', e4: '', f4: '', g4: '', a4: '', b4: '', C4: '', D4: '', F4: '', G4: '', A4: '',
    c5: '', d5: '', e5: '', f5: '', g5: '', a5: '', b5: '', C5: '', D5: '', F5: '', G5: '', A5: '',
    c6: '', d6: '', e6: '', f6: '', g6: '', a6: '', b6: '', C6: '', D6: '', F6: '', G6: '', A6: ''
  });
  const [activeSong, setActiveSong] = useState(null);

  const openModal = (song) => {
    setActiveSong(song);
  };

  const closeModal = () => {
    setActiveSong(null);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5988/songs/${id}`)
      .then((response) => {
        const { title, author, notes } = response.data;
        setTitle(title);
        setAuthor(author);
        setNotes(notes);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error: Song notes failed to retrieve, please check console!", { variant: "error" });
        console.error(error);
      });
  }, [id, enqueueSnackbar]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setKeyMap((prevMapping) => ({
      ...prevMapping,
      [name]: value
    }));
  };

  const renderOctaveInputs = (octave) => {
    const keys = ['c', 'C', 'd', 'D', 'e', 'f', 'F', 'g', 'G', 'a', 'A', 'b'];
    return (
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold mr-4"> Octave {octave}: </span>
        {keys.map((key) => (
          <input
            key={`${key}${octave}`}
            type="text"
            name={`${key}${octave}`}
            value={keyMap[`${key}${octave}`]}
            onChange={handleChange}
            className="border-2 border-gray-400 p-1 rounded-lg text-center w-12"
            maxLength="1"
            placeholder={key}
          />
        ))}
      </div>
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const mapData = { notes, keyMap };
    const AHKScript = NotesMapper(mapData);
    const songData = { title, author, AHKScript };
    openModal(songData);
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'> Song Mapper: </h1>

      {loading && <Spinner />}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[1000px] p-4 mx-auto'>
        <div className='flex justify-start items-center gap-x-2'>
          <MdMusicNote className='text-red-300 text-2xl flex-shrink-0' />
          <h2 className='my-1 break-words w-[475px] text-2xl'> {title} </h2>
        </div>

        <div className='flex justify-start items-center gap-x-2'>
          <BiUserCircle className='text-red-300 text-2xl' />
          <h2 className='my-1 text-sm'> {author} </h2>
        </div>

        <h2 className='text-lg font-semibold mb-2 pt-3'> Song notes: </h2>
        
        <div 
          className='p-4 bg-gray-200 rounded-md w-full max-h-[500px] overflow-y-auto custom-scrollbar' 
          style={{ whiteSpace: 'pre-wrap' }}
        >
          <p className='text-gray-700 break-words'> {notes} </p>
        </div>

        <hr className="my-4 border-gray-500" />

        <div className="flex justify-center">
          <img src={pianoKeys} alt="Piano" className="rounded-lg shadow-lg" />
        </div>
        <h1 className='flex flex-col items-center'> - Octave 1 and 6 are missing from the image - </h1>

        <hr className="my-4 border-gray-500" />

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-2"> Map Piano Keys to PC Keys (be sure that they are all unique!) </h2>

          <div className="space-y-5">
            {renderOctaveInputs(1)}
            {renderOctaveInputs(2)}
            {renderOctaveInputs(3)}
            {renderOctaveInputs(4)}
            {renderOctaveInputs(5)}
            {renderOctaveInputs(6)}
          </div>

          <button type="submit" className="p-2 bg-blue-600 m-8 text-white transition hover:bg-blue-700 rounded">
            Map to AutoHotKey Script
          </button>
        </form>
      </div>
      {activeSong && <MapModal song={activeSong} onClose={closeModal} />}
    </div>
  );
};

export default MapSong;

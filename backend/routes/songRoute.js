import express from "express";
import { Song } from "../models/songModel.js";
import { NoteScraper } from "../services/NoteScraper.js";

const router = express.Router();

// Route to save a new song
router.post("/", async (request, response) => {  // URL for song list: http://localhost:5988/songs
    try {
        if (!request.body.title || !request.body.author || !request.body.notes) {
            return response.status(400).send({message: "Error: One or more of title, author, or notes are missing."});
        }
        const newSong = {
            title: request.body.title,
            author: request.body.author,
            notes: request.body.notes,
        };

        const song = await Song.create(newSong);

        return response.status(201).send(song);
    }
    catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route to retrieve all songs in the DB
router.get("/", async (request, response) => {  // URL for song list: http://localhost:5988/songs
    try {
        const songs = await Song.find({});

        return response.status(200).json({
            count: songs.length,
            data: songs
        });
    }
    catch (error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to retrieve/search a single song in the DB
router.get("/:id", async (request, response) => {  // URL for song list: http://localhost:5988/songs
    try {
        const id = request.params.id;
        const song = await Song.findById(id);

        return response.status(200).json(song);
    }
    catch (error){
        if (error.name === "CastError") {
            return response.status(400).json({ message: "Error: Invalid song ID format" });
        }
        
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route to update/overwrite a song's note print in the DB
router.put("/:id", async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.notes) {
            return response.status(400).send({message: "Error: One or more of title, author, or notes are missing."});
        }

        const id = request.params.id;
        const updatedSong = await Song.findByIdAndUpdate(id, request.body);

        if (!updatedSong) {
            return response.status(404).json({ message: "Error: Song not found." });
        }

        return response.status(200).send({ message: "Song content updated successfully." });
    }
    catch (error) {
        if (error.name === "CastError") {
            return response.status(400).json({ message: "Error: Invalid song ID format." });
        }
        
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route to favorite/unfavorite a song
router.put('/songs/:id', async (req, res) => {  // URL for song list: http://localhost:5988/songs
    try {
      const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(song);
    } 
    catch (error) {
      res.status(500).json({ message: 'Error: Favorite status update failed to update.' });
    }
  });
  

// Route to deleted a target song in the DB
router.delete("/:id", async (request, response) => {  // URL for song list: http://localhost:5988/songs
    try {
        const id = request.params.id;
        const deletedSong = await Song.findByIdAndDelete(id);

        if (!deletedSong) {
            return response.status(404).json({ message: "Error: Song not found." });
        }

        return response.status(200).send({ message: "Song deleted successfully." });
    }
    catch (error){
        if (error.name === "CastError") {
            return response.status(400).json({ message: "Error: Invalid song ID format" });
        }
        
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route to scrape song's info
router.post("/scrape", async (request, response) => {
    const { url } = request.body;

    if (!url) {
        return response.status(400).send({ message: "Error: URL is missing." });
    }

    try {
        const songData = await NoteScraper(url);

        if (!songData.title || !songData.author || !songData.notes) {
            return response.status(400).send({ message: "Error: Failed to scrape song information." });
        }

        return response.status(201).send(songData);
    } 
    catch (error) {
        console.error(error.message);
        response.status(500).send({ message: "Error: Failed to scrape the song from the URL." });
    }
});


export default router;
import express from "express";
import {Song} from "../models/songModel.js";

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
            return response.status(400).json({ message: "Error: Invalid song ID format" });
        }
        
        console.log(error.message);
        response.status(500).send({message: error.message});
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

export default router;
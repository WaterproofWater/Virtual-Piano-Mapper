import express from "express";
import mongoose from "mongoose";
import {Song} from "./models/songModel.js";

const PORT = 5988;
const MONGO_DB_URL = "mongodb+srv://root:rootpass@song-notes-db.lp1nq.mongodb.net/?retryWrites=true&w=majority&appName=Song-Notes-DB"
const app = express();

// Start: npm run dev
// Stop: Hold Ctrl and then C

app.use(express.json());

app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("VIRTUAL PIANO MAPPER");
});

// Route to save a new song
app.post("/songs", async (request, response) => {  // URL for song list: http://localhost:5988/songs
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
app.get("/songs", async (request, response) => {  // URL for song list: http://localhost:5988/songs
    try {
        const songs = await Song.find({});

        return response.status(200).json({
            count: songs.length,
            data: songs
        });
    }
    catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route to retrieve/search a single song in the DB
app.get("/songs/:id", async (request, response) => {  // URL for song list: http://localhost:5988/songs
    try {
        const id = request.params.id;
        const song = await Song.findById(id);

        return response.status(200).json(song);
    }
    catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route to update/overwrite a song's note print in the DB
app.put("/songs/:id", async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.notes) {
            return response.status(400).send({message: "Error: One or more of title, author, or notes are missing."});
        }

        const { id } = request.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).json({ message: "Error: Invalid song ID format." });
        }

        const updatedSong = await Song.findByIdAndUpdate(id, request.body);

        if (!updatedSong) {
            return response.status(404).json({ message: "Error: Song not found." });
        }

        return response.status(200).json(updatedSong);
    }
    catch (error) {
        if (error.name === "CastError") {
            return response.status(400).json({ message: "Error: Invalid song ID format" });
        }
        
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});


mongoose.connect(MONGO_DB_URL).then(() => {
    console.log("connected to DB");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log(error);

})
import express from "express";
import mongoose from "mongoose";

const PORT = 5988;
const MONGO_DB_URL = "mongodb+srv://root:rootpass@song-notes-db.lp1nq.mongodb.net/?retryWrites=true&w=majority&appName=Song-Notes-DB"
const app = express();

// Start: npm run dev
// Stop: Hold Ctrl and then C

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("VIRTUAL PIANO MAPPER");
});

mongoose.connect(MONGO_DB_URL).then(() => {
    console.log("connected to DB");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log(error);

})
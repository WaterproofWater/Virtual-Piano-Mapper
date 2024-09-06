import express from "express";

const PORT = 5988;
const app = express();

// Start: npm run dev
// Stop: Hold Ctrl and then C

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("VIRTUAL PIANO MAPPER");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
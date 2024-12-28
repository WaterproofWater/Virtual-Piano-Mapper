# Virtual Piano Mapper
## 	<sub> About: </sub> 
The Virtual Piano Mapper project is designed to automate piano playing by converting a song's notes map into an AutoHotKey (AHK) macro. Built with the MERN stack (MongoDB, Express, React, Node.js) and styled using Vite and Tailwind CSS, this tool supports CRUD operations to manage song notes and mappings.

## 	<sub> Demo: </sub>
placeholder text


## 	<sub> Usage: </sub>
1. The program utilizes AutoHotKey (AHK); the download for AHK macro software can be found at __https://www.autohotkey.com/__.
2. Clone the Repository.
3. Move into the project’s root directory where the backend and frontend folders are located.
4. Go to the backend folder and install the necessary dependencies using __npm install__.
5. Change the existing Mongo_DB_LINK link to your private MongoDB link (located at line 7 in the index.js file in the backend folder).
6. Move to the frontend folder and install the required dependencies using __npm install__.
7. Navigate to the backend directory and start the server using __npm run dev__.
8. Return to the frontend directory and start the development server using __npm run dev__.
9. Go to the local host address given by the front end's server to start using the program (__http://localhost:5173/__ by default).
10. The program uses songs' note map from __https://pianoletternotes.blogspot.com/__ to generate the AHK script.
11. Map to AHK script by clicking on the eye icon located at the bottom left of each song's card and then click the "Map Song to Piano" button.
12. Fill out the necessary key binds* and customize the delay if needed (lower delay = faster playback).
13. Copy the outputted AHK script generated and paste the resulting code into an editor to run AHK on.
14. Run the AHK script on a virtual piano program of your choice (__https://virtualpiano.net/__ is recommended as it has the most keys).

*(if you use the __https://virtualpiano.net/__ piano, you can paste the entire key bind in one go, it is "__1!2@34$5%6^78\*9(0qQwWeErtTyYuiIoOpPasSdDfgGhHjJklLzZxcCvVbBnm__")

<sub> The project's main purpose is largely finished, but many more add-on functions and improvements are planned for future development </sub>

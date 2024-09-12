const NotesMapper = (data) => {
    const { notes, keyMap } = data;

    let script = ""; 
    let waitTime = 0;  

    const lines = notes.split('\n');

    for (let line of lines) {
        const [octave, notesInLine] = line.split('|');
        if (!notesInLine) {
            console.log('No notes found for this line');
            continue;
        }

        for (let i = 0; i < notesInLine.length; i++) {
            const note = notesInLine[i];

            if (note === '-') {
                waitTime += 167;
            } 
            else if (note !== ' ') {
                const noteKey = `${note}${octave}`;
                const mappedKey = keyMap[noteKey];

                if (mappedKey) {
                    if (waitTime > 0) {
                        script += `sleep, ${waitTime}\n`;
                    }
                    script += `send, ${mappedKey}\n`;
                    waitTime = 0;
                } else {
                    console.log(`Note ${noteKey} not found in keyMap`);
                }
            }
        }
    }

    console.log(script);

    return script;
};

export default NotesMapper;

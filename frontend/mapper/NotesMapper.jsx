const NotesMapper = (data) => {
    const { notes, keyMap } = data;

    let script = `*[:: 
    Reload 
    return

*]::\n`;
     
    let waitTime = 0;  
    const lines = notes.split('\n');

    console.log("Org Lines:",lines);

    // Merge logic
    let mergedLines = [];
    let mergeGroup = [];
    
    for (let i = 0; i < lines.length; i++) {
        let currentLine = lines[i];
    
        if (currentLine.length === 0) {
            if (mergeGroup.length > 0) {
                if (mergeGroup.length === 1) {
                    mergedLines.push(mergeGroup[0]);
                } 
                else {
                    mergedLines.push([...mergeGroup]);
                }
                mergeGroup = [];
            }
        } else {
            mergeGroup.push(currentLine);
        }
    }
    
    if (mergeGroup.length > 0) {
        if (mergeGroup.length === 1) {
            mergedLines.push(mergeGroup[0]);
        } 
        else {
            mergedLines.push([...mergeGroup]);
        }
    }

    const processMergedLines = (mergedLines) => {
        mergedLines.forEach((line, index) => {
            if (typeof line === 'string') {
                const [octave, notes] = line.split('|');
                let mergedNotes = '';
    
                for (let i = 0; i < notes.length; i++) {
                    const note = notes[i];
                    if (note !== '-') {
                        mergedNotes += `${note}${octave}`;
                    } else {
                        mergedNotes += '-';
                    }
                }
    
                mergedLines[index] = mergedNotes;
    
            } else if (Array.isArray(line)) {
                let mergedNotes = '';
                const notesArray = line.map(l => l.split('|')[1]); // Get notes part from each line
                const octavesArray = line.map(l => l.split('|')[0]); // Get octaves from each line
    
                const maxLength = Math.max(...notesArray.map(notes => notes.length));
    
                for (let i = 0; i < maxLength; i++) {
                    let combinedNote = '';
    
                    for (let j = 0; j < notesArray.length; j++) {
                        const note = notesArray[j][i] || '-';
                        const octave = octavesArray[j];
    
                        if (note !== '-') {
                            combinedNote += `${note}${octave}`;
                        }
                    }
    
                    mergedNotes += combinedNote || '-';
                }
    
                mergedLines[index] = mergedNotes;
            }
        });
    };

    processMergedLines(mergedLines);
    console.log("Merged Lines:", mergedLines);


    for (let line of mergedLines) {
        let waitTime = 0;
    
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
    
            // Handle delays for every dash
            if (char === '-') {
                waitTime += 140;
                continue;
            }
    
            // We expect a note followed by its octave, so skip handling any other non-note character
            if (i + 1 < line.length && !isNaN(line[i + 1])) {
                const note = char;        // The current character is the note
                const octave = line[i + 1]; // The next character is the octave
    
                const noteKey = `${note}${octave}`;
                const mappedKey = keyMap[noteKey];
    
                if (mappedKey) {
                    // Apply the accumulated wait time before the note
                    if (waitTime > 0) {
                        script += `    sleep, ${waitTime}\n`;
                        waitTime = 0;
                    }
    
                    // Send the key for the note
                    script += `    send, ${mappedKey}\n`;
    
                    // Skip the octave character since it was just processed
                    i += 1; 
                } else {
                    console.log(`Note ${noteKey} not found in keyMap`);
                }
            } else {
                console.log(`Invalid note or octave format at position ${i}: ${char}`);
            }
        }
    }
    

    script += `    reload`;

    return script;
};

export default NotesMapper;

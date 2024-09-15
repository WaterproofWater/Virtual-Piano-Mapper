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
        } 
        else {
            mergeGroup.push(currentLine);
        }
    }
    
    // Last note line merge (if necessary)
    if (mergeGroup.length > 0) {
        if (mergeGroup.length === 1) {
            mergedLines.push(mergeGroup[0]);
        } 
        else {
            mergedLines.push([...mergeGroup]);
        }
    }



    let previousOctave = '';
    mergedLines.forEach((line, index) => {
        if (typeof line === 'string') {
            const [octave, notes] = line.split('|');
            let mergedNotes = '';

            for (let i = 0; i < notes.length; i++) {
                const note = notes[i];

                if (note !== '-') {
                    if (octave === previousOctave) {
                        mergedNotes += `*${note}${octave}`;
                    } 
                    else {
                        mergedNotes += `${note}${octave}`;
                        previousOctave = octave;  // Update previous octave for comparison
                    }
                } 
                else {
                    mergedNotes += '-';
                    previousOctave = '';
                }
            }

            mergedLines[index] = mergedNotes;

        } 
        else if (Array.isArray(line)) {
            let mergedNotes = '';
            const notesArray = line.map(l => l.split('|')[1]);   // Get notes part from each line
            const octavesArray = line.map(l => l.split('|')[0]); // Get octaves from each line
        
            const maxLength = Math.max(...notesArray.map(notes => notes.length));
        
            for (let i = 0; i < maxLength; i++) {
                let combinedNote = '';
        
                for (let j = 0; j < notesArray.length; j++) {
                    const note = notesArray[j][i] || '-';
                    const octave = octavesArray[j];
        
                    if (note !== '-') {
                        if (octave === previousOctave) {
                            combinedNote += `*${note}${octave}`;
                        } 
                        else {
                            combinedNote += `${note}${octave}`;
                        }
                        previousOctave = octave;  // Update previous octave for comparison
                    }
                }
        
                if (combinedNote == '') {
                    previousOctave = '';
                }
                mergedNotes += combinedNote || '-';
            }
        
            mergedLines[index] = mergedNotes;
        }
        
        
        
        
    });

    console.log("Merged Lines:", mergedLines);

    let mergedFinalLine = '';
    for (let line of mergedLines) {
        mergedFinalLine += line;
    }

    // Main mapping logic
    for (let i = 0; i < mergedFinalLine.length; i++) {
        const char = mergedFinalLine[i];

        if (char === '-') {
            waitTime += 140;
            continue;
        }

        else if (char === '*') {
            script += `    sleep, 50\n`;
        }

        else {
            const note = char;                      // The current character is the note
            const octave = mergedFinalLine[i + 1];  // The next character is the octave

            const noteKey = `${note}${octave}`;
            const mappedKey = keyMap[noteKey];

            if (mappedKey) {
                if (waitTime > 0) {
                    script += `    sleep, ${waitTime}\n`;
                    waitTime = 0;
                }

                script += `    send, ${mappedKey}\n`;
            } 
            // else {
            //     console.log(`Note ${noteKey} not found in keyMap`);
            // }

            // Skip the octave character since it was just processed
            i += 1; 

        }
    }
    
    script += `    reload
        reload`;

    return script;
};

export default NotesMapper;

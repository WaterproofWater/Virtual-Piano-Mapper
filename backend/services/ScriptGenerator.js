const ScriptGenerator = (data) => {
    const { notes, keyMap, startKey, stopKey, delay} = data;
    const consecutiveDelay = Math.round(delay * 0.8);

    let script = `*${stopKey}:: 
    Reload 
    return

*${startKey}::\n`;
     
    let waitTime = 0;  
    const lines = notes.split('\n');

    // Strip LH and RH tags 
    for (let i = 0; i < lines.length; i++) {
        if (lines[i]) {
            const firstThreeChars = lines[i].slice(0, 3);
    
            if (firstThreeChars === "RH:" || firstThreeChars === "LH:") {
                lines[i] = lines[i].slice(3);
            }
        }
    }

    console.log("Org Lines:",lines);

    // Merge concurrent lines into group logic
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
    
    // Last line merge (if necessary)
    if (mergeGroup.length > 0) {
        if (mergeGroup.length === 1) {
            mergedLines.push(mergeGroup[0]);
        } 
        else {
            mergedLines.push([...mergeGroup]);
        }
    }

    console.log("raw merged lines: ", ...mergedLines)

    // Merge concurent group into line, and implements consecutive delay for consecutive notes
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
                        previousOctave = octave;
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
            const notesArray = line.map(l => l.split('|')[1]);   // Extract notes part from each line
            const octavesArray = line.map(l => l.split('|')[0]); // Extract octaves from each line
            const rowLen = octavesArray.length;
            const columnLen = notesArray[0].length;
            let lastElement = '-';
        
            for (let i = 0; i < columnLen; i++) {
                let combinedNote = '';
        
                for (let j = 0; j < rowLen; j++) {
                    const note = notesArray[j][i];
                    const octave = octavesArray[j];
        
                    if (note !== '-') {
                        if (lastElement !== '-') {
                            combinedNote += `*${note}${octave}`;
                            lastElement = '-';

                        } 
                        else {
                            combinedNote += `${note}${octave}`;
                        }
                    }
                }
        
                if (combinedNote === '') {
                    combinedNote += '-';
                    lastElement = '-';
                }

                else {
                    lastElement = `a`;
                }

        
                mergedNotes += combinedNote;
            }

            mergedLines[index] = mergedNotes;
        }
        
        
        
        
    });

    // Troubleshoot section
    console.log("Merged Lines:", mergedLines);

    let mergedFinalLine = '';
    for (let line of mergedLines) {
        mergedFinalLine += line;
    }

// Helper function to escape backtick and percent characters
function escapeSpecialCharacters(input) {
    let escapedString = "";
    for (const char of input) {
        if (char === '`' || char === '%') {
            escapedString += `\`${char}`;
        } else {
            escapedString += char;
        }
    }
    return escapedString;
}

// Main mapping logic
let notesGroup = "";
for (let i = 0; i < mergedFinalLine.length; i++) {
    const char = mergedFinalLine[i];

    if (char === '-') {
        if (notesGroup !== "") {
            const escapedNotesGroup = escapeSpecialCharacters(notesGroup);
            script += `    SendRaw ${escapedNotesGroup}\n`;
        }
        notesGroup = "";
        waitTime += delay;
        continue;
    } 
    else if (char === '*') {
        if (notesGroup !== "") {
            const escapedNotesGroup = escapeSpecialCharacters(notesGroup);
            script += `    SendRaw ${escapedNotesGroup}\n`;
        }
        notesGroup = "";
        script += `    Sleep ${consecutiveDelay}\n`;
    } 
    else {
        const note = char;                      // Current character is the note
        const octave = mergedFinalLine[i + 1];  // Next character is the octave

        const noteKey = `${note}${octave}`;
        const mappedKey = keyMap[noteKey];

        if (mappedKey) {
            notesGroup += mappedKey;

            if (waitTime > 0) {
                script += `    Sleep ${waitTime}\n`;
                waitTime = 0;
            }
        }

        i += 1;
    }
}

// Final flush of notesGroup (if it isn't empty)
if (notesGroup !== "") {
    const escapedNotesGroup = escapeSpecialCharacters(notesGroup);
    script += `    SendRaw ${escapedNotesGroup}\n`;
}

    
    script += `    reload
    return`;

    return script;
};

export default ScriptGenerator;

import React, { useReducer, useState, useEffect, useCallback } from 'react';
import { Key, Octave, Note } from './models';
import WebMidi, { InputEventNoteon } from 'webmidi'


interface MidiKeyboardProps {
    onPlayedNote: (note: Note) => void;
}

const MidiKeyboard: React.FC<MidiKeyboardProps> = (props: MidiKeyboardProps) => {

    const emptyPlaingnote: Note = { name: "", octave: 0 };
    const [playingNote, setPlayingNote] = useState(emptyPlaingnote);

    useEffect(() => {
        WebMidi.enable(() => {
            console.log(WebMidi.inputs);
            console.log(WebMidi.outputs);

            var input = WebMidi.inputs[0];

            input.addListener('noteon', 'all', function (e) {
                console.log(JSON.stringify(e));
                console.log("Received 'noteon' message (" + e.note.name + e.note.octave + " " + e.timestamp + ").");
                const noteToPlay = { name: e.note.name, octave: e.note.octave };
                setPlayingNote(noteToPlay);
            });

        })
    }, [])

    useEffect(() => {
        props.onPlayedNote(playingNote);
    }, [playingNote])

    return <></>
}

export default MidiKeyboard;
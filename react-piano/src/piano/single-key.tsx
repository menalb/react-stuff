import React from 'react';
import './single-key.css'
import * as Tone from 'tone'

const SingleKey = (props: { name: string, note: Note }) => {
    const note = props.note;
    const play = () => {
        var synth = new Tone.Synth().toMaster()
        synth.triggerAttackRelease(note.name + note.position, '8n')
        console.log(props.name);
    }
    const label = (note: Note) => note.name + note.position;

    return <span className="key" onClick={() => play()}>
        {label(note)}
    </span>
}

interface Note {
    name: string;
    position: number;
}
export default SingleKey
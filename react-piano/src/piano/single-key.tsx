import React, { useState, useEffect } from 'react';
import './single-key.css'
import { Note } from './models';

const SingleKey = (props: { name: string, play: boolean, note: Note, onClick: () => void, onDeActivate: (note: Note) => void }) => {
    const note = props.note;
    const [isActive, setIsActive] = useState(props.play);
    const play = () => {
        props.onClick();
    }
    useEffect(() => {
        setIsActive(props.play);
        setTimeout(() => {
            if (props.play) {
                ///setIsActive(false);
                props.onDeActivate(note);
            }
        }, 1000);
    }, [props.play])

    const label = (note: Note) => note.name + note.octave;
    return <span className={`key ${isActive ? 'active' : ''}`} onClick={() => play()}>
        {label(note)}
    </span>
}

export default SingleKey
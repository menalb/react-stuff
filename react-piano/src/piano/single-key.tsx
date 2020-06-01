import React, { useState, useEffect } from 'react';
import './single-key.css'
import { Note } from './models';

const SingleKey = (props: { name: string, isActive?: boolean, note: Note, onClick: () => void }) => {
    const note = props.note;
    const [isActive, setIsActive] = useState(props.isActive ?? false);
    const play = () => {
        props.onClick();
    }
    useEffect(() => {
        setIsActive(props.isActive ?? false);
        setTimeout(() => {
            if (props.isActive)
                setIsActive(false);
        }, 2000);
    }, [props.isActive])

    const label = (note: Note) => note.name + note.octave;
    return <span className={`key ${isActive ? 'active' : ''}`} onClick={() => play()}>
        {label(note)}{isActive}
    </span>
}

export default SingleKey
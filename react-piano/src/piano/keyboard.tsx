import React from 'react';
import SingleKey from './single-key';
import './keyboard.css'
import { Key, Octave } from './models';

const Keyboard = () => <ul className="board">
    {
        octavesConfig.map((octave, index) =>
            <span key={index}>
                {RenderOctave(octave.notes, octave.position)}
            </span>)
    }
</ul>

const RenderOctave = (keys: Key[], position: number) => <>
    {keys.map((key, index) =>
        <li key={index} className={key.kind} >
            <SingleKey name={key.name} note={{ name: key.name, position: position }} />
        </li>
    )}
</>

const keysConfig: Key[] = [
    { kind: 'white', name: 'C' },
    { kind: 'black', name: 'C#' },
    { kind: 'white', name: 'D' },
    { kind: 'black', name: 'D#' },
    { kind: 'white', name: 'E' },
    { kind: 'white', name: 'F' },
    { kind: 'black', name: 'F#' },
    { kind: 'white', name: 'G' },
    { kind: 'black', name: 'G#' },
    { kind: 'white', name: 'A' },
    { kind: 'black', name: 'A#' },
    { kind: 'white', name: 'B' }];

const octavesConfig: Octave[] = [
    { notes: keysConfig, position: 3 },
    { notes: keysConfig, position: 4 },
    { notes: keysConfig, position: 5 },
]

export default Keyboard
import React, { useReducer, useState } from 'react';
import SingleKey from './single-key';
import './keyboard.css'
import { Key, Octave, Note } from './models';
import WebMidi from 'webmidi'
import * as Tone from 'tone'


const Keyboard = () => {

    const [keysLayout, setKeysLayout] = useState(layout);

    WebMidi.enable(() => {
        console.log(WebMidi.inputs);
        console.log(WebMidi.outputs);

        var input = WebMidi.inputs[0];

        input.addListener('noteon', 'all',
            function (e) {
                //console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
                const noteToPlay = { name: e.note.name, octave: e.note.octave };
                play(noteToPlay)

                const d = keysLayout
                    .map(x => {
                        if (x.note.name === noteToPlay.name && x.note.octave === noteToPlay.octave) {
                            return { ...x, isActive: true }
                        }
                        return { ...x }
                    })

                setKeysLayout(d);
            }
        );

    })

    const play = (note: Note) => {
        var synth = new Tone.Synth().toMaster()
        synth.triggerAttackRelease(note.name + note.octave, '8n')
    }
    return <ul className="board">
        {
            keysLayout.map((x, index) => <span key={index}>
                <li key={index} className={x.key.kind} >
                    <SingleKey
                        name={x.key.name}
                        note={{ name: x.key.name, octave: x.octave }}
                        isActive={x.isActive}
                        onClick={() => play(x.note)}
                    />
                </li>
            </span>)
        }
    </ul>
}

// const RenderOctave = (keys: Key[], position: number, play: (note: Note) => void) => <>
//     {keys.map((key, index) =>
//         <li key={index} className={key.kind} >
//             <SingleKey
//                 name={key.name}
//                 note={{ name: key.name, octave: position }}
//                 onClick={() => play({ name: key.name, octave: position })}
//             />
//         </li>
//     )}
// </>


const buildNote = (key: Key, octave: number): Note => ({ name: key.name, octave: octave })

type layoutConfig = ({ key: Key, octave: number, note: Note, isActive: boolean })[];

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

const layout: layoutConfig =
    octavesConfig
        .flatMap(acc =>
            acc.notes.map(a => (
                {
                    key: a,
                    octave: acc.position,
                    note: buildNote(a, acc.position),
                    isActive: false
                })))

export default Keyboard
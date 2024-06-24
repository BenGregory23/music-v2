import noteImg from '../assets/music_note.png'
import {useRef} from "react";

const MusicNote = ({rotation, facing, interval}:{rotation: number, facing: 'left' | 'right', interval?: number }) =>{
    // const interval = useRef(setInterval(()))

    const rotationPossiblePositions = {
        0: 'rotate-0',
        1: 'rotate-1',
        2: 'rotate-2',
        3: 'rotate-3',
        4: 'rotate-4',
        5: 'rotate-5',
        6: 'rotate-6',
        12: 'rotate-12',
        45: 'rotate-45',
        90: 'rotate-90',
        180: 'rotate-180',
        270: 'rotate-270',
        360: 'rotate-360'
    };


    return (
        <div className={rotationPossiblePositions[rotation]}>
            <img
                src={noteImg}
                className={`animate-note-move ${facing === 'left' ? 'transform -scale-50' : ''}`}
            />
        </div>
    )

}


export default MusicNote;
import noteImg from '../assets/music_note.png'
import { useMusicStore } from '../stores/musics.ts'; 

const MusicNote = ({rotation, facing, delay}:{rotation: number, facing: 'left' | 'right', delay?: number }) =>{
    const playing = useMusicStore((state) => state.playing);
    // const interval = useRef(setInterval(()))


    console.log()

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

    const delayOptions = {
        0: 'delay-0',
        75: 'delay-75',
        100: 'delay-100',
        150: 'delay-150',
        200: 'delay-200',
        300: 'delay-300',
        500: 'delay-500',
        700: 'delay-700',
        1000: 'delay-1000'
    }

    if(!playing) return null;

    return (
        <div className={rotationPossiblePositions[rotation]}>
            <img
                src={noteImg}
                className={`animate-note-move  ${facing === 'left' ? 'transform -scale-50' : ''} ${delay ? delayOptions[delay?.toString()] : ''}`}
            />
        </div>
    )

}


export default MusicNote;
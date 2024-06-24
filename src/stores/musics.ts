import {create} from "zustand"
import {TMusic} from "@/types.ts";


interface MusicState {
    musics: any[] | any,
    currentMusic: string | any;
    playing: boolean;
    addMusic: (music: TMusic) => any;
    removeMusic: (music: TMusic) => void;
    setCurrent: (music: TMusic) => void;
    setPlaying: (playing: boolean) => void;
}

const getMusics = () : any[] => {
    const musics = localStorage.getItem("musics")
    if(musics) return JSON.parse(musics)
    else {
        console.warn("NO_LOCAL_MUSICS")
        return []
    }
}

const getFirstMusic = () => {
    const musics = localStorage.getItem("musics")
    if(musics) return JSON.parse(musics)[0]
    else {
        console.warn("NO_LOCAL_MUSICS")
        return []
    }
}

export const useMusicStore  = create<MusicState>((set) => ({
    musics: getMusics(),
    currentMusic: getFirstMusic(),
    playing: false,
    addMusic: (music: TMusic) => set((state: MusicState) => {
        state.musics.push(music)
        localStorage.setItem("musics", JSON.stringify(state.musics))
        getMusics()
        return {musics: state.musics};
    }),
    removeMusic: (music: TMusic) => set((state: MusicState) => {
        localStorage.setItem("musics", JSON.stringify(state.musics.filter((m:TMusic) => m.youtubeLink !== music.youtubeLink)));
        return {musics: state.musics.filter((m:TMusic) => m.youtubeLink !== music.youtubeLink)}
    }),
    setCurrent: (music: TMusic) => set(()=>{
        localStorage.setItem("currentMusic", JSON.stringify(music))
        return {currentMusic: music}
    }),
    setPlaying: (playing: boolean) => set(() => {
        return {playing: playing}
    }),
}))









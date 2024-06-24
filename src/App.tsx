import List from "./components/list.tsx";
import {useMusicStore} from "@/stores/musics.ts";
import usePlay from "@/hooks/usePlay.ts";
import MusicNote from "./components/music-note.tsx";
import Player from "@/components/player.tsx";

function App() {
    const currentMusic = useMusicStore((state)=> state.currentMusic)
    const playing = useMusicStore((state)=> state.playing)
    const setPlaying = useMusicStore((state)=> state.setPlaying)
    const [play, pause] = usePlay()


  return (
      <div>

          <div className={"absolute backdrop-blur w-screen h-screen"}>

          </div>
          {currentMusic.imageUrl ?
              <img className={"absolute h-screen w-screen object-cover -z-30"} src={currentMusic.imageUrl}
                   alt={"test"}/> : null}

          <div className={"z-0"}>

              <List />
              <div className={'relative flex h-screen items-center justify-center w-full'}>
                  <Player/>

                  <div className="absolute left-50 z-40">
                      <MusicNote rotation={0} facing={'right'} />
                      <MusicNote rotation={45} facing={"right"} />
                      <MusicNote rotation={90} facing={'left'} />
                      <MusicNote rotation={180} facing={'left'} />
                      <MusicNote rotation={180} facing={'left'} />


                  </div>

                  {/*<Button variant={"ghost"} className={"hover:bg-transparent "} onClick={() => {*/}
                  {/*    if (playing) {*/}
                  {/*        pause()*/}
                  {/*        setPlaying(false)*/}
                  {/*    } else if (!playing) {*/}
                  {/*        play();*/}
                  {/*        setPlaying(true)*/}
                  {/*    }*/}
                  {/*}}>*/}
                  {/*    <img*/}
                  {/*        className={`w-96 h-96 object-contain   transition z-0  ${playing ? 'animate-spin-slow' : null}`}*/}
                  {/*        src={vinylImg}/>*/}
                  {/*</Button>*/}

              </div>

          </div>
      </div>
  )
}

export default App

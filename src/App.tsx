import List from "./components/list.tsx";
import { useMusicStore } from "@/stores/musics.ts";
import usePlay from "@/hooks/usePlay.ts";
import MusicNote from "./components/music-note.tsx";
import Player from "@/components/player.tsx";

function App() {
  const currentMusic = useMusicStore((state) => state.currentMusic);
  const playing = useMusicStore((state) => state.playing);
  const setPlaying = useMusicStore((state) => state.setPlaying);
  const [play, pause] = usePlay();

  return (
    <div>
      <div className={"absolute backdrop-blur w-screen h-screen"}></div>
      {currentMusic.imageUrl ? (
        <img
          className={"absolute h-screen w-screen object-cover -z-30"}
          src={currentMusic.imageUrl}
          alt={"test"}
        />
      ) : 
      
        <div>
            <div className={"absolute h-screen w-screen bg-gradient-to-r from-teal-400 to-yellow-200"}></div>
        </div>
      }

      <div className={"z-0"}>
        <List />

        {currentMusic.youtubeLink ? (
          <div
            className={
              "relative flex h-screen items-center justify-center w-full"
            }
          >
            <Player />

            <div className="absolute left-50 z-40">
              <MusicNote rotation={0} facing={"right"} delay={0}/>
              <MusicNote rotation={45} facing={"right"} delay={100} />
              <MusicNote rotation={90} facing={"left"} delay={300} />
              <MusicNote rotation={180} facing={"left"} delay={500} />
            </div>

         
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;

import {
  PauseIcon,
  PlayIcon,
  TrackNextIcon,
  TrackPreviousIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button.tsx";
import { Progress } from "@/components/ui/progress.tsx";
import { useMusicStore } from "@/stores/musics.ts";
import { TMusic } from "@/types.ts";
import YouTube, { YouTubeProps } from "react-youtube";
import usePlay from "@/hooks/usePlay.ts";

function getIDfromURL(url: string): string {
  if (["", null, undefined].includes(url))
    throw new Error("An error has occurred while doing operation", {
      cause: "url is empty",
    });

  try {
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return match[2];
    }
  } catch (e) {
    console.error(e);
    return "";
  }

  return "";
}

const Player = () => {
  const playing = useMusicStore((state) => state.playing);
  const currentMusic: TMusic = useMusicStore((state) => state.currentMusic);
  const setPlaying = useMusicStore((state) => state.setPlaying);
  const [play, pause] = usePlay();

  const youtubePlayerOptions: YouTubeProps["opts"] = {
    height: "0",
    width: "0",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  if (!currentMusic.youtubeLink) return null;

  return (
    <div className={"space-y-3 my-3 rounded-md z-50"}>
      <div className={"flex flex-col items-center my-3 "}>
        {currentMusic.imageUrl ? (
          <img
            className={"w-64 h-64 border object-cover rounded-sm"}
            src={currentMusic.imageUrl}
            alt={"music image"}
          />
        ) : (
          <div>
            <div className={"w-64 h-64 bg-slate-200 rounded-sm flex items-center justify-center"}>
              <span className={"text-white text-4xl font-semibold"}>
                {currentMusic.name[0]}
              </span>
            </div>
          </div>
        )}
        <span className={"font-semibold text-white text-xl my-2"}>
          {currentMusic ? currentMusic.name : null}
        </span>
        <Progress className={"w-64 bg-white bg-opacity-50"} />
        <YouTube
          id={"youtube"}
          videoId={getIDfromURL(currentMusic.youtubeLink)}
          opts={youtubePlayerOptions}
        />{" "}
      </div>

      <section className={"flex w-full space-x-6 justify-center"}>
        <Button className={"hover:bg-black"} variant={"ghost"}>
          <TrackPreviousIcon className={"text-white"} />
        </Button>
        <Button
          className={"hover:bg-black"}
          variant={"ghost"}
          onClick={() => {
            if (playing) {
              pause();
              setPlaying(false);
            } else {
              play();
              setPlaying(true);
            }
          }}
        >
          {playing ? (
            <PauseIcon className={"text-white"} />
          ) : (
            <PlayIcon className={"text-white"} />
          )}{" "}
        </Button>

        <Button variant={"ghost"} className={"hover:bg-black"}>
          <TrackNextIcon className={"text-white "} />
        </Button>
      </section>
    </div>
  );
};

export default Player;

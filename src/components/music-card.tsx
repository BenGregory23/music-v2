import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Label,
} from "@radix-ui/react-dropdown-menu";
import { DotsVerticalIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { useMusicStore } from "../stores/musics.ts";
import { Button } from "./ui/button.tsx";
import usePlay from "../hooks/usePlay.ts";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@radix-ui/react-dialog";
import { DialogHeader, DialogFooter } from "./ui/dialog.tsx";
import { Input } from "./ui/input.tsx";
import { useState } from "react";

const MusicCard = ({ music }: { music: any }) => {
  const musics = useMusicStore((state) => state.musics);
  const removeMusic = useMusicStore((state) => state.removeMusic);
  const setCurrentMusic = useMusicStore((state) => state.setCurrent);
  const setPlaying = useMusicStore((state) => state.setPlaying);
  const [play, pause] = usePlay();
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div
      onClick={() => {
        pause();
        setPlaying(false);
        setCurrentMusic(music);
        play();
        setPlaying(true);
      }}
      className={`w-full flex justify-between items-center border-t hover:cursor-pointer hover:bg-slate-50 transition duration-200 ${
        music.youtubeLink == musics[musics.length - 1].youtubeLink
          ? "border-b"
          : null
      }`}
    >
          {music.imageUrl ? (
            <img className={"w-20 h-20 object-cover"} src={music.imageUrl} />
          ) : (
            <div
           
              className={
                "w-20 h-20 flex font-medium text-xl items-center bg-slate-200 justify-center"
              }
            >
              {music.name[0]}
            </div>
          )}
     

      <span className={"text-lg font-medium"}>{music ? music.name : null}</span>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant={"ghost"} size={"sm"}>
            <DotsVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => removeMusic(music)}>
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>



   
    </div>
  );
};

export default MusicCard;

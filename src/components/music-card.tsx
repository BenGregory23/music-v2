import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { DotsVerticalIcon, ImageIcon, Pencil1Icon, Pencil2Icon } from "@radix-ui/react-icons";
import { useMusicStore } from "../stores/musics.ts";
import { Button } from "./ui/button.tsx";
import usePlay from "../hooks/usePlay.ts";
import { useState } from "react";

const MusicCard = ({ music,onOpenEditDialog }: { music: any, onOpenEditDialog: (open:boolean)=>void }) => {
  const musics = useMusicStore((state) => state.musics);
  const removeMusic = useMusicStore((state) => state.removeMusic);
  const setCurrentMusic = useMusicStore((state) => state.setCurrent);
  const setPlaying = useMusicStore((state) => state.setPlaying);
  const [play, pause] = usePlay();
  const [editing, setEditing] = useState(false);

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
      <div onClick={(event)=>{event.stopPropagation();onOpenEditDialog(true)}} className="flex items-center  justify-center bg-neutral-200 -500 w-20 h-20 group relative overflow-hidden">
        <div className="absolute justify-center items-center transition-all w-20 h-20 z-50 group-hover:flex hidden">
            <Pencil1Icon className="bg-black rounded-full p-2 w-9 h-9 text-white" />
        </div>
     
        {music.imageUrl ? (
          <img className={"w-20 h-20 object-cover group-hover:opacity-80 group-hover:scale-110 transition-all "} src={music.imageUrl} />
        ) : (
          <div
            className={
              "w-12 h-12 flex font-medium text-xl items-center  rounded-full justify-center group-hover:scale-110 transition-all"
            }
          >
            {music.name[0]}
          </div>
        )}
      </div>

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

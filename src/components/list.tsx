import { useMusicStore } from "../stores/musics.ts";
import { Button } from "@/components/ui/button.tsx";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";
import {
  Cross1Icon,
  CrumpledPaperIcon,
  HamburgerMenuIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { useRef, useState } from "react";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { TMusic } from "@/types.ts";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import MusicCard from "./music-card.tsx";

const List = () => {
  const musics = useMusicStore((state) => state.musics);
  const addMusic = useMusicStore((state) => state.addMusic);

  const [imageUrl, setImageUrl] = useState("");
  const [youtubeLink, setYouTubeLink] = useState("");
  const [musicName, setMusicName] = useState("");

  const [openList, setOpenList] = useState(true);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const displayMusics = () => {
    if (musics == null || musics.length == 0)
      return (
        <Alert>
          <CrumpledPaperIcon className="h-4 w-4" />
          <AlertTitle>No Musics</AlertTitle>
          <AlertDescription>
            You can add musics using the button below.
          </AlertDescription>
        </Alert>
      );
    else
      return musics.map((music: TMusic) => (
        <MusicCard
          music={music}
          key={music.youtubeLink}
          onOpenEditDialog={setOpenEditDialog}
        />
      ));
  };

  return (
    <div className="overflow-y-hidden">
      <Button
        variant={"ghost"}
        onClick={() => setOpenList(true)}
        className={"z-30 absolute text-white left-0 top-0"}
      >
        <HamburgerMenuIcon />
      </Button>

      <div
        className={`absolute flex flex-col h-screen overflow-hidden border-r transition-all duration-200 ease-out bg-white z-40 ${
          openList ? "w-96" : "w-0"
        } `}
      >
        <h2 className={"text-3xl p-5 font-bold"}>Musics </h2>

        <Button
          variant={"ghost"}
          className={"absolute right-0 top-0"}
          onClick={() => setOpenList(!openList)}
        >
          <Cross1Icon />
        </Button>

        <ScrollArea className="flex-1">{displayMusics()}</ScrollArea>

        <Dialog>
          <DialogTrigger className={"w-full p-5"}>
            {" "}
            <Button className={"w-full min-w-full space-x-2"}>
              <PlusCircledIcon /> <span> Add a music</span>
            </Button>{" "}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a music</DialogTitle>
              <DialogDescription>
                To add a music you need a link the youtube video, you can
                optionnally add a link to an image.
              </DialogDescription>
            </DialogHeader>
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="link">Youtube link</Label>
              <Input
                type="link"
                id="link"
                placeholder="Link"
                onChange={(e) => setYouTubeLink(e.target.value)}
              />

              <Label htmlFor="music">Music name</Label>
              <Input
                type="link"
                id="music"
                placeholder="Chill Lofi Jazz"
                onChange={(e) => setMusicName(e.target.value)}
              />

              <Label htmlFor="image">Image url</Label>
              <Input
                type="link"
                id="image"
                placeholder="Image link"
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button
                  onClick={() =>
                    addMusic({
                      youtubeLink: youtubeLink,
                      imageUrl: imageUrl,
                      name: musicName,
                    })
                  }
                  className={"w-full"}
                >
                  Add
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={openEditDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit this music</DialogTitle>
            </DialogHeader>
            <DialogContent>
              <Label htmlFor="image">Image url</Label>
              <Input
                type="link"
                id="image"
                placeholder="Image link"
                onChange={(e) => setImageUrl(e.target.value)}
              />

              <Button onClick={() => setOpenEditDialog(false)}>Close</Button>
            </DialogContent>
          </DialogContent>
        </Dialog>

        <div className={"w-full p-5"}>
          <p className={"text-muted-foreground text-xs"}>
            Made with ❤️ by Ben Gregory
          </p>
        </div>
      </div>
    </div>
  );
};

export default List;

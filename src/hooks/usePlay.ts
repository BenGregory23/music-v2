

const play = () => {
    console.log("play")
    const player = document.getElementById("youtube") as HTMLIFrameElement;
    player.contentWindow?.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        "*"
    );
};

const pause = () => {
    console.log("pause")
    const player = document.getElementById("youtube") as HTMLIFrameElement;
    player.contentWindow?.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        "*"
    );
};


export default function usePlay(){
    return [play,pause]
}
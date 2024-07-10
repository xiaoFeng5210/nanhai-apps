import {useEffect, useRef} from "react";

function structAudioSrc(n: string) {
  return `/mp3/${n}.mp3`;
}

const plays: Array<number> = []
const played: Array<number> = []

export function useBroadcast() {
  const LoopBroadcast = useRef(false)
  const audio_lack = useRef<HTMLAudioElement>(null)


  const isPlaying = useRef(false);
  const audioEnd = "/mp3/订单完成.mp3";
  const $myAudio = useRef<HTMLAudioElement>();
  const $welcome = useRef<HTMLAudioElement>();
  const audioStack = useRef<string[][]>([]); // 二维数组，第一维是播放列表，第二维是播放列表中的音频
  const playList = useRef<string[]>([]);

  const audioErrors = useRef<string>("");
  useEffect(() => {
    $myAudio.current = document.getElementById("audio") as HTMLAudioElement;
    // @ts-ignore
    audio_lack.current = document.getElementById('audio_lack') as HTMLAudioElement;
    // $myAudio.current = new Audio();
    isPlaying.current = false
  }, []);

  function createPlayList(strArr: string[]) {
    if (strArr.length === 1) {
      playList.current.push(structAudioSrc(strArr[0]));
      playList.current.push(audioEnd);
    } else if (strArr.length === 2) {
      playList.current.push(structAudioSrc("0"));
      playList.current.push(structAudioSrc(strArr[0]));
      playList.current.push(structAudioSrc(strArr[1]));
      playList.current.push(audioEnd);
    } else if (strArr.length === 3) {
      playList.current.push(structAudioSrc(strArr[0]));
      playList.current.push(structAudioSrc(strArr[1]));
      playList.current.push(structAudioSrc(strArr[2]));
      playList.current.push(audioEnd);
    } else if (strArr.length === 4) {
      playList.current.push(structAudioSrc(strArr[0]));
      playList.current.push(structAudioSrc(strArr[1]));
      playList.current.push(structAudioSrc(strArr[2]));
      playList.current.push(structAudioSrc(strArr[3]));
      playList.current.push(audioEnd);
    }
  }
  function playEndedHandler() {
    playList.current.shift();
    if (playList.current.length > 0) {
      $myAudio.current!.src = playList.current[0];
      $myAudio.current!.play().catch(err => {
      });
    }

    if (playList.current.length === 0) {
      audioStack.current.shift();

      const id = plays.shift()
      if (typeof id !== undefined) {
        played.push(id as number);
      }

      isPlaying.current = false
      $myAudio.current?.removeEventListener("ended", playEndedHandler, false);
    }
  }
  function playAudio() {
    if (plays.length === 0) return;

    isPlaying.current = true;
    playList.current = [];

    const id = plays[0]
    const strId = id.toString();
    const strArr = strId.split("");
    console.log(strArr)
    createPlayList(strArr);
    if (playList.current.length > 0) {
      audioStack.current.push(playList.current);
      $myAudio.current!.src = playList.current[0];
      $myAudio.current!.addEventListener("ended", playEndedHandler, false);
      $myAudio.current?.play().catch(err => {
        // audioErrors.current = err;
      });
    }
  }
  function pushPlay(id: number) {
    // FIXME 配置
    if (LoopBroadcast.current) {
      if (plays.includes(id)) return;
      plays.push(id);
    }
    else {
      if (plays.includes(id) || played.includes(id)) return;
      plays.push(id);
    }
  }

  function prePlay() {
    $myAudio.current!.src = "/mp3/开启语音.mp3";
    $myAudio.current?.play().then(() => {});
  }

  function play() {
    if (!$myAudio.current) return;
    if (isPlaying.current) return;

    if (plays.length > 0) {
      playAudio();
    }
  }

  return { play, audioStack, pushPlay, prePlay, audioErrors };
}

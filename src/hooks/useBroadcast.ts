import { useEffect, useRef, useCallback } from "react";

const isDevelopment = process.env.NODE_ENV === 'development';

function structAudioSrc(n: string): string {
  const basePath = isDevelopment ? '' : '/billboard';
  return `${basePath}/mp3/${n}.mp3`;
}

const plays: number[] = [];
const played: number[] = [];

export function useBroadcast(loopBroadcast: boolean = false) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlaying = useRef(false);
  const audioEndSrc = structAudioSrc("订单完成");
  const audioStack = useRef<string[][]>([]);
  const playList = useRef<string[]>([]);
  const audioErrors = useRef<string>("");

  useEffect(() => {
    audioRef.current = document.getElementById("audio") as HTMLAudioElement;
    if (!audioRef.current) {
      console.error("未找到音频元素");
    }
  }, []);
  const createPlayList = useCallback((strArr: string[]) => {
    playList.current = [];
    if (strArr.length === 1) {
      playList.current.push(structAudioSrc("0"));
      playList.current.push(structAudioSrc("0"));
      playList.current.push(structAudioSrc(strArr[0]), audioEndSrc);
    } else if (strArr.length >= 2 && strArr.length <= 4) {
      if (strArr.length === 2) playList.current.push(structAudioSrc("0"));
      strArr.forEach(num => playList.current.push(structAudioSrc(num)));
      playList.current.push(audioEndSrc);
    } else {
      console.error("输入数组长度无效");
    }
  }, []);

  const playEndedHandler = useCallback(() => {
    playList.current.shift();
    if (playList.current.length > 0) {
      if (audioRef.current) {
        audioRef.current.src = playList.current[0];
        audioRef.current.play().catch(err => {
          console.error("播放音频时出错，此时音频路径是:", playList.current[0], err);
          audioErrors.current = err.message;
        });
      }
    } else {
      audioStack.current.shift();
      const id = plays.shift();
      if (id !== undefined) {
        played.push(id);
      }
      isPlaying.current = false;
      audioRef.current?.removeEventListener("ended", playEndedHandler);
    }
  }, []);

  const playAudio = useCallback(() => {
    if (plays.length === 0 || !audioRef.current) return;

    isPlaying.current = true;
    const id = plays[0];
    const strArr = id.toString().split("");
    createPlayList(strArr);

    if (playList.current.length > 0) {
      audioStack.current.push(playList.current);
      audioRef.current.src = playList.current[0];
      audioRef.current.addEventListener("ended", playEndedHandler);
      audioRef.current.play().catch(err => {
        console.error("播放音频时出错, 此时音频路径是:", playList.current[0], err);
        audioErrors.current = err.message;
      });
    }
  }, [createPlayList, playEndedHandler]);

  const pushPlay = useCallback((id: number) => {
    if (loopBroadcast) {
      if (!plays.includes(id)) plays.push(id);
    } else {
      if (!plays.includes(id) && !played.includes(id)) plays.push(id);
    }
  }, [loopBroadcast]);

  const prePlay = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.src = structAudioSrc("开启语音");
      audioRef.current.play().catch(err => {
        console.error("预播放音频时出错:", err);
      });
    }
  }, []);

  const play = useCallback(() => {
    if (!audioRef.current || isPlaying.current) return;
    if (plays.length > 0) {
      playAudio();
    }
  }, [playAudio]);

  return { play, audioStack, pushPlay, prePlay, audioErrors };
}

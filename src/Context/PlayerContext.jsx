/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
    const volumeRef = useRef();

    const [track, setTrack] = useState(songsData[1]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: "0:00",
        totalTime: "0:00"
    });
    const [volume, setVolume] = useState(1); // Volume level (1 means 100%)
    const [isMuted, setIsMuted] = useState(false);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    };

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    };

    const playWithId = async (id) => {
        await setTrack(songsData[id]);
        await audioRef.current.play();
        await setPlayStatus(true);
    };

    const previous = async () => {
        if(track.id > 0) {
            await setTrack(songsData[track.id - 1]);
            await audioRef.current.play();
            await setPlayStatus(true);
        }
    }

    const next = async () => {
        if(track.id < songsData.length - 1) {
            await setTrack(songsData[track.id + 1]);
            await audioRef.current.play();
            await setPlayStatus(true);
        }
    }

    const seekSong = async (e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
    }

    const changeVolume = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    }

    const toggleMute = () => {
        setIsMuted(!isMuted);
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
        }
    }

    useEffect(() => {
        const updateTime = () => {
            if (audioRef.current) {
                const current = audioRef.current.currentTime;
                const duration = audioRef.current.duration;

                if (!isNaN(current) && !isNaN(duration) && duration > 0) {
                    setTime({
                        currentTime: formatTime(current),
                        totalTime: formatTime(duration)
                    });

                    if (seekBar.current) {
                        seekBar.current.style.width = `${(current / duration) * 100}%`;
                    }
                }
            }
        };

        if (audioRef.current) {
            audioRef.current.ontimeupdate = updateTime;
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.ontimeupdate = null;
            }
        };
    }, []);

    
    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track, setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        volume, setVolume,
        isMuted, toggleMute,
        play, pause,
        playWithId,
        previous,
        next,
        seekSong,
        changeVolume, 
        volumeRef,
    };


    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
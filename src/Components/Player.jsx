// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { PlayerContext } from '../Context/PlayerContext'

const Player = () => {
    const {track, seekBg, seekBar, playStatus, play, pause, time, previous, next, seekSong, volume, changeVolume, isMuted, toggleMute} = useContext(PlayerContext);

    return (
        <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
            <div className="hidden lg:flex items-center gap-4">
                <img className='w-12' src={track.image} alt="" />
                <div>
                    <p>{track.name}</p>
                    <p>{track.desc.slice(0,12)}</p>
                </div>
            </div>
            <div className="flex flex-col items-center gap-1 m-auto">
                <div className="flex gap-4">
                    <img src={assets.shuffle_icon} alt="" className="w-4 cursor-pointer" />
                    <img onClick={previous} src={assets.prev_icon} alt="" className="w-4 cursor-pointer" />
                    {
                        playStatus ? <img onClick={pause} src={assets.pause_icon} alt="" className="w-4 cursor-pointer" />
                        : <img onClick={play} src={assets.play_icon} alt="" className="w-4 cursor-pointer" />
                    }
                    <img onClick={next} src={assets.next_icon} alt="" className="w-4 cursor-pointer" />
                    <img src={assets.loop_icon} alt="" className="w-4 cursor-pointer" />
                </div>
                <div className="flex items-center gap-5">
                    <p>{time.currentTime}</p>
                    <div ref={seekBg} onClick={seekSong} className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer">
                        <hr ref={seekBar} className="h-1 border-none w-0 bg-green-800 rounded-full" />
                    </div>
                    <p>{time.totalTime}</p>
                </div>
            </div>
            <div className="hidden lg:flex items-center gap-2 opacity-75">
                <img src={assets.play_icon} alt="" className="w-4" />
                <img src={assets.mic_icon} alt="" className="w-4" />
                <img src={assets.queue_icon} alt="" className="w-4" />
                <img src={assets.speaker_icon} alt="" className="w-4" />
                
                <img onClick={toggleMute} src={isMuted ? assets.mute_icon : assets.volume_icon} alt="" className="w-4 cursor-pointer mute" />
                <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={volume} 
                    onChange={changeVolume} 
                    className="w-20"
                />

                <img src={assets.mini_player_icon} alt="" className="w-4" />
                <img src={assets.zoom_icon} alt="" className="w-4" />
            </div>
        </div>
    );
};

export default Player;

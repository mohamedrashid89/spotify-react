/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import { PlayerContext } from '../Context/PlayerContext'

const SongItem = ({name,image,desc,id}) => {

  const {playWithId} = useContext(PlayerContext)

  return (
    <div onClick={()=>playWithId(id)} className='min-w-[180px] p-2 px-3 cursor-pointer hover:bg-[#ffffff26]'>
        <img src={image} alt="" className="rounded" />
        <p className="font-bold mt-2 mb-1">{name}</p>
        <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  )
}

export default SongItem
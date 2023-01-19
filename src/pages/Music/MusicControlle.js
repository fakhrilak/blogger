import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Wrapper from '../../components/Wrapper/Wrapper'
import { API, config, Socket } from '../../config/API'
import {BiSkipNext,BiSkipPrevious} from "react-icons/bi"
import {FaPlay,FaPause} from "react-icons/fa"
const MusicControlle = ({auth}) => {
    const [playList,setPlayList] = useState()
    const [idPlaylist,setIdPlayList] = useState()
    const [music_fav,setMusic_fav] = useState()
    const [indexPlay,setIndexPlay] = useState()
    const [statusPlay,setStatusPlay] = useState(false)
    const [keyword,setKeyword] = useState("")
    const [music,setMusic] = useState()
    const [mode,setMode] = useState(0)
    const [volume,setVolume] = useState(0.2)
    useEffect(()=>{
        if(auth.user){
            Socket.emit("joinMusic",{
                "email" : auth.user.email,
                "mode" : "controller",
                "socketId" : Socket.id
            })
            API.get("/playlist",config)
            .then((res)=>{
                setPlayList(res.data.data)
            })
            .catch((err)=>{
                alert(err.response.message)
            })
        }
    },[auth])
    useEffect(()=>{
        if(idPlaylist){
            Socket.emit("reqToSpeakerRenderPlaylist",{id:idPlaylist,email:auth.user.email})
            API.get("/playlist/"+idPlaylist,config)
            .then((res)=>{
                setMusic_fav(res.data.data.Music)
                setMusic(res.data.data.Music)
            })
            .catch((err)=>{
                alert(err.response.message)
            })
        }
    },[idPlaylist])
    useEffect(()=>{
        if(music_fav){
            const filtered = music.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(keyword.toLowerCase())
            })
            setMusic_fav(filtered)
        }
    },[keyword])
    const dataloop=[
        "order",
        // "orderLoop",
        "shufflePlay",
        // "singleLoop"
    ]
  return (
    <Wrapper>
        <div className='w-10/12 m-auto'>
            <div className='mt-5 font-bold mb-5'>
                <p className='text-2xl text-center'>Music Controller</p>
            </div>
            {playList?<div className="mt-2">
                <select
                className="w-full h-10 rounded text-center"
                onChange={(e)=>setIdPlayList(e.target.value)}
                >
                    <option>Select PlayList</option>
                    {playList.map((data,index)=>(
                        <option
                        key={index}
                        value={data._id}
                        >{data.name}</option>
                    ))}
                </select>
            </div>:null}
            <div className='grid grid-cols-3 gap-2 text-center'>
                <div>
                    <button>
                        <BiSkipPrevious
                        onClick={()=>{
                            setIndexPlay(indexPlay-1)
                            Socket.emit("reqPlayIndex",{email:auth.user.email,index:indexPlay})
                        }}
                        size={100}
                        />
                    </button>
                </div>
                <div>
                    <button
                    className='mt-5'
                    >
                        {statusPlay ? <FaPause
                        className=''
                        onClick={()=>{
                            setStatusPlay(!statusPlay)
                            Socket.emit("reqPlayStatus",{email:auth.user.email,status:statusPlay})
                        }}
                        size={50}/>:<FaPlay
                        onClick={()=>{
                            setStatusPlay(!statusPlay)
                            Socket.emit("reqPlayStatus",{email:auth.user.email,status:statusPlay})
                        }}
                        size={50}/>}
                    </button>
                </div>
                <div>
                    <button>
                        <BiSkipNext size={100}
                        onClick={()=>{
                            setIndexPlay(indexPlay+1)
                            Socket.emit("reqPlayIndex",{email:auth.user.email,index:indexPlay})
                        }}
                        />
                    </button>
                </div>
            </div>
            <div className='mb-8'>
                <button
                className='w-40 h-10 bg-white rounded font-bold text-lg'
                onClick={()=>{
                    if(mode == 1){  
                        Socket.emit("reqChangePlaymode",{email:auth.user.email,mode:dataloop[mode]})
                        setMode(0)
                    }else{
                        Socket.emit("reqChangePlaymode",{email:auth.user.email,mode:dataloop[mode]})
                        setMode(mode+1)
                    }
                
                }}
                >{dataloop[mode]}</button>
            </div>
            <div className='grid grid-cols-3 gap-1'>
                <div>
                    <button
                    className='w-full h-10 bg-white rounded font-bold text-lg'
                    onClick={()=>{
                        if(volume>=0.1){
                            Socket.emit("reqChangeVolume",{email:auth.user.email,volume:volume})
                            setVolume(volume-0.1)
                        }
                    }}
                    >DOWN</button>
                </div>
                <div>
                    <p className='text-center font-bold text-lg'>{volume.toFixed(1)}</p>
                </div>
                <div className='mb-8'>
                    <button
                    className='w-full h-10 bg-white rounded font-bold text-lg'
                    onClick={()=>{
                        if(volume<=0.9){
                            Socket.emit("reqChangeVolume",{email:auth.user.email,volume:volume})
                            setVolume(volume+0.1)
                        }
                    }}
                    >UP</button>
                </div>
            </div>
            <div>
                <input
                className='w-80 rounded h-10 mb-10'
                placeholder='Search'
                value={keyword}
                onChange={(e)=>setKeyword(e.target.value)}
                />
            </div>
            {music_fav?
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-3'>
            {music_fav.map((data,index)=>(
                <div className="w-full rounded border-2 border-black text-center bg-gray-400 
                h-72 text-underline mt-2 cursor-pointer"
                key={index}
                onClick={()=>{
                    // setIndexPlay(index)
                    for(let i = 0;i<music.length;i++){
                        if(music[i]._id == data._id){
                            setIndexPlay(i)
                        }
                    }
                    Socket.emit("reqPlayIndex",{email:auth.user.email,index:indexPlay})
                }}
                >
                    <div className="w-full"
                    >
                        <img src={data.thumnail} 
                        className="w-full h-56 rounded"/>
                    </div>
                    <div className="pt-3">
                        <p
                        className="m-1 lg:m-2 md:m-2 overflow-hidden overflow-ellipsis h-4 max-w-2xl sm:max-w-10 text-xs"
                        >{data.title}</p>
                    </div>
                </div>
                ))}
            </div>:null}
        </div>
    </Wrapper>  
  )
}
const mapStateToProps = (state) => ({
    auth: state.auth,
});
  
export default connect(mapStateToProps, {})( MusicControlle);
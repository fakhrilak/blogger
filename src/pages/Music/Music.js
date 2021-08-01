import { config } from 'dotenv';
import React, { useEffect, useState } from 'react'
import "react-jinke-music-player/assets/index.css";
import ReactJkMusicPlayer from 'react-jinke-music-player';
import Wrapper from '../../components/Wrapper/Wrapper';
import { API,musicUrl } from '../../config/API';
import logo from "../../img/logo.png"
const Music = () => {
    const [music_coll,setMusic_coll] = useState([])
    const [play,setPlay] = useState('')
    const [music_fav,setMusic_fav] = useState([])
    const [playlist,setPlaylist] = useState([])
    const [triger,setTriger] = useState(false)
    let [audioIntance,setAudioIntance] = useState(null)
    const [page,setpage] = useState(false)
    var myAudio = document.createElement('audio')
    useEffect(()=>{
        API.get("/music",config)
        .then((res)=>{
            setMusic_coll(res.data.data)
        })
        .catch((err)=>{
            alert(err.message)
        })
    },[])

    useEffect(()=>{
        API.get("/user-music",config)
        .then((res)=>{
            setMusic_fav(res.data.data.Music)
        })
        .catch((err)=>{
            alert(err.message)
        })
    },[page,triger])

    useEffect(()=>{
        setPlaylist(music_fav.map((music)=>({
            name: music.name,
            artis: "No artist",
            musicSrc: `${musicUrl}/api/v1/blogger/music?name=`+music.name,
            // musicSrc: "http://c1a51b39bdd6.ngrok.io/api/v1/blogger/music?name="+music.name,
        })))
    },[music_fav])

    const backgrondRandom=()=>{
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        return "#"+randomColor
    }

    const addFav=(id)=>{
        const body={
            "id_music": id
        }
        API.post("/user-music",body,config)
        .then((res)=>{
            alert(res.data.message)
        })
        .catch((err)=>{
            alert(err.message)
        })
    }

    const deletFav=(id)=>{
        API.delete(`/user-music/${id}`,config)
        .then((res)=>{
            alert(res.data.message)
            setTriger(!triger)
        })
        .catch((err)=>{
            alert(err.message)
        })
    }

    
    return (
        <Wrapper>
            <div className="w-12/12 m-auto">
                <div className="pt-10 w-11/12 m-auto">
                    <div className="grid lg:grid-cols-5 w-full pb-5 gap-5">
                        <div className="mt-2">
                            <button 
                            className="font-bold bg-white rounded w-44"
                            onClick={()=>setpage(false)}
                            >My Music</button>
                        </div>
                        <div className="mt-2">
                            <button 
                            className="font-bold bg-white rounded w-44"
                            onClick={()=>setpage(true)}
                            >Music Collections</button>
                        </div>
                        
                        {/* <input
                        className="ml-10 rounded text-center"
                        placeholder="Search"
                        /> */}
                    </div>
                    {page && <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-5 lg:gap-10  pb-20">
                    {music_coll.map((data,index)=>(
                        <div className="w-full rounded border-2 border-black text-center bg-gray-400 m-2 
                        h-auto text-underline"
                        >
                            <div className="w-full h-44"
                            style={{backgroundColor:backgrondRandom()}}
                            >
                                <div
                                className="float-right mr-2 mt-1"
                                >
                                    <button
                                    className="font-bold text-sm text-white w-5 h-5 bg-green-700 rounded-full"
                                    onClick={()=>addFav(data._id)}
                                    >+</button>
                                </div>
                            </div>
                            <p
                            className="m-1 lg:m-2 md:m-2 overflow-hidden overflow-ellipsis h-4 max-w-2xl sm:max-w-10 text-xs"
                            >{data.name}</p>
                        </div>
                    ))}
                    </div>}
                    {!page && <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-5 lg:gap-10  pb-20">
                    {music_fav.map((data,index)=>(
                        <div className="w-full rounded border-2 border-black text-center bg-gray-400 m-2 
                        h-auto text-underline"
                        >
                            <div className="w-full h-44"
                            style={{backgroundColor:backgrondRandom()}}
                            >
                                <div
                                className="float-right mr-2 mt-1"
                                >
                                    <button
                                    className="font-bold text-sm text-white w-5 h-5 bg-red-500 rounded-full"
                                    onClick={()=>deletFav(data._id)}
                                    >x</button>
                                </div>
                            </div>
                            <p
                            className="m-1 lg:m-2 md:m-2 overflow-hidden overflow-ellipsis h-4 max-w-2xl sm:max-w-10 text-xs"
                            >{data.name}</p>
                        </div>
                    ))}
                    </div>}
                </div>
                {playlist.length>0 && <div>
                        <ReactJkMusicPlayer
                        mode="full"
                        showMediaSession={true}
                        audioLists={playlist}
                        defaultPlayIndex={0}
                        autoPlay={false}
                        showDownload={false}
                        showThemeSwitch={true}
                        responsive={false}
                        glassBg={false}
                        playIndex={play}
                        getAudioInstance={(intance)=>setAudioIntance(intance)}
                        />
                        
                </div>}
            </div>
        </Wrapper>
    )
}

export default Music

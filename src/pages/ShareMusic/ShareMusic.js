import React, { useEffect, useState } from 'react'
import Wrapper from '../../components/Wrapper/Wrapper'
import { API,hostshare,musicUrl } from '../../config/API'
import Js from "../../img/js.png"
import { Line, Circle, ProgressProps } from 'rc-progress';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/lib/styles/index.less'
import logo from "../../img/logo.png"
import { Redirect } from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import COPY from "../../img/copy.png"
import {ShareSocial} from 'react-share-social' 

const ShareMusic = ({match}) => {
    const [playlist,setPlaylist] = useState(null)
    const [currentPlay,setCurrentplay] = useState(null)
    const [mode,setMode] = useState("mini")
    const [playTime,setPlayTime] = useState(null)
    const [redirect,setRedirect] = useState(false)
    const [copy,setCopy] = useState()
    const [title, setTitle] = useState("Share Music");

    useEffect(() => {
        // This will run when the page first loads and whenever the title changes
        if (playlist){
            document.title = title;
            const favicon = document.getElementById("icon");
            favicon.href = playlist[0].cover;
        }
        
    }, [playlist]);
    const style = {
        background: "#9CA3AF",
        borderRadius: 3,
        border: 0,
        color: 'white',
        padding: '0 30px',
        marginTop:10
      };
    useEffect(()=>{
        API.get("/music/share/"+match.params.name)
        .then((res)=>{
            setPlaylist([{
                name:res.data.data.title,
                singer: res.data.data.author,
                musicSrc: `${musicUrl}`+res.data.data.title+".mp3",
                cover: res.data.data.thumnail,
            }])
        })
        .catch((err)=>{
            alert(err.message)
            setRedirect(true)
        })
    },[])
    const getPersen =(tot,cur)=>{
        return cur/tot * 100
    }
    const fixTime=(data)=>{
       let a =  parseFloat(data/60,1).toFixed(1)
       let b = a.toString()
    //    let haha = `${b[b.length-2]}`+":"+`${b[b.length]}`
       return `${b[b.length-3]}`+":"+`${b[b.length-1]}`
    }
  return (
    <Wrapper>
        {playlist?
        <>
        <p className="overflow-hidden text-black font-bold text-center"
        style={{overflow:"hidden",textOverflow:"ellipsis",height: 80,maxWidth:250
        ,whiteSpace:"nowrap",margin:'auto',paddingTop:20
        }}
        >{playlist[0].name}</p>
        <p className="text-black font-medium text-center">{"----- "}{playlist[0].singer}{" -----"}</p>
        <div className="pt-10">
            <img src={playlist[0].cover}
            className="rounded-full border border-gray-100 shadow-sm w-56 h-56 m-auto SPIN"
            /> 
        </div>
            <div className="grid grid-cols-10 gap-2 w-11/12 lg:w-6/12 m-auto pt-10">
            <p className='font-bold'>{playTime? fixTime(playTime.currentTime): "0.0" }</p>
            <Line
            strokeWidth={4}
            percent={playTime ? getPersen(parseFloat(playTime.duration/60,1).toFixed(2),parseFloat(playTime.currentTime/60).toFixed(2)):0} 
            strokeColor="#1c1316"
            className="w-full col-span-8 m-auto"
            />
            <p className='font-bold'>{playTime ? fixTime(playTime.duration) : "0.0" }</p>
        </div>
        <div className="w-11/12 fixed">
            <ReactJkMusicPlayer
            mode= "full"
            showPlayMode={true}
            showProgressLoadBar={false}
            showMiniModeCover={false}
            showMediaSession={true}
            audioLists={playlist}
            toggleMode={true}
            // playIndex={playIndex}
            defaultPlayIndex={0}
            autoPlay={true}
            showDownload={false}
            showThemeSwitch={false}
            responsive={false}
            showReload={false}
            showPlay={true}
            onAudioProgress={(audioInfo)=>{
            setPlayTime(audioInfo)
            // console.log(audioInfo)
            }}
            onModeChange={(mode)=>{
            setMode(mode)
            }}
            showMiniProcessBar={false}
            glassBg={false}
            showLyric={false}
            onAudioPlay={(currentPlayId,audioLists,audioInfo)=>{
            setCurrentplay(currentPlayId)
            }}
            mobileMediaQuery='(max-width: 500px) and (orientation : portrait)'
            />    
        </div>
        {playTime &&
        <div className="w-11/12 lg:w-6/12 m-auto pt-10 pb-10">
            <ShareSocial
                style={style}
                url ={encodeURI(hostshare+playTime.name)}
                socialTypes={['facebook','twitter','reddit','linkedin','line','hatena',"instapaper",'email']} 
                //  onSocialButtonClicked={ data=> console.log(data)}    
            />
        </div>
        }
        </>:redirect == false?
        <div className="w-100 pt-20">
            <div className="w-full">
                <img src={logo}
                className="animate-spin m-auto w-44"
                />
            </div>
        </div>:<Redirect to="/"/>
        }
    </Wrapper>
  )
}

export default ShareMusic
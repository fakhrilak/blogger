import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Wrapper from '../../components/Wrapper/Wrapper'
import { API, config, musicUrl, Socket } from '../../config/API'
import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/lib/styles/index.less'
import { Line, Circle, ProgressProps } from 'rc-progress';
const MusicSpeaker = ({auth,match}) => {
    const history = useHistory()
    const [music_fav,setMusic_fav] = useState()
    const [playlist,setPlaylist] = useState([])
    const [currentPlay,setCurrentplay] = useState(null)
    const [mode,setMode] = useState("mini")
    const [playTime,setPlayTime] = useState(null)
    const [playIndex,setPlayIndex] = useState()
    const [audioInstance,setAudioIntance] = useState()
    useEffect(()=>{
        if(auth.user){
            Socket.emit("joinMusic",{
                "email" : auth.user.email,
                "mode" : "speaker",
                "socketId" : Socket.id
            })
            Socket.on("onRes-joinMusic"+Socket.id.toString(),data=>{
                alert(data.message)
                history.push("/musicremote")
            })
        }
    },[auth])
    useEffect(()=>{
        Socket.on("onRes-reqToSpeakerRenderPlaylist"+Socket.id.toString(),data=>{
            // alert(data.id)
            window.location.href = "#/musicremote/speaker/"+data.id
            window.location.reload()
        })
    },[])
    useEffect(()=>{
        if(match.params.id){
            API.get("/playlist/"+match.params.id,config)
            .then((res)=>{
                setMusic_fav(res.data.data.Music)
            })
            .catch((err)=>{
                alert(err.message)
            })
        }
    },[])
    useEffect(()=>{
        if(music_fav){
            setPlaylist(music_fav.map((music)=>({
                name:music.title,
                singer: music.author,
                musicSrc: `${musicUrl}`+music.title+".mp3",
                cover: music.thumnail,
                // musicSrc: "http://c1a51b39bdd6.ngrok.io/api/v1/blogger/music?name="+music.name,
              })))
        }
    },[music_fav])
    useEffect(()=>{
        Socket.on("onRes-reqPlayIndex"+Socket.id.toString(),data=>{
            setPlayIndex(data.index)
        })
    },[])
    useEffect(()=>{
        if(audioInstance){
            Socket.on("onRes-reqPlayStatus"+Socket.id.toString(),data=>{
                if(data==true){
                    audioInstance.play()
                }else{
                    audioInstance.pause()
                }
                console.log(audioInstance)
            })
        }
        
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
        <div className='w-11/12 m-auto'>
            <div className='mt-5 font-bold mb-10'>
                <p className='text-2xl text-left'>Music Speaker</p>
            </div>
            <div className="w-full h-full bg-gray-700 rounded-2xl">
                   {currentPlay && playTime?<>
                   <p className="overflow-hidden text-black font-bold text-center"
                    style={{overflow:"hidden",textOverflow:"ellipsis",height: 80,maxWidth:250
                    ,whiteSpace:"nowrap",margin:'auto',paddingTop:20
                    }}
                   >{currentPlay.name}</p>
                   <p className="text-black font-medium text-center">{"----- "}{currentPlay.singer}{" -----"}</p>
                   <div className="pt-10">
                      <img src={currentPlay.cover}
                      className="rounded-full border border-gray-100 shadow-sm w-56 h-56 m-auto SPIN"
                      /> 
                   </div>
                   <div className="pb-10 grid grid-cols-10 gap-2 w-11/12 lg:w-6/12 m-auto pt-10">
                      <p className='font-bold'>{fixTime(playTime.currentTime) }</p>
                       <Line
                       strokeWidth={4}
                       percent={getPersen(parseFloat(playTime.duration/60,1).toFixed(2),parseFloat(playTime.currentTime/60).toFixed(2))} 
                       strokeColor="#1c1316"
                       className="w-full col-span-8 m-auto"
                       />
                       <p className='font-bold'>{fixTime(playTime.duration) }</p>
                       {/* {playTime.duration == playTime.currentTime?setPlayIndex(playIndex+1):null} */}
                   </div>
                   </>:<>
                        <p>Noplay</p>
                   </>}
               </div>
            {playlist.length>0 && localStorage.token&& playlist && 
                <div className="w-11/12 fixed">
                    <ReactJkMusicPlayer
                    mode= "full"
                    showPlayMode={true}
                    showProgressLoadBar={false}
                    showMiniModeCover={false}
                    showMediaSession={true}
                    audioLists={playlist}
                    toggleMode={true}
                    playIndex={playIndex}
                    defaultPlayIndex={0}
                    autoPlay={false}
                    showDownload={false}
                    showThemeSwitch={false}
                    responsive={false}
                    showReload={false}
                    showPlay={true}
                    getAudioInstance={(audioInstance)=>{
                        setAudioIntance(audioInstance)
                        Socket.on("onRes-reqPlayStatus"+Socket.id,data=>{
                            if(data==true){
                                audioInstance.play()
                            }else{
                                audioInstance.pause()
                            }
                        })
                    }}
                    onAudioProgress={(audioInfo)=>{
                        // RenderAudio(audioInfo)
                        setPlayTime(audioInfo)
                        if(audioInfo.ended == true){
                            setPlayIndex(playIndex+1)
                        }
                    }}
                    onModeChange={(mode)=>{
                        setMode(mode)
                    }}
                    showMiniProcessBar={false}
                    glassBg={false}
                    showLyric={false}
                    onAudioPlay={(currentPlayId,audioLists,audioInfo)=>{
                    setCurrentplay(currentPlayId)
                    console.log(currentPlayId,"audio info")
                    }}
                    mobileMediaQuery='(max-width: 500px) and (orientation : portrait)'
                    // getAudioInstance={(instance) => {
                    //   setAudioIntance(instance)
                    // }}
                    />    
                </div>
            }
        </div>
    </Wrapper>
  )
}
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, {})( MusicSpeaker);
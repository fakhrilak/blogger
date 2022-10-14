import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/lib/styles/index.less'
import Home from './pages/Home.js/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register.js/Register';
import { Provider } from "react-redux";
import store from "./redux/store/store"
import { API, config, setAuthToken ,musicUrl} from "./config/API";
import UserRoute from './components/Route/User';
import Profile from './pages/Profile/Profile';
import { loadUser } from './redux/actions/auth';
import Write from './pages/Write/Write';
import Form from './pages/Form/Form';
import AdminRoute from './components/Route/Admin';
import SubCategory from './pages/SubCategory/SubCategory';
import Read from './pages/Read/Read';
import Music from './pages/Music/Music';
import ShareMusic from './pages/ShareMusic/ShareMusic';
import { Redirect } from 'react-router-dom';
import Notfound from './pages/Notfound/Notfound';
import MusicChoose from './pages/Music/MusicChoose';
import MusicSpeaker from './pages/Music/MusicSpeaker';
import MusicControlle from './pages/Music/MusicControlle';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  const [music_fav,setMusic_fav] = useState([])
  const [playlist,setPlaylist] = useState([])
  const [currentPlay,setCurrentplay] = useState(null)
  const [mode,setMode] = useState("mini")
  const [playTime,setPlayTime] = useState(null)
  const [id,setId] = useState(null)
  const [playIndex,setPlayIndex] = useState(null)
  const [audioInTance,setAudioIntance] = useState(null)
  useEffect(()=>{
      store.dispatch(loadUser())
  },[])
    useEffect(()=>{
      if(id){
        API.get("/playlist/"+id,config)
        .then((res)=>{
            setMusic_fav(res.data.data.Music)
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
  },[id])
  useEffect(()=>{
    if(localStorage.token){
      setPlaylist(music_fav.map((music)=>({
        name:music.title,
        singer: music.author,
        musicSrc: `${musicUrl}`+music.title+".mp3",
        cover: music.thumnail,
        // musicSrc: "http://c1a51b39bdd6.ngrok.io/api/v1/blogger/music?name="+music.name,
      })))
    }
  },[music_fav,id])
  return (
    <Provider store={store}>
      <Router>
          <Switch>
              <Route exact path="/">
                <Home 
                currentPlay={currentPlay} 
                mode={mode}
                playTime={playTime}
                />
              </Route>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              <UserRoute exact path="/profile" component={Profile} to={"/login"}/>
              <UserRoute exact path="/write/:id" component={Write} to={"/login"}/>
              <UserRoute exact path="/music" to={"/login"}>
                <Music setId={setId} audioInTance={audioInTance}/>
              </UserRoute>
              <UserRoute
               exact path="/musicremote" to={"/login"}
              >
                <MusicChoose/>
              </UserRoute>
              <UserRoute exact path="/musicremote/speaker" component={MusicSpeaker}/>
              <UserRoute exact path="/musicremote/speaker/:id" component={MusicSpeaker}/>
              <UserRoute exact path="/musicremote/controller" component={MusicControlle}/>
              <AdminRoute exact path="/form" component={Form}/>
              <Route exact path="/sub-category/:id" component={SubCategory}/>
              <Route exact path="/content/:id" component={Read}/>
              <Route exact path="/share/:name" component={ShareMusic}/>
              <Route exact path='*' component={Notfound}/>
          </Switch>
          <div>
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
                      // playIndex={playIndex}
                      defaultPlayIndex={0}
                      autoPlay={false}
                      showDownload={false}
                      showThemeSwitch={false}
                      responsive={false}
                      showReload={false}
                      showPlay={true}
                      onAudioProgress={(audioInfo)=>{
                        setPlayTime(audioInfo)
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
                      // getAudioInstance={(instance) => {
                      //   setAudioIntance(instance)
                      // }}
                      />    
                  </div>}
          </div>
      </Router>
    </Provider>
  )
}

export default App


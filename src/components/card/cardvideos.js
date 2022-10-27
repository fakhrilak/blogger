import React, { useEffect, useState } from 'react'
import Video from 'react-video-renderer';
import { API, video_url } from '../../config/API';
const Cardvideos = (props) => {
  const [datavideo,setDataVideo] = useState([])
  React.useEffect(()=>{
    API.get(`/video?id=${props.id}`)
    .then((res)=>{
      setDataVideo(res.data.data)
    })
    .catch((err)=>{
      console.log(" ============ ERROR", err)
    })    
  },[datavideo])
  return (
    <div className='w-full'>
      <div className='mt-10 mb-10'>
        <p>VIDEOS</p>
      </div>
      <div className='grid grid-cols-2 gap-2'>
          {datavideo.length > 0 ?
          datavideo.map((data,index)=>(
            <Video src={video_url+"?type="+data.type+"&name="+data.title} key={index}>
                {(video, state, actions) => (
                    <div>
                      {video}
                      <div>{state.currentTime} / {state.duration} / {state.buffered}</div>
                      <progress value={state.currentTime} max={state.duration} onChange={actions.navigate} />
                      {/* <div>
                        <progress value={state.volume} max={1} onChange={actions.setVolume} /> 
                      </div> */}
                      <div/>
                      <button onClick={actions.play}
                      >Play</button>
                      <button onClick={actions.pause}>Pause</button>
                      <button onClick={()=>{console.log("hello")}}>Fullscreen</button>
                  </div>
                )}
            </Video>
          )):null}
      </div>
    </div>
  )
}

export default Cardvideos
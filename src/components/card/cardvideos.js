import React, { useEffect, useState } from 'react'
// import Video from 'react-video-renderer';
import { API, video_url } from '../../config/API';
const Cardvideos = (props) => {
  const [datavideo,setDataVideo] = useState([])
  React.useEffect(()=>{
    API.get(`/video?id=${props.id}`)
    .then((res)=>{
      setDataVideo(res.data.data)
    })
    .catch((err)=>{
      // //console.log(" ============ ERROR", err)
    })    
  },[datavideo])
  return (
    <div className='w-full'>
      <div className='mt-10 mb-10'>
        <p>VIDEOS</p>
      </div>
    </div>
  )
}

export default Cardvideos
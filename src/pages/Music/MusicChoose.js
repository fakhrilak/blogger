import React, { useEffect, useState } from 'react'
import Wrapper from '../../components/Wrapper/Wrapper'
import {FcSpeaker,FcMusic} from "react-icons/fc"
import { Socket } from '../../config/API'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
const MusicChoose = ({auth}) => {
    const [availableMode,setAvailableMode] = useState()
    const history = useHistory()
    useEffect(()=>{
        if(auth.user){
            Socket.emit("getMyPlayerMusic",auth.user)
            Socket.on("onRes-getMyPlayerMusic",data=>{
                console.log(data,"iniiii")
                setAvailableMode(data)
            })
        }
    },[auth])
  return (
    <Wrapper>
        {availableMode ?
        <>
            <div className={`w-11/12 m-auto mt-40 grid grid-cols-${availableMode.toString()}`}>
                {availableMode == 2 && 
                <div
                >
                    <FcSpeaker
                    className='w-11/12 m-auto'
                    onClick={()=>history.push("/musicremote/speaker")}
                    size={200}/>
                </div>}
                {availableMode && <div>
                    <FcMusic
                    className='w-11/12 m-auto'
                    onClick={()=>history.push("/musicremote/controller")}
                    size={200}/>
                </div>}
            </div>
            <div className='mt-20 text-center'>
                <p
                className='text-2xl font-bold'
                >Choose Mode</p> 
            </div>
        </>:null}
    </Wrapper>
  )
}
const mapStateToProps = (state) => ({
    auth: state.auth,
});
  
export default connect(mapStateToProps, {})(MusicChoose);
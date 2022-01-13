import React, { useEffect, useState } from 'react'
import Wrapper from '../../components/Wrapper/Wrapper'
import { API, config } from '../../config/API.js'
import { Line, Circle, ProgressProps } from 'rc-progress';
import {data} from "./data"
import img from "../../img/myfoto.jpeg"
import "./Home.css"
const Home = (props) => {
    const {currentPlay,mode,playTime} = props
    const [random,setRandom] = useState([])
    function getRandomArbitrary(min, max) {
        return parseInt(Math.random() * (max - min) + min) 
    }
    useEffect(()=>{
        let test = []
        for(let i =0;i<4;i++){
            test.push(
                
                <div className="w-full lg:w-80 border-2 mt-6 rounded shadow-2xl">
                    <p
                        className="text-justify m-2"
                        >
                        {data[getRandomArbitrary(0,data.length)].quote}
                    </p>
                </div>
            )
        }
        setRandom(test)
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
               {mode == "mini"?
               <div className="w-full h-full pb-20">
                   <div className="m-auto w-10/12">
                        <div className="pt-20">
                            <p className="w-auto text-center text-3xl font-bold animate-bounce">WELCOME TO ZILOG BLOGGER</p>
                        </div>
                        <div className="lg:flex xl:flex 2xl:flex m-auto">
                            <div className="m-auto">
                                {random}
                            </div>
                            <div className="m-auto pt-20">
                                <img src={img} className="w-80 sm:rounded rounded-t-lg"/>
                                <div className="w-full text-center h-10 bg-white mb-5 shadow-2xl  ">
                                    <p 
                                    className="m-auto font-bold  pt-2"
                                    >FAKHRIL AK</p>
                                </div>
                            </div>
                        </div>
                        
                   </div>
               </div>:
               <div className="w-full h-full">
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
                   <div className="grid grid-cols-10 gap-2 w-11/12 lg:w-6/12 m-auto pt-10">
                      <p className='font-bold'>{fixTime(playTime.currentTime) }</p>
                       <Line
                       strokeWidth={4}
                       percent={getPersen(parseFloat(playTime.duration/60,1).toFixed(2),parseFloat(playTime.currentTime/60).toFixed(2))} 
                       strokeColor="#1c1316"
                       className="w-full col-span-8 m-auto"
                       />
                       <p className='font-bold'>{fixTime(playTime.duration) }</p>
                   </div>
                   </>:<>
                        <p>Noplay</p>
                   </>}
               </div>
               }
        </Wrapper>
    )
}

export default Home

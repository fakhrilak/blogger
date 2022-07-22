import React, { useEffect, useState } from 'react'
import Wrapper from '../../components/Wrapper/Wrapper'
import { API, config } from '../../config/API.js'
import {data} from "./data"
import img from "../../img/myfoto.jpeg"
const Home = () => {
    const [random,setRandom] = useState([])
    function getRandomArbitrary(min, max) {
        return parseInt(Math.random() * (max - min) + min) 
    }
    const validating=(a)=>{
        for(let i =0;i<random.length;i++){
            if(random[i] == a){
                return false
            }
        }
        return true
    }
    const kocok=(dataa)=>{
        let test = []
        for(let i =0;i<4;i++){
            test.push(
                <div className="w-80 border-2 mt-6 rounded shadow-2xl">
                            <p
                                className="text-justify m-2"
                             >
                                {dataa[getRandomArbitrary(0,dataa.length)].quote}
                            </p>
                        </div>
            )

        }
        return test
    }
    return (
        <Wrapper>
               <div className="w-full h-full">
                   <div className="m-auto w-10/12">
                        <div className="pt-20">
                            <p className="w-auto text-center text-3xl font-bold animate-bounce">WELCOME TO ZIL BLOGGER</p>
                        </div>
                        <div className="lg:flex xl:flex 2xl:flex m-auto">
                            <div className="m-auto">
                                {kocok(data)}
                            </div>
                            <div className="m-auto pt-20">
                                <img src={img} className="w-80 sm:rounded md:rounded sm:rounded"/>
                                <div className="w-80 text-center h-10 bg-white mb-5 shadow-2xl  ">
                                    <p 
                                    className="m-auto font-bold"
                                    >FAKHRIL AK</p>
                                </div>
                            </div>
                        </div>
                        
                   </div>
               </div>
        </Wrapper>
    )
}

export default Home

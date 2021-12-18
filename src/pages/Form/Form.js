import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Wrapper from '../../components/Wrapper/Wrapper'
import { API, config, musicUrl } from '../../config/API'
import {Socket} from "../../config/API"
import { Line, Circle, ProgressProps } from 'rc-progress';
import logo from "../../img/logo.png"
const Form = () => {
    const[category,setCategory]= useState([])
    const[nameCategory,setNameCategory] = useState("")
    const[triger,setTriger] = useState(false)
    const[id,setId] = useState('')
    const[nameSubCategory,setNameSubCategory] = useState('')
    const[link,setLink] = useState('')
    const[cari,setCari] = useState('')
    const[progress,setProgress] = useState(null)
    const[loading,setLoading] = useState(null)
    const[yt,setYT] = useState([])
    useEffect(()=>{
        Socket.on("error"+Socket.id,data=>{
            console.log(data.message)
            alert(data.message)
        })
    },[])
    useEffect(()=>{
        Socket.on("progress"+Socket.id,data=>{
            console.log(data)
            setLoading(false)
            setProgress(data)
        })
    },[])
    useEffect(()=>{
        Socket.on("finish"+Socket.id,data=>{
            setProgress(null)
            alert(data.data.title)
        })
    },[])
    useEffect(()=>{
        API.get("/category",config)
        .then((res)=>{
            setCategory(res.data.data)
        })
        .catch((err)=>{
            alert(err.response.data.message)
        })
    },[triger])

    const addCategory=()=>{
        if(nameCategory.length>5){
            const name = {name:nameCategory}
            API.post("/category",name,config)
            .then((res)=>{
                alert(res.data.message)
                setNameCategory('')
                setTriger(!triger)
            })
            .catch((err)=>{
                alert(err.response.data.message)
            })
        }else{
            alert("please insert minimal 5 caracter")
        }
    }

    const addSubCategory=()=>{
        if(nameSubCategory.length>5){
            const data={
                categoryId : id,
                name : nameSubCategory
            }
            if(id == ""){
                alert("please select Category Before")
            }else if(nameSubCategory == ""){
                alert("please input name Sub Category Before")
            }else{
            API.post("/sub-category",data,config)
                .then((res)=>{
                    alert(res.data.message)
                })
                .catch((err)=>{
                    alert(err.response.data.message)
                }) 
            }
        }else{
            alert("please insert minimal 5 caracter")
        }
    }

    const addMusic=(data,author,title,thumbnail,url)=>{
        setLoading(true)
        Socket.emit('download',{id:data,author:author,name:title,thumbnail:thumbnail,link:url})
    }


    const getDataYt=()=>{
        API.get("/yt-link?title="+cari,config)
        .then((res)=>{
            setYT(res.data.data)
            console.log(res.data.data)
        })
        .catch((err)=>{
            alert("fail get data from yt")
        })
    }
    return (
        <Wrapper>
            <div className="lg:flex items-center bg-white w-3/4 m-auto mt-20 rounded-lg shadow-2xl">
                <div className="bg-gray-500 lg:w-60 lg:ml-10 w-44 m-auto text-center text-white rounded">
                    <p>ADD CATEGORY</p>
                </div>
                <div className="m-10 shadow-2xl lg:w-full md:w-80">
                    <input
                    placeholder="Name Category"
                    value={nameCategory}
                    onChange={(e)=>setNameCategory(e.target.value)}
                    className="w-full h-10 border-2 border-gray-500 text-center rounded-lg"
                    />
                </div>
                <div className=" bg-gray-500 m-auto text-center rounded shadow-2xl lg:mr-10">
                    <button
                    className="w-full lg:w-20 text-white h-10 "
                    onClick={()=>addCategory()}
                    >ADD</button>
                </div>
            </div>
           <div className="lg:flex items-center bg-white w-3/4 m-auto mt-20 rounded-lg shadow-2xl">
                <div className="bg-gray-500 lg:w-60 lg:ml-10 w-44 m-auto text-center text-white rounded">
                    <p>ADD SUB-CATEGORY</p>
                </div>
                <div className="m-10 lg:w-full md:w-80">
                    <div className="m-2">
                       <input
                        value={nameSubCategory}
                        placeholder="Name Sub-Category"
                        onChange={(e)=>setNameSubCategory(e.target.value)}
                        className="w-full h-10 border-2 border-gray-500 text-center rounded-lg"
                        /> 
                    </div>
                    <div  className="m-2 text-center">
                        <select
                        onChange={(e)=>setId(e.target.value)}
                        className="w-full h-10 border-2 border-gray-500 text-center rounded-lg"
                        >
                                <option>Select Category</option>
                                {category.map((data)=>
                                <option 
                                className="text-center"
                                value={data._id}
                                >{data.nameCategory}</option>
                                )}
                        </select>
                    </div>
                    
                </div>
                <div className=" bg-gray-500 m-auto text-center rounded shadow-2xl lg:mr-10">
                    <button
                    className="w-full lg:w-20 text-white h-10 "
                    onClick={()=>addSubCategory()}
                    >ADD</button>
                </div>
            </div>
            <div className="items-center bg-white w-3/4 m-auto mt-20 rounded-lg shadow-2xl">
                <div className="lg:flex">
                    <div className="bg-gray-500 lg:w-60 lg:ml-10 w-44 m-auto text-center text-white rounded">
                        <p>ADD MUSIC</p>
                    </div>
                    <div className="m-10 shadow-2xl lg:w-full md:w-80">
                        <input
                        placeholder="Insert Link YT"
                        value={cari}
                        onChange={(e)=>setCari(e.target.value)}
                        className="w-full h-10 border-2 border-gray-500 text-center rounded-lg"
                        />
                    </div>
                    <div className=" bg-gray-500 m-auto text-center rounded shadow-2xl lg:mr-10">
                        <button
                        className="w-full lg:w-20 text-white h-10 "
                        onClick={()=>getDataYt()}
                        >Search</button>
                    </div>
                </div>
                {yt.length > 0 && loading !== true ?
                <div className="pt-5">
                    <p
                    className="text-center"
                    >Pilih Untuk Download</p>
                    <div className="pt-5">
                        {yt.map((data,index)=>(
                            <div className="pb-5 w-10/12 m-auto" key={index}>
                                <p
                                className="text-xs pb-3"
                                >{data.title}</p>
                                <img src={data.image} className="w-7/12"/>
                                <p className="text-xs pt-3">Durasi : <strong className="pr-3">{data.timestamp}</strong> Views : <strong>{data.views}</strong></p>
                                <p className="text-xs">Author : {data.author.name}</p>
                                <button className="bg-green-500 w-full mt-3 text-white"
                                onClick={()=>addMusic(data.videoId,data.author.name,data.title,data.thumbnail,data.url)}
                                >
                                    Download
                                </button>
                                { progress&& yt.length > 0 && progress.videoId == data.videoId &&
                                <div className="w-full mt-2">
                                    <div className='w-full text-center'>
                                        <p className='text-xs lg:text-base'>Downloading To Server Zilog Progress</p>
                                    </div>
                                    <Line
                                    strokeWidth={2}
                                    percent={parseFloat(progress.progress.percentage)} 
                                    strokeColor="#00b359"
                                    className="ml-2 mr-2"
                                    />
                                    <div className='mt-2'>
                                        <p className='ml-2'>Capasity : <strong className='mr-2'>{parseFloat(progress.progress.length/1000000).toFixed(2)}</strong>Mb</p>
                                    </div>
                                    <div className='mt-2'>
                                        <p className='ml-2'>Transferred : <strong className='mr-2'>{parseFloat(progress.progress.transferred/1000000).toFixed(2)}</strong>Mb</p>
                                    </div>
                                    <div className='mt-2'>
                                        <p className='ml-2'>Remaining : <strong className='mr-2'>{parseFloat(progress.progress.remaining/1000000).toFixed(2)}</strong>Mb</p>
                                    </div>
                                    <div className='mt-2'>
                                        <p className='ml-2'>Speed : <strong className='mr-2'>{parseFloat(progress.progress.speed/1000000).toFixed(2)}</strong>Mb</p>
                                    </div>
                                    
                                </div>}
                            </div>
                        ))}
                    </div>
                </div>:loading ==null ?null:<div className="w-100 pt-20">
                    <div className="w-full">
                        <img src={logo}
                        className="animate-spin m-auto w-44"
                        />
                    </div>
                </div>}
            </div>
        </Wrapper>
    )
}

export default Form

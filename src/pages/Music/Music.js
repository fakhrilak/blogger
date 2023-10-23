import { config } from 'dotenv';
import React, { useEffect, useState ,useRef} from 'react'
import Wrapper from '../../components/Wrapper/Wrapper';
import { API,musicUrl } from '../../config/API';
import "react-jinke-music-player/assets/index.css";
import logo from "../../img/logo.png"
import CardMusic from '../../components/card/CardMusic';
const Music = (props) => {
    const [music_coll,setMusic_coll] = useState([])
    const [music_fav,setMusic_fav] = useState([])
    const [triger,setTriger] = useState(false)
    const [page,setpage] = useState(false)
    const [query,setQuery] = useState(0)
    const [next,setNext] = useState(true)
    const [back,setBack] = useState(false)
    const [playList,setPlayList] = useState([])
    const [idplayList,setIdPlayList] = useState(null)
    const [showForm,setShowForm] = useState(false)
    const [name,setName] = useState("")
    const [title, setTitle] = useState("Music");
    const [lasweek,setLastWeek] = useState([])
    const [search,setSearch] = useState("")

    useEffect(() => {
        // This will run when the page first loads and whenever the title changes
        document.title = title;
    }, [title]);

    // GET MUSIC COLL
    useEffect(()=>{
        API.get("/music?page="+query+"&&search="+search,config)
        .then((res)=>{
            setMusic_coll(res.data.data)
            if(res.data.next == 1){
                setNext(true)
            }else{
                setNext(false)
            }
            if(res.data.back == 1){
                setBack(true)
            }else{
                setBack(false)
            }
        })
        .catch((err)=>{
            alert(err.message)
        })
    },[query,triger])

    useEffect(()=>{
        API.get("/music-lastweek",config)
        .then((res)=>{
            setLastWeek(res.data.data)
        })
        .catch((err)=>{
            alert(err.message)
        })
    },[])

    useEffect(()=>{
        API.get("/playlist",config)
        .then((res)=>{
            setPlayList(res.data.data)
        })
        .catch((err)=>{
            alert(err.message)
        })
    },[triger])

    useEffect(()=>{
        if(idplayList){
            API.get("/playlist/"+idplayList,config)
            .then((res)=>{
                setMusic_fav(res.data.data.Music)
            })
            .catch((err)=>{
                alert(err.message)
            })
        }
    },[idplayList,triger])
    

    const addFav=(id)=>{
        const body={
            "id_music": id,
            "idPlaylist":idplayList
        }
        API.patch("/user-music",body,config)
        .then((res)=>{
            setTriger(!triger)
            alert(res.data.message)
        })
        .catch((err)=>{
            alert(err.message)
        })
    }

    const deletFav=(id)=>{
        API.delete(`/user-music/${id}/${idplayList}`,config)
        .then((res)=>{
            alert(res.data.message)
            setTriger(!triger)
        })
        .catch((err)=>{
            alert(err.message)
        })
    }

    useEffect(()=>{
        props.setId(idplayList)
    },[idplayList])
    return (
        <Wrapper>
            <div className="w-12/12 m-auto">
                <div className="pt-10 w-11/12 m-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-5 w-full pb-5 gap-5">
                        <div className="mt-2">
                            <button 
                            className="font-bold rounded w-full h-10"
                            style={{backgroundColor:!page?"black":"white",color:!page?"white":"black"}}
                            onClick={()=>setpage(false)}
                            >My Music</button>
                        </div>
                        <div className="mt-2">
                            <button 
                            className="font-bold rounded w-full h-10"
                            style={{backgroundColor:!page?"white":"black",color:!page?"black":"white"}}
                            onClick={()=>setpage(true)}
                            >Music Collections</button>
                        </div>
                        <div className="mt-2">
                            <select
                            className="w-full h-10 rounded text-center"
                            onChange={(e)=>setIdPlayList(e.target.value)}
                            >
                                <option>Select PlayList</option>
                                {playList.map((data,index)=>(
                                    <option
                                    key={index}
                                    value={data._id}
                                    >{data.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mt-2">
                            <button
                            onClick={()=>setShowForm(!showForm)}
                            className="font-bold rounded w-full h-10 bg-gray-500 text-white"
                            >Setting Playlist</button>
                        </div>
                    </div>
                    {showForm && 
                    <div className="w-full m-auto grid grid-cols-2 lg:grid-cols-5 pb-5 gap-5">
                        <div className="w-full bg-white rounded">
                            <div className="w-11/12 rounded m-auto">
                                <input
                                className="w-full text-sm"
                                placeholder="Input name new Playlist"
                                onChange={(e)=>setName(e.target.value)}
                                />
                            </div>
                            <div className="w-11/12 bg-gray-500 text-center mt-2 m-auto rounded text-white">
                                <button
                                className="w-12/12 bg-gray-500 text-center m-auto rounded text-white"
                                onClick={()=>{
                                    API.post("/playlist",{name:name},config)
                                    .then((res)=>{
                                        setTriger(true)
                                            setTimeout(()=>{
                                                setTriger(false)
                                            },1000)
                                        alert(res.data.message)
                                    })
                                    .catch((err)=>{
                                        alert(err)
                                    })
                                }}
                                >Add New Playlist</button>
                            </div>
                        </div>
                        {playList.map((data,index)=>(
                            <div className="bg-white rounded text-center"
                            key={index}
                            >
                                <p className="font-medium">{data.name}</p>
                                <div className="grid grid-cols-2 mb-2">
                                    <button
                                    className="w-11/12 m-auto border-2 border-black gap-1 bg-green-400 rounded"
                                    >Edit</button>
                                    <button
                                    className="w-11/12 m-auto border-2 border-black gap-1 bg-red-500 rounded"
                                    onClick={()=>{
                                        API.delete("/playlist/"+data._id)
                                        .then((res)=>{
                                            setTriger(true)
                                            setTimeout(()=>{
                                                setTriger(false)
                                            },1000)
                                            alert(res.data.message)
                                        })
                                        .catch((err)=>{
                                            alert(err)
                                        })
                                    }}
                                    >x</button>
                                </div>
                                
                            </div>
                        ))}
                        
                    </div>}
                    {page && lasweek.length > 0 && <p className='pb-10'> LAST DOWNLOADED</p>}
                    {page && <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-5 lg:gap-10  pb-20">
                            {lasweek.map((data,index)=>(
                                <CardMusic data={data} action={addFav} logo={"+"} key={index} colorbutton={"bg-green-700"}/>
                            ))}
                    </div>}
                    {page &&<p className='pb-5'> ALL COLLECTIONS MUSIC</p>}
                    {page && 
                    <div className='grid grid-cols-3 lg:grid-cols-4 gap-2 mb-5'>
                        <div className='w-full col-span-2'>
                            <input
                            placeholder=' SEARCH'
                            className='w-full rounded text-center '
                            type='input'
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                            />
                        </div>
                        <div className='w-full'>
                            <button 
                            className='bg-green-700 w-3/6 rounded'
                            onClick={()=>setTriger(!triger)}
                            >Search</button>
                        </div>
                    </div>    
                    }
                    {page && <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-5 lg:gap-10  pb-20">
                            {music_coll.map((data,index)=>(
                                <CardMusic data={data} action={addFav} logo={"+"} key={index} colorbutton={"bg-green-700"}/>
                            ))}
                    </div>}
                    {page && <div className="w-12/12 grid grid-cols-2">
                        <div className="w-12/12 text-left">
                            {back == true && <button
                            className="bg-gray-500 w-20 font-bold rounded"
                            onClick={()=>setQuery(query-1)}
                            >Back</button>}
                        </div>
                        <div className="w-12/12 text-right">
                            {next == true && <button
                            className="bg-gray-500 w-20 font-bold rounded"
                            onClick={()=>setQuery(query+1)}
                            >Next</button>}
                        </div>
                    </div>}
                    {!page && <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-5 lg:gap-10  pb-20">
                            {music_fav.map((data,index)=>(
                                <CardMusic data={data} action={deletFav} logo={"x"} key={index} colorbutton={"bg-red-700"}/>
                            ))}
                    </div>}
                </div>
                
            </div>
        </Wrapper>
    )
}

export default Music

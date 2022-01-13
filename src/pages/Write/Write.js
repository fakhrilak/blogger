import React,{useState,useEffect} from 'react'
import Wrapper from '../../components/Wrapper/Wrapper'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import dayjs from "dayjs"
import {formats,modules} from "./data"
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { API,config, path } from '../../config/API';
const Write = (props) => {
    const {auth,match} = props
    const {user} = auth
    const [editor,setEditor] =useState("")
    const [judul,setJudul] = useState("")
    const [image,setImage] = useState("")
    const [imagepreview,setImagePreview] = useState(null)
    const [status,setStatus] = useState(true)
    const [participan,setParticipan] = useState([])
    const [Users,setUsers] = useState([])
    const [filtered, setFiltered] = useState([]);
    const [search,setSerch] = useState("")
    const history = useHistory()
    var now = dayjs(new Date()).format("dddd, MMMM D, YYYY h:mm A")
    const onClick = ()=>{
        const data = new FormData()
        if(participan.length > 0){
            setStatus(false)
        }else{
            setStatus(true)
        }
        let id=[]
        for (let i=0;i<participan.length;i++){
            id.push(participan[i]._id)
        }
        var json_arr = JSON.stringify(id);
        data.append("judul",judul)
        data.append("status",status)
        data.append("content",editor)
        data.append("participan",json_arr)
        data.append("idUser",user._id)
        data.append("file",image)
        data.append("subcategory",match.params.id)
        API.post("/content",data,config)
        .then((res)=>{
            alert(res.data.message)
            
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }

    useEffect(() => {
        API.get("/users",config)
        .then((res)=>{
            setUsers(res.data.data)
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }, [])

    useEffect(()=>{
        setFiltered(
            Users.filter((data) =>
              data.username.toLowerCase().includes(search.toLowerCase())
            ))
    },[search])

    const imageUpload=(e)=>{
        const file = e.target.files[0]
        setImage(file)
        setImagePreview(URL.createObjectURL(file))
      }

    const tambah=(data)=>{
        setParticipan([...participan,data])
        console.log(participan)
    }
    return user?(
        <Wrapper>
            <div className="w-11/12 m-auto">
                <div className="w-full pt-20">
                    <input
                    value={judul}
                    placeholder="Judul"
                    onChange={(e)=>setJudul(e.target.value)}
                    className="w-full text-center h-10 rounded"
                    />
                </div>
                <div className="w-auto text-center pt-10">
                    <img src={imagepreview}
                    className="w-10/12 m-auto"
                    />
                </div>
                <div className="w-auto pb-10">
                    <input
                    type="file"
                    onChange={(e)=>imageUpload(e)}
                    className="w-auto pointer-events-auto cursor-pointer"
                    ></input>
                    {image == "" && <div>
                        <span>Select Your Thumbnail Content</span>
	                </div>}  
                </div>
                <div className="w-full pb-20 bg-white rounded">
                    <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        placeholder='Write your story here'
                        onChange={(e) => setEditor(e)}
                        className="h-96 border-black rounded"
                    />              
                </div>
                <div className="w-full text-white grid grid-cols-2">
                    <div className="w-full">
                        <div className="mt-20">
                            <p className="text-gray-700">Partisipan</p>
                            <input
                            className="rounded-md h-10 w-60 text-black text-center"
                            value={search}
                            onChange={(e)=>setSerch(e.target.value)}
                            /> 
                            {participan.length > 0 ? participan.map((data)=>(
                                <div className="flex mt-5 bg-gray-700 rounded-l-3xl w-60">
                                    <div className="mr-2">
                                        <img src={path+data.picture}
                                        className="w-10 rounded-full"
                                        />
                                    </div>
                                    <div>
                                        <p
                                        className="text-white "
                                        >{data.username}</p>
                                    </div>
                                </div>)):null} 
                        </div>
                    </div>
                    {filtered.length > 0 && search!= ""?<div className="col-end-3 mt-5">
                        <div>
                            <p className="text-gray-700">Select Users Partisipan</p>
                        </div>
                        {filtered.map((data)=>(
                        <div className="flex m-3">
                            <div
                            className="mr-5 h-10"
                            >
                                <button
                                className="bg-gray-700 w-20 h-10 rounded"
                                onClick={()=>tambah(data)}
                                >
                                    ADD
                                </button>
                            </div> 
                            <div className="flex bg-gray-700 rounded-l-3xl w-60">
                                <div className="mr-2">
                                    <img src={path+data.picture}
                                    className="w-10 rounded-full"
                                    />
                                </div>
                                <div>
                                    <p
                                    className="text-white"
                                    >{data.username}</p>
                                </div>
                            </div>
                        </div>))}
                    </div>:null}
                </div>
                <div className="w-auto pt-10 pb-5">
                    <button
                    onClick={()=>onClick()}
                    className="bg-white w-20 h-10 rounded text-xl"
                    >
                        Post
                    </button>
                </div>
            </div>
        </Wrapper>
    ):(
        <Redirect to="/login" />
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  
  export default connect(mapStateToProps, {})(Write);

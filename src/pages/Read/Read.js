import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Wrapper from '../../components/Wrapper/Wrapper'
import { API, config, path } from '../../config/API'
import { formats, modules } from '../Write/data'
import logo from "../../img/logo.png"
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.bubble.css'
import 'react-quill/dist/quill.snow.css';
// import hljs from 'highlightjs'
// hljs.configure({
//     languages: ['javascript', 'ruby', 'python', 'rust'],
//   });

const Read = ({match,auth}) => {
    const [content,setContent] = useState([])
    const [showEditor,setShowEditor] = useState(false)
    const [Editor,setEditor] = useState("")
    const [triger,setTriger] = useState(false)
    const [Editor2,setEditor2] = useState("")
    const{isAuthenticated}=auth
    useEffect(() => {
        // This will run when the page first loads and whenever the title changes
        if (content){
            document.title = "Read";
            const favicon = document.getElementById("icon");
            favicon.href = path+content.tumbname;
        }
    }, [content]);
    useEffect(()=>{
        console.log(match.params.id,"ini params")
        API.get(`/content/${match.params.id}`)
        .then((res)=>{
            setContent(res.data.data)
            console.log(res.data.data)
            setEditor("")
        })
        .catch((err)=>{
            alert(err.message)
        })
    },[triger])
    const history = useHistory()
    const command=()=>{
        if(!isAuthenticated){
            history.push('/login')
        }
        const data={
            contentId:match.params.id,
            command:Editor
        }
        API.post("/command",data,config)
        .then((res)=>{
            if(res.status == 200){
                alert("posted command")
                setTriger(!triger)
            }  
        })
        .catch((err)=>{
            alert(err.response.data.message)
        })
    }

    const subCommand=(id)=>{
        const data={
            "commandId": id,
            "command" : Editor2
        }
        API.post("/sub-command",data,config)
        .then((res)=>{
            alert(res.data.message)
            setTriger(!triger)
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
    console.log(content.User)
    return (
        <Wrapper>
            {content.User ?
            <div className="w-11/12 m-auto">
                <div className="w-full m-auto text-center mt-20">
                    <p
                    className="text-3xl font-bold"
                    >{content.judul}</p>
                </div>
                {content.tumbname ? 
                <div className="rounded">
                    <img src={path+content.tumbname}
                     className="w-10/12 m-auto mt-5 mb-5 rounded-lg shadow-2xl"
                    />
                </div>:null}
                <div className="w-full  border-b-2">
                    <ReactQuill
                        value={content.content}
                        readOnly={true}
                        theme={"bubble"}
                    />
                </div>
                <div className="w-full pt-2">
                    <div className="float-right w-44">
                    <p
                    className="mb-5 text-center font-bold"
                    >Writer</p>
                    <div className="flex mb-10 border-t-2 border-b-2">
                        <div className="m-auto pt-2 pb-2">
                            <p>{content.User.username}</p>
                        </div>
                        <div className="pt-2 pb-2">
                            <img src={path+content.User.picture}
                            className="w-10 rounded-full"
                            />
                        </div>
                        
                    </div>
                    </div>
                </div>
                <div className="">
                    <p className="font-bold">Views : {content.readCount}</p>
                </div>
                <div className="h-36"/>
                <p
                className="font-bold"
                >COMMAND</p>
                <div className="w-auto pb-20 bg-gray-400 rounded border-t-2">
                    
                    {content.command ?
                        content.command.map((data,index)=>
                        (
                        <div key={index}
                        >
                            <div 
                                className=" bg-gray-500 m-5 rounded shadow-2xl"
                            >
                                <div
                                className="flex"
                                >
                                    <div 
                                    className="mt-5 font-bold ml-5"
                                    >
                                        <p>{data.User.username + ":"}</p>
                                    </div>
                                    <ReactQuill
                                        value={data.command}
                                        readOnly={true}
                                        theme={"bubble"}
                                        className="mt-3"
                                    />
                                </div>
                                <div className="pb-5">
                                    {data.subcommand.map((sub,index)=>(
                                        <div 
                                        className=" bg-gray-600 m-5 rounded shadow-2xl"
                                        key={index}
                                        >
                                        <div
                                        className="flex"
                                        >
                                            <div 
                                            className="mt-5 font-bold ml-5"
                                            >
                                                <p>{sub.User.username + ":"}</p>
                                            </div>
                                            <ReactQuill
                                                value={sub.command}
                                                readOnly={true}
                                                theme={"bubble"}
                                                className="mt-3"
                                            />
                                        </div>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <ReactQuill
                                        theme="snow"
                                        modules={modules}
                                        formats={formats}
                                        placeholder='Write your story here'
                                        onChange={(e) => setEditor2(e)}
                                    />
                                </div>
                                <div className="ml-5 w-32 text-center pb-2 pt-5">
                                     <button
                                     onClick={()=>subCommand(data._id)}
                                     className="bg-white w-full rounded"
                                     >send replay</button>
                                </div>
                            </div>
                        </div>)):null
                    }
                    <button
                    className="mt-10 bg-white w-20 rounded mb-3"
                    onClick={()=>setShowEditor(!showEditor)}
                    >REPLAY</button>
                    {showEditor ?
                    <>
                    <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        placeholder='Write your story here'
                        onChange={(e) => setEditor(e)}
                    />
                    <button
                    onClick={()=>command()}
                    className="mt-10 bg-white w-44 h-10 rounded mb-3"
                    >POST COMMAND</button>  
                    </>
                    :null}       
                </div>
            </div>:
                 <div className="w-100 pt-20">
                    <div className="w-full">
                        <img src={logo}
                        className="animate-spin m-auto w-44"
                        />
                    </div>
                </div>
            }
        </Wrapper>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  
  export default connect(mapStateToProps, {})(Read);
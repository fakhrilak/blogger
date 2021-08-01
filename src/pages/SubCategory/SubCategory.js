import React, { useState } from 'react'
import Wrapper from '../../components/Wrapper/Wrapper'
import {useHistory, useParams} from "react-router-dom"
import { API, config } from '../../config/API'
import Card from '../../components/card/Card'
import ReactQuill from 'react-quill'
import { path } from '../../config/API'
import dayjs from 'dayjs'
import logo from "../../img/logo.png"
const SubCategory = ({match}) => {
    const [contets,setContets] =useState([])
    React.useEffect(() => {
        API.get("/sub-category/"+match.params.id,config)
        .then((res)=>{
            setContets(res.data.data.contents)
        })
        .catch((err)=>{
            console.log(err)
        })

    }, [match.params.id])
    const history = useHistory()
    return (
        <Wrapper>
            <div className="w-11/12 m-auto">
                <div className="w-full pt-10">
                    <button
                    onClick={()=>history.push(`/write/${match.params.id}`)}
                    className="bg-gray-500 text-white w-44 rounded h-20"
                    >WRITE CONTENT</button>
                </div>
                {contets.length > 0 ?
                <div className="w-11/12 m-auto">
                    <div className="lg:grid lg:grid-cols-3 lg:grid-cols-2 mt-5 gap-14 ">
                    {contets.map((data)=>(
                         
                            <div className="rounded-lg bg-gray-500 mt-4 shadow-2xl overflow-hidden" 
                            onClick={()=>history.push(`/content/${data._id}`)}
                            >
                                <div className="m-5 w-full text-center overflow-hidden ">
                                    <p className="overflow-hidden text-2xl  text-black font-bold"
                                    style={{overflow:"hidden",textOverflow:"ellipsis",height: 30,maxWidth:250
                                    ,whiteSpace:"nowrap"
                                    }}
                                    >{data.judul}</p>
                                    <p
                                    className="m-auto pt-5 text-left"
                                    >{dayjs(data.createAt).format("DD/MM/YYYY")}</p>
                                </div>
                                <div className="w-full">
                                    <img src={path+ data.tumbname}
                                    className="w-72 lg:w-64 m-auto mt-4 rounded-lg h-44"
                                    />
                                    <p
                                    className="m-auto pt-5 text-black text-right mr-5 text-xs"
                                    >{dayjs(data.createAt).format("h:mm:ss A")}</p>
                                </div>
                                <div className="pb-2">
                                    <p
                                    className="overflow-hidden"
                                    style={{overflow:"hidden",textOverflow:"ellipsis",height:30,maxWidth:300
                                    ,whiteSpace:"nowrap"
                                    }}
                                    ><ReactQuill
                                    value={data.content}
                                    readOnly={true}
                                    theme={"bubble"}
                                    /></p>
                                </div>
                                
                            </div>
                            
                         
                    ))}
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
            </div>
        </Wrapper>
        
    )
}

export default SubCategory

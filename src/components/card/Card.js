import React from 'react'
import ReactQuill from 'react-quill'
import { useHistory } from 'react-router-dom'
import { path } from '../../config/API'
import "./Card.css"
const Card = (props) => {
    const {judul,gambar,waktu,id,content}=props
    const history =useHistory()
    return (
        <div onClick={()=>history.push(`/content/${id}`)}>
        <div className="rounded-lg bg-gray-500 ml-10">
            <div>
                <img src={path+gambar}
                className="w-44"
                />
            </div>
            <div>
                <div
                style={{marginTop:20
                }}
                >{waktu}</div>
                <p
                style={{overflow:"hidden",textOverflow:"ellipsis",height:50,maxWidth:200
                ,whiteSpace:"nowrap"
                }}
                ><ReactQuill
                value={content}
                readOnly={true}
                theme={"bubble"}
                /></p>
            </div>
        </div>
        <div className="">
            <h1>{judul}</h1>
        </div>
        </div>
    )
}

export default Card

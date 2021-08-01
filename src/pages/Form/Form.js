import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Wrapper from '../../components/Wrapper/Wrapper'
import { API, config, musicUrl } from '../../config/API'

const Form = () => {
    const[category,setCategory]= useState([])
    const[nameCategory,setNameCategory] = useState("")
    const[triger,setTriger] = useState(false)
    const[id,setId] = useState('')
    const[nameSubCategory,setNameSubCategory] = useState('')
    const[link,setLink] = useState('')

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
    }

    const addSubCategory=()=>{
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
        
    }

    const addMusic=()=>{
        fetch(`${musicUrl}/api/v1/blogger/music`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data:link})
            })
            .then((res)=>{
                console.log(res)
                alert(res.data.message)
            })
            .catch((err)=>{
                console.log(err)
                alert(err)
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
                    className="w-20 text-white h-10 "
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
                    className="text-white h-10 w-20 "
                    onClick={()=>addSubCategory()}
                    >ADD</button>
                </div>
            </div>
            <div className="lg:flex items-center bg-white w-3/4 m-auto mt-20 rounded-lg shadow-2xl mb-10">
                <div className="bg-gray-500 lg:w-60 lg:ml-10 w-44 m-auto text-center text-white rounded">
                    <p>ADD MUSIC</p>
                </div>
                <div className="m-10 shadow-2xl lg:w-full md:w-80">
                    <input
                    placeholder="Insert Link YT"
                    value={link}
                    onChange={(e)=>setLink(e.target.value)}
                    className="w-full h-10 border-2 border-gray-500 text-center rounded-lg"
                    />
                </div>
                <div className=" bg-gray-500 m-auto text-center rounded shadow-2xl lg:mr-10">
                    <button
                    className="w-20 text-white h-10 "
                    onClick={()=>addMusic()}
                    >ADD</button>
                </div>
            </div>
        </Wrapper>
    )
}

export default Form

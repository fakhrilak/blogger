import React, { useEffect, useState } from 'react'
import { ColorPicByName } from '../../halper/colorPickByName'

const Method = (props) => {
    console.log(props.match.params)
    const [params,setParams] = useState(props.match.params)
    const [color,setColor] = useState(ColorPicByName(params.name))
    useEffect(()=>{
        setParams(props.match.params)
        setColor(ColorPicByName(props.match.params.name))
    },[props.match.params])
  return (
    <div >
        <div className={`${color} mt-2 w-3/12 rounded-r-lg text-white`}>
            <p className='text-lg font-bold text-black text-center'>{params.name.toUpperCase()}</p>
        </div>
    </div>
  )
}

export default Method
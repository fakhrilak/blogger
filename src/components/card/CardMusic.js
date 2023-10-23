import React from 'react'

const CardMusic = (props) => {
  return (
    <div className="w-full rounded border-2 border-black text-center bg-gray-400 
        h-auto text-underline"
        >
        <div className="w-full h-32 lg:h-44">
            <div
                className="float-right mr-2 mt-1"
                >
                    <button
                    className={`font-bold text-sm text-white w-5 h-5 ${props.colorbutton} rounded-full`}
                    onClick={()=>props.action(props.data._id)}
                    >{props.logo}</button>
                </div>
                <img src={props.data.thumnail} className="w-full"/>
            </div>
            <div className="pt-3">
                <p className="m-1 lg:m-2 md:m-2 overflow-hidden overflow-ellipsis h-4 max-w-2xl sm:max-w-10 text-xs"
            >{props.data.title}</p>
        </div>
    </div>
  )
}

export default CardMusic
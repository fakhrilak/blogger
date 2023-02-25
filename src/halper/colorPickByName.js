export const ColorPicByName=(data)=>{
    const dataColor = [
        {
            "name" : "get",
            "color" : "bg-blue-500"
        },
        {
            "name" : "post",
            "color" : "bg-green-500"
        },
        {
            "name" : "delete",
            "color" : "bg-red-500"
        },
        {
            "name" : "put",
            "color" : "bg-yellow-500"
        },
    ]
    for(let i = 0 ;i<dataColor.length;i++){
        if(data == dataColor[i]["name"]){
            return dataColor[i]["color"]
        }
    }

    return "bg-gray-400"
}
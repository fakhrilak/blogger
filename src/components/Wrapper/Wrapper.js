import React, { useEffect, useState } from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu , SidebarHeader, SidebarFooter, SidebarContent} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import "./Wrapper.css"
import logo from "../../img/logo.png"
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { API, config } from '../../config/API';
import { connect } from 'react-redux';
import {Data} from "./data"
import { useMediaQuery } from 'react-responsive'
import Hedaer from './Hedaer';
import { types } from '../../redux/actions/type';
const Wrapper = (props) => {
    const {auth} = props
    const{ isAuthenticated,user} = auth
    const[data,setData] = useState([])
    const [showSidebar,setShowSidebar] = useState(false)
    useEffect(()=>{
        API.get("/category",config)
        .then((res)=>{
            setData(res.data.data)
        })
        .catch((err)=>{
            alert(err.response.message)
        })
    },[])
    const history = useHistory()
    const isPortrait = useMediaQuery({ query: '(max-width: 800px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const dispatch =  useDispatch()
    return (
        <div
         className="bg-gray-400 pb-10"
         style={!isPortrait ?{display:"grid",gridTemplateColumns:"1fr 4fr",width:"100%"}:null}  
        >
            {isPortrait &&
            <>
                <div>
                    <div className="w-full bg-gray-500">
                        <img src={logo}
                        className="w-20 p-5"
                        onClick={()=>setShowSidebar(!showSidebar)}
                        />
                    </div>
                </div>
                {showSidebar &&
                <div>
                 <ProSidebar
                className="sidebar-container"
                collapsed={false}
                >
                <SidebarHeader className="w-100 text-center">
                    <img src={logo}
                    onClick={()=>history.push("/")}
                    className="m-auto w-20"
                    />
                </SidebarHeader>
                <SidebarContent >
                    <Menu iconShape="square">
                        {user? Data.map((data)=>(
                            <div key={data._id}>
                            {data.role == user.role ?
                                <SubMenu title={user.fullname}>
                                {data.data.map((data)=>(
                                    <MenuItem
                                    key={data._id}
                                    onClick={()=>history.push(data.route)}
                                    >{data.name}</MenuItem>
                                ))}
                            </SubMenu>:null}
                            </div>
                        )):null}

                        {data.length > 0 ? data.map((data)=>
                        (<SubMenu title={data.nameCategory}
                        key={data._id}
                        >
                            {data.subcategory.length > 0 ? data.subcategory.map((data,index)=>(
                            <MenuItem
                            key={index}
                            onClick={()=>history.push(`/sub-category/${data._id}`)}
                            >{data.nameSubCategory}</MenuItem>))
                            :null}
                        </SubMenu>)):null}
                        
                        {isAuthenticated ? null : <MenuItem 
                        onClick={()=>history.push("/login")}
                        >LOGIN</MenuItem>}
                        {isAuthenticated && 
                        <MenuItem
                        onClick={()=>dispatch({
                            type: "LOGOUT"
                        })}
                        >LOG OUT</MenuItem>
                        }
                    </Menu>
                </SidebarContent>
                <SidebarFooter>
                    <p>© 2021 made with &#128420;- Fakhril AK</p>
                </SidebarFooter>
                </ProSidebar>
                </div>}
            </>
            }
            {!isPortrait &&
            <div>
                <ProSidebar 
                className="sidebar-container"
                collapsed={false}
                >
                <SidebarHeader className="w-100 text-center">
                    <img src={logo}
                    onClick={()=>history.push("/")}
                    className="m-auto w-20"
                    />
                </SidebarHeader>
                <SidebarContent >
                    <Menu iconShape="square">
                        {user? Data.map((data)=>(
                            <>
                            {data.role == user.role ?
                                <SubMenu title={user.fullname}>
                                {data.data.map((data)=>(
                                    <MenuItem
                                    onClick={()=>history.push(data.route)}
                                    >{data.name}</MenuItem>
                                ))}
                            </SubMenu>:null}
                            </>
                        )):null}

                        {data.length > 0 ? data.map((data)=>
                        (<SubMenu title={data.nameCategory}
                        key={data._id}
                        >
                            {data.subcategory.length > 0 ? data.subcategory.map((data)=>(
                            <MenuItem
                            onClick={()=>history.push(`/sub-category/${data._id}`)}
                            >{data.nameSubCategory}</MenuItem>))
                            :null}
                        </SubMenu>)):null}
                        
                        {isAuthenticated ? null : <MenuItem 
                        onClick={()=>history.push("/login")}
                        >LOG IN</MenuItem>}
                        {isAuthenticated && 
                        <MenuItem
                        onClick={()=>dispatch({
                            type: "LOGOUT"
                        })}
                        >LOG OUT</MenuItem>
                        }
                    </Menu>
                </SidebarContent>
                <SidebarFooter>
                    <p>© 2021 made with &#128420;- Fakhril AK</p>
                </SidebarFooter>
                </ProSidebar>
            </div>}
            
            <div className="bg-gray-400 min-h-screen rounded-lg w-full"
            onClick={()=>setShowSidebar(false)}
            >
                <div className="">{props.children}</div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  
  export default connect(mapStateToProps, {})(Wrapper);
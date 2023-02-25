import React, { useEffect, useState } from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu , SidebarHeader, SidebarFooter, SidebarContent} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import "./Wrapper.css"
import logo from "../../img/logo.png"
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { API, config } from '../../config/API';
import { connect } from 'react-redux';
import {Data,dataAPP} from "./data"
import { useMediaQuery } from 'react-responsive'
import Hedaer from './Hedaer';
import { types } from '../../redux/actions/type';
import { ColorPicByName } from '../../halper/colorPickByName';
const Wrapper = (props) => {
    const {auth} = props
    const [showSidebar,setShowSidebar] = useState(false)
    const history = useHistory()
    const isPortrait = useMediaQuery({ query: '(max-width: 800px)' })
    return (
        <div
         className="bg-white pb-10"
         style={!isPortrait ?{display:"grid",gridTemplateColumns:"1fr 4fr",width:"100%"}:null}  
        >
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

                        {dataAPP.length > 0 ? dataAPP.map((data,index)=>
                        (<SubMenu title={data.name}
                        key={index}
                        >
                            {data.enpoint.map((enpoint,index)=>(
                            <MenuItem
                            key={index}
                            className={`${ColorPicByName(enpoint.name)} w-11/12 m-auto mt-2 rounded-full`}
                            onClick={()=>history.push(`/method/${data.name}/${enpoint.name}`)}
                            >{enpoint.name}</MenuItem>))
                            }
                        </SubMenu>)):null}
                        
                    </Menu>
                </SidebarContent>
                <SidebarFooter>
                    <p>© 2021 made with &#128420;- Fakhril AK</p>
                </SidebarFooter>
                </ProSidebar>
            </div>}
            
            <div className="min-h-screen rounded-lg w-11/12 m-auto"
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
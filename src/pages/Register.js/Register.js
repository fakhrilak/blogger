import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import Wrapper from '../../components/Wrapper/Wrapper'
import { API, config, setAuthToken } from '../../config/API'
import { loadUser } from '../../redux/actions/auth'

const Register = ({loadUser,auth:{user}}) => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [username,setUserName] = useState("")
    const [name,setName] = useState("")

    const onRegister =()=>{
        console.log("masuk")
        const data ={
                "email":email,
                "username": username,
                "password": password,
                "fullname": name  
        }
        API.post("/register",data,config)
        .then((res)=>{
            if(res.status==200){
                setAuthToken(res.data.token)
                localStorage.setItem("token",res.data.token)
                loadUser()
                alert(res.data.message)
                Redirect("/")
            }
        })
        .catch((err)=>{
            alert(err.response.data.message)
        })
    }
    return !user ?(
        <Wrapper>
            <div className='h-screen flex bg-gray-bg1 m-5'>
                <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                    <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                        Register your account 🔐
                    </h1>
                        <div>
                            <label htmlFor='email'>Email</label>
                            <input
                                type='email'
                                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                                placeholder='Email'
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor='email'>Full Name</label>
                            <input
                                type='text'
                                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                                placeholder='Full Name'
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor='email'>User Name</label>
                            <input
                                type='text'
                                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                                placeholder='User Name'
                                value={username}
                                onChange={(e)=>setUserName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                                placeholder='Your Password'
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>

                        <div className='flex justify-center items-center mt-6'>
                            <button
                                className={`bg-green py-2 px-4 text-sm text-black rounded border border-green focus:outline-none focus:border-green-dark`}
                                onClick={()=>onRegister()}
                            >
                                    Register
                            </button>
                        </div>
                </div>
            </div>
        </Wrapper>
    ):(
        <Redirect to="/"/>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  
  export default connect(mapStateToProps, {loadUser})(Register);
import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Link, Redirect, useHistory } from 'react-router-dom'
import Wrapper from '../../components/Wrapper/Wrapper'
import { API, config, setAuthToken } from '../../config/API'
import { loadUser } from '../../redux/actions/auth'
import { types } from '../../redux/actions/type'
const Login = ({loadUser,auth:{user}}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    const Login=()=>{
        const body = {
            email:email,
            password:password
        }
        API.post("/login",body,config)
        .then((res)=>{
            if(res.status == 200){
                setAuthToken(res.data.token)
                history.push("/profile")
                dispatch({
                    type:types.login_success,
                    payload : res.data
                })
                loadUser()
            }           
        })
        .catch((err)=>{
            //console.log(err.response)
            dispatch({
                type:types.login_fail,
                payload:err.response
            })
        })
    }
    return !user ?(
        <Wrapper>
            <div className='h-screen flex bg-gray-bg1 m-5'>
                <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                    <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                        Log in to your account 🔐
                    </h1>
                        <div>
                            <label htmlFor='email'>Email / Uname</label>
                            <input
                                type='email'
                                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                                placeholder='Email / Uname'
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
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
                            onClick={()=>Login()}
                            >
                                Login
                            </button>
                        </div>
                        <div className="pt-10 text-center">
                            <p>Dont Have an Accont ? 
                                <Link to="/register" 
                                className="m-2 underline"
                                ><strong>klik me!</strong></Link></p>
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
  
  export default connect(mapStateToProps, {loadUser})(Login);
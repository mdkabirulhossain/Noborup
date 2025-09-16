import { IoIosEye } from "react-icons/io";
import { FaUser, FaEyeSlash } from "react-icons/fa";
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))

    }

    const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post(backendUrl + '/api/user/login', data);
        
        if (response.data.success) {
            const receivedToken = response.data.token;
            
            // Update state
            setToken(receivedToken);
            
            // Save to localStorage using the received token
            localStorage.setItem('token', receivedToken);
            
            console.log(receivedToken);
            
        } else {
            toast.error(response.data.message);
        }
        
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
}
    // console.log(data)
    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token])

    return (
        <div className="hero bg-base-200 mt-[20%] sm:mt-[5%] flex justify-center">
            <div className="hero-content ">

                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl rounded-2xl p-4 sm:p-10">
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className='flex justify-center'>
                            <div className='flex justify-center items-center border rounded-full w-12 h-12 text-orange-500 border-orange-500'>
                                <FaUser></FaUser>
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" onChange={onChangeHandler} name='email' value={data.email} placeholder="email" className="border py-1 pl-2 rounded-md input-bordered w-full outline-none" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className='flex justify-between items-center relative'>
                                <input type={showPassword ? "text" : 'password'} placeholder="password" onChange={onChangeHandler} name='password' value={data.password} className="border py-1 pl-2 rounded-md input-bordered w-full outline-none" required />
                                <div className='absolute right-2 cursor-pointer' >
                                    {
                                        showPassword ?
                                            <FaEyeSlash onClick={() => setShowPassword(false)} />

                                            :
                                            <IoIosEye onClick={() => setShowPassword(true)} />
                                    }

                                </div>
                            </div>
                            <label className="label">

                                <Link to='/forgotPassword' href="#" className="label-text-alt link link-hover">Forgot password?</Link>
                            </label>
                        </div>
                        <div className="form-control mt-1">
                            <button type='submit' className="w-full bg-orange-500 text-white rounded-md py-1">Login</button>
                        </div>
                        <p className='text-sm'>Don't have account?<Link to='/signUp'><span className='text-orange-500 hover:underline'> Sign Up</span></Link> </p>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Login;
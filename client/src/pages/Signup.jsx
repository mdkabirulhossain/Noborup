import React from 'react';
import { IoIosEye } from "react-icons/io";
import { FaUser,FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import { Link } from "react-router";

const Signup = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
    })
    const onChangeHandler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data =>({...data, [name]:value}))

    }

    const handleSubmit = (event)=>{
        event.preventDefault();
    }
    console.log(data)
    return (
        <div className="hero bg-base-200 mt-[20%] sm:mt-[5%] flex justify-center">
            <div className="hero-content">

                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl rounded-2xl p-4 sm:p-10">
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className='flex justify-center'>
                            <div className='flex justify-center items-center border rounded-full w-14 h-14 text-orange-500 border-orange-500 overflow-hidden'>
                                <label htmlFor="image">
                                    {
                                        image?
                                        <img className='w-20 h-20' src={URL.createObjectURL(image)} alt="" />
                                        :
                                        <div className='cursor-pointer flex flex-col items-center overflow-hidden'>
                                            <FaUser className=''></FaUser>
                                            <p className='text-xs'>uplod img</p>
                                        </div>
                                        
                                    }
                                </label>
                                <input onChange={(event) => setImage(event.target.files[0])} type="file" name="" id="image" className='border p-1 rounded-md my-1' hidden required />
                               
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" onChange={onChangeHandler} name='name' value={data.name} placeholder="name" className="border py-1 pl-2 rounded-md input-bordered w-full outline-none" required />
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
                            <div className='flex justify-between items-center'>
                                <input type={showPassword? "text" : 'password'} placeholder="password" onChange={onChangeHandler} name='password' value={data.password} className="border py-1 pl-2 rounded-md input-bordered w-full outline-none" required />
                                <div className='absolute right-10 cursor-pointer' >
                                   {
                                    showPassword? 
                                    <FaEyeSlash onClick={()=>setShowPassword(false)}/>
                                    
                                    :
                                    <IoIosEye onClick={()=>setShowPassword(true)}/>
                                   }
                                    
                                </div>
                            </div>
                            
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <div className='flex justify-between items-center'>
                                <input type={showConfirmPassword? "text" : 'password'} placeholder="confirm password" onChange={onChangeHandler} name='confirmPassword' value={data.confirmPassword} className="border py-1 pl-2 rounded-md input-bordered w-full outline-none" required />
                                <div className='absolute right-10 cursor-pointer' >
                                   {
                                    showConfirmPassword? 
                                    <FaEyeSlash onClick={()=>setShowConfirmPassword(false)}/>
                                    
                                    :
                                    <IoIosEye onClick={()=>setShowConfirmPassword(true)}/>
                                   }
                                    
                                </div>
                            </div>
                            
                        </div>
                        <div className="form-control mt-1">
                            <button type='submit' className="w-full bg-orange-500 text-white rounded-md py-1">SignUp</button>
                        </div>
                        <p className='text-sm'>If you have an account?<Link to='/login'><span className='text-orange-500 hover:underline'> Log In</span></Link> </p>
                    </form>
                    
                </div>
            </div>
        </div>
    );
};

export default Signup;
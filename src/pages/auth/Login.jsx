import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../services/authQueries';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import toast from 'react-hot-toast';
import "../../styles/styles.css"
import TypeWriter from '../../shared/TypeWriter/TypeWriter';
import { loginSchema } from '../../schema/authSchema';


const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const loginMutation = useLoginMutation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            // Validate form data
            await loginSchema.validate({ email, password }, { abortEarly: false });

            const { data } = await loginMutation.mutateAsync({ email, password });

            // Display a success toast
            toast.success(`Welcome back, ${data.user.name}!`, {
                duration: 3000,
            });

            console.log(data);
            navigate('/table');
        } catch (error) {
            console.error(error);

            if (error.name === 'ValidationError') {
                // Yup validation error
                error.errors.forEach((errorMsg) => {
                    toast.error(errorMsg, { duration: 3000 });
                });
            } else {
                // Other errors
                toast.error('Invalid credentials. Please try again.', { duration: 3000 });
            }
        } finally {
            setLoading(false);
        }
    };


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <div className="relative h-screen grid bg-[#010001]">
                <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0">
                    <div className="relative sm:w-1/2 xl:w-3/5 bg-blue-500 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden text-white bg-no-repeat bg-cover relative" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1514254220549-515803732172?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}>
                        <div className="absolute bg-black opacity-25 inset-0 z-0"></div>
                        <div className="w-full lg:max-w-2xl md:max-w-md z-10 items-center text-center">
                            <div className="font-bold leading-tight mb-6 mx-auto w-full content-center items-center">

                                <div className="flex items-center">
                                    <span className="text-6xl text-primary text-[#FFA001]">-</span>
                                    <div className='pb-6'>
                                        <TypeWriter />
                                    </div>
                                </div>
                                <p className='font-normal text-left opacity-80'>
                                    Embark on a coding odyssey with Arraytics! Conquer our JavaScript take-home exam by crafting an elegant MERN Shopping App. Securely separate frontend and backend, authenticate through APIs, showcase data with flair, and dockerize for seamless deployment. Keep it simple, impress at Arraytics!
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="md:flex md:items-center md:justify-left w-full sm:w-auto md:h-full xl:w-1/2 p-8 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none">
                        <div className="max-w-xl w-full space-y-12">
                            <div className="lg:text-left text-center">
                                <div className="flex items-center justify-center">
                                    <div className="bg-black flex flex-col w-full border border-gray-900 rounded-lg px-8 py-10">
                                        <form onSubmit={handleLogin} className="flex flex-col  ">
                                            <label className="font-bold text-lg text-white mt-3">Email</label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Write Your Email.."
                                                className="border rounded-lg py-3 px-3 bg-black border-indigo-600 placeholder-white-500 text-white mb-3" />
                                            <div className="font-bold text-lg text-red-600 mt-1">
                                                {loginSchema?.errors?.email?.message}
                                            </div>
                                            <label className="font-bold text-lg text-white">Password</label>

                                            <div className="relative">
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="Write Your Password.."
                                                    className="border rounded-lg py-3 px-3 mt-4 bg-black border-indigo-600 placeholder-white-500 text-white w-full"
                                                />
                                                <div className="password-toggle" onClick={togglePasswordVisibility}>
                                                    {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                                                </div>
                                            </div>
                                            <div className="font-bold text-lg text-red-600 mt-1">
                                                {loginSchema.errors?.password?.message}
                                            </div>
                                            <button
                                                type="submit"
                                                className="border mt-12 border-indigo-600 bg-black text-white rounded-lg py-3 font-semibold relative"
                                                disabled={loginMutation.isLoading}
                                            >
                                                <div className='flex items-center justify-center'>
                                                    <div>
                                                        {loading && <div className="spinner"></div>}
                                                    </div>
                                                    <div>
                                                        {loginMutation.isLoading ? 'Logging in...' : 'Login'}
                                                    </div>
                                                </div>
                                            </button>

                                            <div class="flex items-center justify-between mt-4"><span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span> <Link to="/signup" class="text-xs  text-gray-500 uppercase dark:text-gray-400 hover:underline">Create an account</Link> <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span></div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
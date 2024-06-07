import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import { isEmpty } from "../helper/validation";


const Login =()=> {
    const navigate =useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          navigate("/home");
        }
      }, [navigate]);
      const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

    
    const handleSubmit=async (e)=>{
        e.preventDefault();
    setError(null);
    if (isEmpty(email)) {
      setError("Enter the email");
      return;
    } else if (isEmpty(password)) {
      setError("enter the password");
      return;
    }
    try {
      await axios
        .post(
          `http://localhost:3000/login`,
          { email, password }
        )
        .then((response) => {
          if (response.status == 200 && response.data.role === "user") {
            const token = response.data.token;
            localStorage.setItem("token", token);
            navigate("/home");
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            setError(error.response.data.message);
          }
        });
    } catch (err) {
      console.error(err);
    }
    }
    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                   Sign in
                </h1>
                {error ? <div>{error}</div> : ""}
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={(e)=> setEmail(e.target.value)}
                            value={email}
                            autoComplete="email"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={(e)=>setPassword(e.target.value)}
                            value={password}
                            required
                        />
                    </div>
                    {/* <a
                        href="#"
                        className="text-xs text-purple-600 hover:underline"
                    >
                        Forget Password?
                    </a> */}
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <a
                        href="#"
                        className="font-medium text-purple-600 hover:underline"
                        onClick={()=>navigate('/register')}
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login
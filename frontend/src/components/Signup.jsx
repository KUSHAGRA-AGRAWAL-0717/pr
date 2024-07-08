import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    expertise: "",
  });
  const [isExpert, setIsExpert] = useState(false);
  const navigate = useNavigate();

  const handleCheckbox = (role) => {
    setUser({ ...user, role });
    setIsExpert(role === "expert");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/register", user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      username: "",
      email: "",
      password: "",
      role: "",
      expertise: "",
    });
    setIsExpert(false);
  };

  return (
    <div className="min-w-96 mx-auto flex justify-center items-center">
      <div className="h-100 w-50 mt-16 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 p-4">
        <h1 className="text-3xl font-bold text-center text-black">Signup</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="flex flex-col items-center">
            <label className="label p-2 ml-4">
              <span className="text-base label-text text-black">Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="m-full input input-bordered h-10 bg-white text-black placeholder-black m-6 mt-0"
              type="text"
              placeholder="Full Name"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="label p-2 ml-4">
              <span className="text-base label-text text-black">Email</span>
            </label>
            <input
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="m-full input input-bordered h-10 bg-white text-black placeholder-black m-6 mt-0"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="label p-2 ml-4">
              <span className="text-base label-text text-black">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="m-full input input-bordered h-10 bg-white text-black placeholder-black m-6 mt-0"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center justify-center my-4">
            <div className="flex items-center">
              <p>User</p>
              <input
                type="checkbox"
                checked={user.role === "user"}
                onChange={() => handleCheckbox("user")}
                className="checkbox mx-2"
              />
            </div>
            <div className="flex items-center">
              <p>Expert</p>
              <input
                type="checkbox"
                checked={user.role === "expert"}
                onChange={() => handleCheckbox("expert")}
                className="checkbox mx-2"
              />
            </div>
          </div>
          {isExpert && (
            <div className="flex flex-col items-center">
              <label className="label p-2 ml-4">
                <span className="text-base label-text text-black">Expertise</span>
              </label>
              <input
                value={user.expertise}
                onChange={(e) => setUser({ ...user, expertise: e.target.value })}
                className="m-full input input-bordered h-10 bg-white text-black placeholder-black m-6 mt-0"
                type="text"
                placeholder="Field"
              />
            </div>
          )}
          <p className="text-center text-black my-2">
            Already have an account? <Link to="/login">Login</Link>
          </p>
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn btn-accent btn-block btn-sn mt-3 border border-state-700"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

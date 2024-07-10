import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom"
import { SignupInput } from "@tushar0715/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({type} : {type : "signup" | "signin"})=>{
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name : "",
        email : "",
        password : ""
    });

    async function sendRequest(){
        try{
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type=="signin"?"signin" : "signup"}`, postInputs);
        const jwt = response.data;
        localStorage.setItem("token" , jwt)
        }catch(e){

        }
    }
    return <div className=" h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div >
                <div className="px-10 mb-4">
                    <div className="text-3xl font-extrabold text-center">
                        {type == "signin" ? "Log in to your account" : "Create an account"}
                    </div>
                    <div className="text-slate-400 text-center">
                        {type == "signin" ? "Dont have an account?" : "Already have an account?"}
                        <Link className="underline pl-2" to={type=='signin'? "/signup" : "/signin"}> 
                            {type=='signin'? 'Create' : 'Login'}
                        </Link>
                    </div>
                </div>
                
                    {type=="signup" ? <LabelledInput lable="Name" placeholder="Tushar ...." onChange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            name : e.target.value
                        })
                    }}/> : null}
                    <LabelledInput lable="Email" placeholder="xyz@abc.com ...." onChange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            email : e.target.value
                        })
                    }}/>
                    <LabelledInput lable="Password" type={"password"} placeholder="123456" onChange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            password : e.target.value
                        })
                    }}/>
                    <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signin" ? "Sign in" : "Sign up"}</button>
            </div>
    </div>

        
    
    </div>
}
interface LabelledInputType {
    lable : string;
    placeholder : string;
    onChange : (e : ChangeEvent<HTMLInputElement>) => void;
    type? : string;
}
function LabelledInput({lable , placeholder, onChange, type} : LabelledInputType){
    return <div>
        <label className="block mb-1 text-sm text-black font-semibold px-2 ">{lable}</label>
        <input onChange={onChange} type={type || "text" }id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-2" placeholder={placeholder}/>
    </div>
}
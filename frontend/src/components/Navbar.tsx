import { GoogleAuthProvider, onAuthStateChanged, signInWithRedirect } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Navbar = () => {

    const [authStateButton, setAuthStateButton] = useState<JSX.Element>(
    <div className="w-10 aspect-square rounded-full bg-[#F9B572] border-2 border-solid border-white">
        <img src="/icons/slime.svg"/>
    </div>
    );

    const googleLogin = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithRedirect(auth, provider)
        console.log(result)
    }

    useEffect(() => {
        
        // check if user is logged in
        onAuthStateChanged(auth, (user) => {
            // if logged in: display profile button
            if (user) {
                setAuthStateButton(
                    <Link to={"/user"} className="w-10 aspect-square rounded-full bg-[#F9B572] border-2 border-solid border-white" >
                        <img src="/icons/slime.svg"/>
                    </Link>
                )
            }
            // if not logged in: display google login button
            else {
                setAuthStateButton(
                    <button type="button" onClick={googleLogin} className="px-2 flex items-center gap-x-2 h-10 rounded-md bg-white text-black border-2 border-[#F9B572] font-bold text-xl">
                        <FcGoogle /> Login
                    </button>
                )
            }
        })



    }, []);

    return (
        <div className="w-full mt-[10px] min-h-[56px] px-4 flex justify-end items-center gap-x-3 [&>*]:cursor-pointer bg-transparent">
            <div className="w-10 aspect-square rounded-full bg-[#F9B572] border-2 border-solid border-white flex justify-center items-center">
                <img src="/icons/shopping-cart.svg"/>
            </div>
            <div className="w-10 aspect-square rounded-full bg-[#F9B572] border-2 border-solid border-white flex justify-center items-center">
                <img src="/icons/bookmark.svg"/>
            </div>
            <div className="w-10 aspect-square rounded-full bg-[#F9B572] border-2 border-solid border-white">
                <img src="/icons/gear.svg"/>
            </div>
            {authStateButton}
        </div>
    );
};

export default Navbar;

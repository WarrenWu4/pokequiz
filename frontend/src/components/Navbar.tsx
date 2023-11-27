import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import User from "../types";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Navbar = () => {

    const [authStateButton, setAuthStateButton] = useState<JSX.Element>(
    <div className="w-10 aspect-square rounded-full bg-[#F9B572] border-2 border-solid border-white">
        <img src="/icons/slime.svg"/>
    </div>
    );

    const googleLogin = async () => {
        const provider = new GoogleAuthProvider();
        // sign user in with google
        const result = await signInWithPopup(auth, provider)
        
        // if already in database, do nothing
        const userRef = doc(db, "users", result.user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            return;
        }

        // if not already in database, add user to database
        const currUser:User = {
            uid: result.user.uid,
            username: (result.user.displayName) ? result.user.displayName : "",
            email: (result.user.email) ? result.user.email : "",
            quizIds: [],
        }
        await setDoc(userRef, currUser)

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
        <div className="w-full mt-[10px] min-h-[56px] px-4 flex justify-between items-center [&>*]:cursor-pointer bg-transparent">
            
            <Link to={"/"} className="w-12 aspect-square rounded-full">
                <img src="/pokeball.png"/>
            </Link>

            <div className="flex items-center gap-x-3">
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

        </div>
    );
};

export default Navbar;

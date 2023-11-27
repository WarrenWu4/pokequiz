import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "../firebase";
import User from "../types";
import { doc, getDoc } from "firebase/firestore";

const Profile = () => {
    
    const [userData, setUserData] = useState<User>()

    useEffect(() => {
        
        // check if logged in
        onAuthStateChanged(auth, async (user) => {
            // if logged in: showcase profile
            if (user) {
                const userRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    setUserData(docSnap.data() as User)
                }
            }
            // if not logged in: showcase error
        })

    }, [])
    
    return (
        <div className="w-screen h-screen overflow-x-hidden bg-[url('bg-image.svg')] bg-center bg-no-repeat bg-cover">
    
        <div className="w-full h-full backdrop-blur-sm bg-black/80 flex flex-col items-center">

            <Navbar/>

            {userData ? 
            <div className="w-full h-full flex flex-col px-12">
                <h1>{userData.username}</h1>
            </div>
            :
            <div className="w-full h-full flex items-center justify-center text-2xl px-4 font-bold">
                Error! You are not logged in!<br/>
                Go back to the home page and login
            </div>
            }

        </div>

    </div>
    )
}

export default Profile
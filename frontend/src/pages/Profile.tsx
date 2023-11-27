import Navbar from "../components/Navbar"

const Profile = () => {
    
    // check if logged in
    // if not logged in: showcase error
    // if logged in: showcase profile
    
    return (
        <div className="w-screen h-screen overflow-x-hidden bg-[url('bg-image.svg')] bg-center bg-no-repeat bg-cover">
    
        <div className="w-full h-full backdrop-blur-sm bg-black/80 flex flex-col items-center">

            <Navbar/>


        </div>

    </div>
    )
}

export default Profile
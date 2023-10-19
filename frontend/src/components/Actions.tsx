import { MdBookmarks, MdSettings } from "react-icons/md"

const Actions = () => {

    // get profile data

    return (
        <div className="w-full h-9/20 flex justify-end items-center p-12 gap-x-4 [&>*]:cursor-pointer">
            <div className="w-9 aspect-square"><MdBookmarks size={36}/></div>
            <div className="w-9 aspect-square"><MdSettings size={36}/></div>
            <div className="w-9 aspect-square bg-white rounded-md"></div>
        </div>
    )
}

export default Actions
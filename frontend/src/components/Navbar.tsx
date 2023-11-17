const Navbar = () => {
    // get profile data

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
            <div className="w-10 aspect-square rounded-full bg-[#F9B572] border-2 border-solid border-white">
                <img src="/icons/slime.svg"/>
            </div>
        </div>
    );
};

export default Navbar;

const Playerboard = (props: any) => {
    return (
        <div className="bg-[#5A6988] flex flex-row py-1 px-2 items-center">
            <img className="w-[12%]" src="/icons/slime.svg" alt="" />
            <div className="uppercase w-[63%]">{props.name}</div>
            <div className="border-2 border-white w-2 rounded-sm mr-5"></div>
            <div>
                {props.correct ? props.correct : 0}/{props.total ? props.total : 0}
            </div>
        </div>
    );
}

export default Playerboard;
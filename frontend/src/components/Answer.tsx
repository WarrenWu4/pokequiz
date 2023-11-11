export default function Answer(props: any) {
    return (
        <div className="flex justify-center items-center gap-6">
            <textarea
                name="answer"
                placeholder="Type your answer here"
                className="bg-[#7A91C1] text-sm rounded-lg focus:outline-none placeholder:text-slate-300 w-[240px] px-4 py-2 resize-none"
            ></textarea>
            <label className="flex items-center justify-center p-1 bg-[#18233AF7]">
                <input type="checkbox"></input>
            </label>
        </div>
    );
}

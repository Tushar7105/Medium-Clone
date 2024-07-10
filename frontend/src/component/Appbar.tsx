import { Avatar } from "../component/BlogCard"

export const Appbar = ()=>{
    return <div className="border-b flex justify-between px-10 py-4">
        <div className="flex flex-col justify-center text-xl">
            Medium
        </div>
        <div>
            <Avatar name={"Lawrance"} size={"big"}/>
        </div>
    </div>
}
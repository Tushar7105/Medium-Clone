// import {Link} from "react-router-dom";
interface BlogCardProps{
    // id : string;
    authorName : string;
    title : string;
    content : string;
    publishDate : string
}

export const BlogCard = ({
    authorName , title, content , publishDate
} : BlogCardProps)=>{
    return<div className="border-b corder-slte-200 pb-4 p-4">
        
        <div className="flex">
            <div>
                <Avatar name={authorName}/>
            </div> 
            <div className="pl-2 text-sm fomt-extralight flex justify-center flex-col">
                {authorName}
            </div>
            <div className="flex justify-center flex-col pl-2">
                <Circle/>
            </div>
            <div className="pl-2 text-sm font-thin text-slate-500 text-m flex justify-center flex-col">
                {publishDate}
            </div>
        </div>
        <div className="font-semibold text-xl pt-2">
            {title}
        </div>
        <div className="font-thin text-md">
            {content.slice(0, 100) + "..."}
        </div>
        <div className="text-sm font-thin text-slate-500 pt-3">
            {`${Math.ceil(content.length / 100)} minute(s) read`}
        </div>

    </div>
}

function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-900">

    </div>
}

export function Avatar({name, size="small"}: {name:string, size?:"small" | "big"}){
    return <div className={`relative inline-flex items-center justify-center ${size=="small" ? "w-6 h-6" : 'w-10 h-10'} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
    <span className={` ${size=="small" ? "text-xs font-extralight" : "text-md font-bold"} text-gray-600 dark:text-gray-300`}>{name[0]}</span>
</div>
}
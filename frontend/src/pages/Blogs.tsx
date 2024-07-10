import { BlogCard } from "../component/BlogCard"
import { Appbar } from "../component/Appbar"

export const Blogs =  ()=>{
    return <div>
        <Appbar/>
        <div className="flex justify-center">
        <div className="max-w-xl">
            <BlogCard
                authorName = {"Lawrance Bidhnoi"}
                title = {"How does an ugly website generate $500 in revenue without marketing"}
                content = {"How does an ugly website generate $500 in revenue without marketingHow does an ugly website generate $500 in revenue without marketingHow does an ugly website generate $500 in revenue without marketing"} 
                publishDate = {"2nd jan 2024"}
            />
            <BlogCard
                authorName = {"Lawrance Bidhnoi"}
                title = {"How does an ugly website generate $500 in revenue without marketing"}
                content = {"How does an ugly website generate $500 in revenue without marketingHow does an ugly website generate $500 in revenue without marketingHow does an ugly website generate $500 in revenue without marketing"} 
                publishDate = {"2nd jan 2024"}
            />
            <BlogCard
                authorName = {"Lawrance Bidhnoi"}
                title = {"How does an ugly website generate $500 in revenue without marketing"}
                content = {"How does an ugly website generate $500 in revenue without marketingHow does an ugly website generate $500 in revenue without marketingHow does an ugly website generate $500 in revenue without marketing"} 
                publishDate = {"2nd jan 2024"}
            />
            <BlogCard
                authorName = {"Lawrance Bidhnoi"}
                title = {"How does an ugly website generate $500 in revenue without marketing"}
                content = {"How does an ugly website generate $500 in revenue without marketingHow does an ugly website generate $500 in revenue without marketingHow does an ugly website generate $500 in revenue without marketing"} 
                publishDate = {"2nd jan 2024"}
            />
        </div>
    </div>
    </div>
}
import fs from 'fs/promises';
import {remark} from 'remark';
import html from 'remark-html';
import { IoMdHome } from "react-icons/io";
import Link from 'next/link';
import path from 'path';

export default async function page({params}){
    try{
        let {page} = await params; //get the page from params
        page = page.replace("%20", " ");
        console.log(page);
        const filepath = path.join(process.cwd(), 'public/content', page);
        const content = await fs.readFile(filepath);
        const htmlContent = (await remark().use(html).process(content)).toString(); //convert using remark + remark-html

        return(
            <div className="flex flex-col min-h-screen justify-center">
                <div className="flex justify-left p-5 sticky"><Link href="/" className="p-1"><IoMdHome size={45}/></Link></div>
                <div className="grow flex justify-center prose-lg bg-primary p-5 overflow-auto">
                    <div className="text-left md:w-[35%] w-full text-wrap" dangerouslySetInnerHTML={{__html:htmlContent}}/>
                </div>
                <div className="p-5 flex justify-left">Goh Yue Kang (2025)</div>
            </div>
        );
    }catch(err){
        console.log(err);
        return <div>Error loading page</div>
    }
}
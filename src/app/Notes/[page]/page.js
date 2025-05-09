import fs from 'fs/promises';
import {remark} from 'remark';
import html from 'remark-html';
import { IoMdHome } from "react-icons/io";
import Link from 'next/link';

export default async function page({params}){
    let {page} = await params; //get the page from params
    page = page.replace("%20", " ");
    console.log(page);
    const content = await fs.readFile(`public/content/${page}`);
    const htmlContent = (await remark().use(html).process(content)).toString(); //convert using remark + remark-html

    return(
        <div>
            <div className="flex justify-left p-5 sticky"><Link href="/" className="p-1"><IoMdHome size={45}/></Link></div>
            <div className="grow flex justify-center prose-lg bg-primary h-screen p-2 overflow-auto">
                <div className="text-left w-[35%]" dangerouslySetInnerHTML={{__html:htmlContent}}/>
            </div>
        </div>
    );
}
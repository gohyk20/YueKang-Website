'use client';

import {useState} from 'react';
import Window from '@/app/ui/window';
import Image from "next/image";

export default function About({layer, bringToFront}){
    const [hidden, setHidden] = useState(true);

    function handleWindowClick(e){
        setHidden(!hidden);
        if(!hidden) bringToFront("About");
      }

    const age = new Date().getFullYear() - 2006;

    return(
        <div>
            <button onClick={handleWindowClick} className="p-2 rounded-xl hover:bg-dark text-2xl">About</button>
            <Window hidden={hidden} handleClose={handleWindowClick} title="About" layer={layer} bringToFront={bringToFront}>
                <div className="p-2 text-left text-wrap grow-2">
                    <h1 className="font-bold text-xl">Currently...</h1>
                    <p>I am {age} years old, living in Singapore. <br/>
                    Killing time by working on small projects.</p>
                    <div className="flex gap-4">
                        <a href="https://www.linkedin.com/in/yue-kang-goh-92561525a/" className="flex gap-2 hover:bg-accent p-2 rounded-xl"><Image src="/InBug-Black.png" width={20} height={20} alt="linkedin icon"/>LinkedIn</a>
                        <a href="https://github.com/gohyk20" className="flex gap-2 hover:bg-accent p-2 rounded-xl"><Image src="/github-mark.svg" width={20} height={20} alt="github icon"/>GitHub</a>
                    </div>
                    <br/>
                    <h1 className="font-bold text-xl">Things I&#39;ve done...</h1>
                    <div className="p-2">
                        <h2><a href="https://hahah9662.itch.io/snakebit-roadd" className="hover:bg-accent p-1 rounded">Snakebit Road (2025)</a></h2>
                        <p className="p-1">A game I made for a game jam in about a month. <br/>
                        Was my first time making a game and learnt alot about unity and C#.</p>
                    </div>
                    <div className="p-2">
                        <h2><a href="https://github.com/gohyk20/TrendRadar" className="hover:bg-accent p-1 rounded">Trend Radar (2025)</a></h2>
                        <p className="p-1">Python script to scrape tiktok and instagram. <br/>
                        Many accounts were banned in the making of this.</p>
                    </div>
                </div>
            </Window>
        </div>
    );
}
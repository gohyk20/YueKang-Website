'use client';

import Link from 'next/link';
import {useState} from 'react';
import Window from '@/app/ui/window';

function Links({files}){
    return(
        <div className="flex flex-col font-lg text-xl">
            {files.map((file, idx)=>
                <button key={idx} className="p-2 hover:bg-accent rounded-lg">
                    <Link href={`/Notes/${file}`}>
                        {file}
                    </Link>
                </button>
            )}
        </div>
    );
}

export default function Notes({files, layer, bringToFront}){
    const [hidden, setHidden] = useState(true);

    function handleWindowClick(e){
        setHidden(!hidden);
        bringToFront("Notes");
      }

    return(
        <div>
            <button onClick={handleWindowClick} className="p-2 rounded-xl hover:bg-dark text-2xl">Notes</button>
            <Window hidden={hidden} handleClose={handleWindowClick} title="Notes" layer={layer} bringToFront={bringToFront}>
                <div className="grow flex justify-center items-center flex-shrink-0">
                    <div className="p-2">
                        <Links files={files}/>
                    </div>
                </div>
            </Window>
        </div>
    );
}
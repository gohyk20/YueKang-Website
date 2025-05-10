"use client";

import Home from '@/app/ui/home';
import About from '@/app/ui/about';
import Notes from '@/app/ui/notes';
import {useState} from 'react';

export default function Topnav({files}){
    const [layers, setLayers] = useState({"Me": 1, "About": 2, "Notes": 3, "Music": 4});

    function bringToFront(id) {
        console.log("clicked", id, "moving to front");
        const newLayers = {...layers};
        newLayers[id] = 4; //bring clicked window to front
        console.log(newLayers);
        for (const key in layers){
            if (key != id && layers[key] > layers[id]){
                console.log("lowering ", key)
                newLayers[key] = layers[key] - 1; //lower layers of windows above clicked
            }
        }
        console.log(newLayers);
        setLayers(newLayers);
    }

    return(
        <div className="flex justify-around p-2 mt-[3%] mr-[3%] ml-[3%] bg-primary rounded-lg w-screen">
            <Home layer={layers["Me"]} bringToFront={bringToFront} musicLayer={layers["Music"]}/>
            <About layer={layers["About"]} bringToFront={bringToFront}/>
            <Notes files={files} layer={layers["Notes"]} bringToFront={bringToFront}/>
        </div>
  );
}
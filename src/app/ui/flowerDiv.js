'use client';

import Image from "next/image";
import {useState} from "react";


function Flower({x,y}){
    const generatePastelColour = ()=>{
        const hue = Math.floor(Math.random()*360);
        const saturation = Math.random()*20 + 60; //60-80%
        const lightness = Math.random()*20 + 60; //60-80%
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`
    }

    const petalColour = generatePastelColour();
    const centerColour = "#FCF2DB";
    return(
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            viewBox="0 0 64 64"
            className="absolute"
            style={{top:y-32, left:x-32}}
            width={64}
            height={64}
        >
            <path
            d="M36.382 16.22a6.275 5.624 0 0 1-6.191 5.624 6.275 5.624 0 0 1-6.357-5.474 6.275 5.624 0 0 1 6.022-5.769 6.275 5.624 0 0 1 6.517 5.32"
            style={{
                fill: petalColour,
                fillOpacity: 1,
                strokeWidth: 1.294,
            }}
            />
            <path
            d="M27.47 21.41a6.275 5.624 0 0 1-6.191 5.623 6.275 5.624 0 0 1-6.356-5.473 6.275 5.624 0 0 1 6.022-5.77 6.275 5.624 0 0 1 6.517 5.32"
            style={{
                fill: petalColour,
                fillOpacity: 1,
                strokeWidth: 1.294,
            }}
            />
            <path
            d="M30.479 31.901a6.275 5.624 0 0 1-6.192 5.623 6.275 5.624 0 0 1-6.356-5.473 6.275 5.624 0 0 1 6.022-5.77 6.275 5.624 0 0 1 6.517 5.32M44.129 22.2a6.275 5.624 0 0 1-6.192 5.623 6.275 5.624 0 0 1-6.356-5.474 6.275 5.624 0 0 1 6.022-5.769 6.275 5.624 0 0 1 6.517 5.32"
            style={{
                fill: petalColour,
                fillOpacity: 1,
                strokeWidth: 1.294,
            }}
            />
            <path
            d="M42.436 32.24a6.275 5.624 0 0 1-6.191 5.623 6.275 5.624 0 0 1-6.357-5.474 6.275 5.624 0 0 1 6.023-5.769 6.275 5.624 0 0 1 6.516 5.32"
            style={{
                fill: petalColour,
                fillOpacity: 1,
                strokeWidth: 1.294,
            }}
            />
            <ellipse
            cx={29.898}
            cy={24.959}
            rx={7.897}
            ry={7.483}
            style={{
                fill: centerColour,
                fillOpacity: 1,
                strokeWidth: 0.964445,
            }}
            />
            <ellipse
            cx={26.435}
            cy={23.022}
            rx={0.714}
            ry={0.808}
            style={{
                fill: "#000",
                fillOpacity: 1,
                strokeWidth: 0.623737,
            }}
            />
            <ellipse
            cx={33.532}
            cy={23.088}
            rx={0.714}
            ry={0.808}
            style={{
                fill: "#000",
                fillOpacity: 1,
                strokeWidth: 0.623737,
            }}
            />
            <path
            d="m30.924 22.98.014.047M28.547 22.918l3.32.008.008.191-.223.254-2.77-.016-.316-.218z"
            style={{
                fill: "#000",
                fillOpacity: 1,
                strokeWidth: 2.3,
                strokeDasharray: "none",
            }}
            />
        </svg>
    );
}


export default function FlowerDiv({children}){
    const [flowers, setFlowers] = useState([]);

    const clickHandler = (e) =>{
        if(e.target.id == "flowerDiv"){
            const flower = <Flower key={[e.clientX, e.clientY]} x={e.clientX} y={e.clientY}/>
            setFlowers([...flowers, flower]);
        }
    }

    return(
        <div id="flowerDiv" className="bg-primary relative h-screen w-[110%] overflow-hidden" onClick={clickHandler}>
            {flowers}
            {children}
        </div>
    );
}
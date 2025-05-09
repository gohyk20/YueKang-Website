'use client';

import {useState, useRef, useLayoutEffect} from 'react';
import clsx from 'clsx';

function Topbar({title, handleClick}){
    return(
        <div className="w-full flex justify-between bg-accent border-black border-b-2">
            <h1 className="m-2 text-lg">{title}</h1>
            <button className="m-2 p-0.5 hover:bg-light rounded" onClick={handleClick}>X</button>
        </div>
    );
}

export default function Window({children, hidden, handleClose, title, layer, bringToFront}){
    const [mounted, setMounted] = useState(false); //use this to delay rendering until mounted
    const [pos, setPos] = useState({x:0, y:0});
    const offset = useRef({x:0, y:0});
    const windowRef = useRef(null);

    useLayoutEffect(()=>{
        const rect = windowRef.current.getBoundingClientRect(); //get the size of window
        console.log(rect.width, rect.height);
        const x = (window.innerWidth - rect.width)/2;
        const y = (window.innerHeight - rect.height)/2;
        setPos({x:x,y:y});
        setMounted(true);
    }, [hidden]);


    const handleMouseDown = (e)=>{
        bringToFront(e.currentTarget.id);
        offset.current = {
            x: e.clientX - pos.x,
            y: e.clientY - pos.y
        }; //check the offset of mouse position from top left to be removed in calculating new position
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e)=>{
        //console.log(e.clientX, e.clientY, offset, pos);
        setPos({
            x: e.clientX - offset.current.x, //remove offset of mouse position
            y: e.clientY - offset.current.y
        });
    };

    const handleMouseUp = (e)=>{
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    const handleTouchStart = (e)=>{
        bringToFront(e);
        const touch = e.touches[0];
        offset.current = {
            x: touch.clientX - pos.x,
            y: touch.clientY - pos.y
        }; //check the offset of touch position from top left to be removed in calculating new position
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
    };

    const handleTouchMove = (e)=>{
        const touch = e.touches[0];
        setPos({
            x: touch.clientX - offset.current.x, //remove offset of touch position
            y: touch.clientY - offset.current.y
        });
    };

    const handleTouchEnd = (e)=>{
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
    }

    return(
        <div className={clsx("absolute active:cursor-move border-2 overflow-auto max-w-[90%] max-h-[80%] whitespace-nowrap",
        {"hidden": hidden}, {"opacity-0":!mounted})} 
        ref = {windowRef} id={title}
        style={{top:pos.y, left:pos.x, width:"fit-content", height:"fit-content", zIndex:layer}}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}>
            <Topbar title={title} handleClick={handleClose}/>
            <div className="bg-light flex-shrink-0">
                {children}
            </div>
        </div>
    );
}
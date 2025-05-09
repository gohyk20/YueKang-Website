'use client';

import Image from "next/image";
import clsx from 'clsx';
import {useState, useRef} from 'react';
import Window from '@/app/ui/window'
import {MdPlayArrow, MdPause, MdNavigateBefore, MdNavigateNext} from 'react-icons/md';


function Title(){
  return(
    <div className="mb-[6%]">
      <h1 className="text-7xl medium p-2">Hi, I&#39;m Yue Kang</h1>
      <p className="text-lg p-2">Dying one second at a time, also working at kfc</p>
    </div>
  );
}

function Picture({handlePictureClick, hits}){
  const pic = hits == 1 ? "/me-cry.jpg" : "/me.jpg";
  return(
    <button onClick={handlePictureClick}>
      <Image
        src={pic}
        alt="pic of me"
        width={250}
        height={250}
        className={clsx(" border-black border-2 rounded-[24px]", {"cursor-[url(/Gloves.cur),_pointer] active:cursor-[url(/Gloves-hit.png),_auto]" : hits == 0})}
      />
    </button>
  );
}


function Gloves({handleClick, hide}){
  return(
    <div className={clsx({"hidden":hide})}>
      <button id="gloves" onClick={handleClick}>
        <Image
          src="/Gloves.png"
          alt="Red boxing gloves"
          width={100}
          height={100}
          className="rotate-180 cursor-inherit"
        />
      </button>
    </div>
  );
}


function MusicBox({handleClick, hide}){
  return(
    <div className={clsx({"hidden":hide})}>
      <button id="music" onClick={handleClick}>
        <Image
          src="/MusicBox.png"
          alt="Music box"
          width={110}
          height={110}
          className="cursor-inherit"
        />
      </button>
    </div>
  );
}


function MusicPlayer({musicHidden}){
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [songID, setSongID] = useState(0);
  const songs = [
    {song: "/lost-in-the-rooftops-by-snoozybeats.mp3", thumbnail:"/punggolparkv2square.png", text:"Lost In The Rooftops by Snoozy Beats https://soundcloud.com/snoozybeats\nCreative Commons — Attribution 3.0 Unported — CC BY 3.0"},
    {song: "/bounce-by-declan-dp.mp3", thumbnail:"/punggolpark2.jpg", text:"Bounce by Declan DP\nLicense: https://license.declandp.info"},
    {song:"sassy-swing-by-audio-library-beats.mp3", thumbnail:"/sengkangriverside.jpg", text:"Sassy Swing — Audio Library Beats Group"}
  ];

  const handleClick = ()=>{
    const audio = audioRef.current;
    if(playing){
      audio.pause();
      setPlaying(false);
    }
    else{
      audio.play();
      setPlaying(true);
    }
  };

  const handleNext = ()=>{
    setSongID((songID+1)%songs.length);
  }

  const handlePrev = ()=>{
    if (songID == 0) setSongID(songs.length-1);
    else setSongID(songID-1);
  }

  const audioElement = playing ? <audio src={songs[songID].song} preload="auto" ref={audioRef} loop autoPlay/> : 
  <audio src={songs[songID].song} preload="auto" ref={audioRef} loop /> ; //prevent audio from playing if paused

  return(
    <div className="flex-col overflow-hidden">
      {!musicHidden && audioElement}
      <div className="relative w-full">
        <Image src={songs[songID].thumbnail} alt="music thumbnail" width={200} height={200}/>
        <div className="absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-70 bg-dark flex-col justify-center items-center text-white text-md p-2 text-wrap">
          {songs[songID].text.split("\n").map((line, idx)=>
            <p key={idx}>{line}</p>)}
        </div>
      </div>
      <div className="w-full bg-light flex justify-center gap-3">
        <button onClick={handlePrev}><MdNavigateBefore size={20}/></button>
        <button onClick={handleClick}>{playing ? <MdPause size={20}/> : <MdPlayArrow size={20}/>}</button>
        <button onClick={handleNext}><MdNavigateNext size={20}/></button>
      </div>
    </div>
  );
}


export default function Home({layer, bringToFront, musicLayer}) {
  const [hits, setHits] = useState(-1); //-1 is no hits, 0 is first hit on gloves, 1 is second hit on picture, 2 is music box hit. (yep its kinda unintuitve)
  const [hidden, setHidden] = useState(false);
  const [musicHidden, setMusicHidden] = useState(true);

  const handleClick = (e)=>{
    console.log(e.currentTarget.id);
    if (e.currentTarget.id == "gloves") setHits(0); //set hits to 0
    else if (e.currentTarget.id == "music"){ 
      setHits(2); //set hits to 2
      setMusicHidden(false); //show music player
      bringToFront("Music");
    }
  }

  function handlePictureClick(){
    if(hits == 0){
      setHits(1);
    }
  }

  function handleWindowClick(e){
    setHidden(!hidden);
    if(!hidden) bringToFront("Me");
  }

  function handleMusicClick(e){
    setMusicHidden(!musicHidden);
    if(!musicHidden) bringToFront("Music");
  }

  return (
    <div>
      <button onClick={handleWindowClick} className="p-2 rounded-xl hover:bg-dark text-2xl">Me</button>
      <Window hidden={hidden} handleClose={handleWindowClick} title="Me" layer={layer} bringToFront={bringToFront}>
        <div className="flex flex-col h-full p-2 gap-3 text-wrap">
            <div className={clsx(" flex justify-center items-center gap-[5%] p-2",
            {"cursor-[url(/Gloves.cur),_pointer]" : hits==0})}>
              <Title/>
              <Picture handlePictureClick={handlePictureClick} hits={hits}/>
            </div>
            <div className={clsx({"flex justify-around items-center p-2" : hits<0}, {"flex justify-center" : hits>-1})}>
              <MusicBox handleClick={handleClick} hide={hits>-1}/>
              <i> {hits<0 ? "Take your pick" : "ok thats great"} </i>
              <Gloves handleClick={handleClick} hide={hits>-1}/>
            </div>
        </div>
      </Window>
      <Window hidden={musicHidden} handleClose={handleMusicClick} title="Music" layer={musicLayer} bringToFront={bringToFront}>
        <MusicPlayer hidden={musicHidden}/>
      </Window>
    </div>
  );
}


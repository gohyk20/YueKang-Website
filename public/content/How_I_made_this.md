# How I made this website (2025)

Source code can be found ***[here](https://github.com/gohyk20/YueKang-Website)***.

## Framework

I used Nextjs with react and tailwind. Sounds fancy but I found that react and tailwind made coding much more intuitive than having to wrangle javascript, HTML and CSS.

I went through this ***[react tutorial](https://react.dev/learn/tutorial-tic-tac-toe)*** as well as this ***[nextjs tutorial](https://nextjs.org/learn)*** which taught me more than enough to get started.

## Windows

The bulk of the ui is wrapped in my windows component which allows for draggable and hidable divs. I got the idea from ***[this website](https://alicjabuchowicz.com/)*** which I found while browsing ***[CSS design awards](https://www.cssdesignawards.com/)***.

```
export default function Window({children, hidden, handleClose, title}){
    const [pos, setPos] = useState({x:0, y:0});
    const offset = useRef({x:0, y:0});

    const handleMouseDown = (e)=>{
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

   (...need separate functions for mobile touch, and also useEffect for centering the window)

    return(
        <div className={clsx("absolute active:cursor-move border-2 overflow-auto max-w-[90%] max-h-[80%] whitespace-nowrap",
        {"hidden": hidden}} 
        style={{top:pos.y, left:pos.x, width:"fit-content", height:"fit-content"}}
        onMouseDown={handleMouseDown}>
            <Topbar title={title} handleClick={handleClose}/>
            <div className="bg-light flex-shrink-0">
                {children}
            </div>
        </div>
    );
}
```

Here is a simplified version of the window code. The logic was simply to set the position of the div based on a state variable, and keep track of:

1. When the mouse is down on the div, where you want to create event listeners for the mouse moving or going up. As well as store the offset of the mouse from the top left corner (using ref).

2. As the mouse moves, you change the position state to the mouse position (e.clientX, e.clientY), making sure to subtract the mouse offset so the window doesnt jump to the mouse.

3. When the mouse goes up, you remove all the event listeners.

After wrapping the children props inside the div and adding a topbar, you have a fully functional window component :)

## Music Player

The music player is just playing some royalty free background music I downloaded and found on ***[this website](https://www.audiolibrary.com.co/)***. 

```
function MusicPlayer({musicHidden}){
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [songID, setSongID] = useState(0);
  const songs = [
    {...}
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
      </div>
      <div className="w-full bg-light flex justify-center gap-3">
        <button onClick={handlePrev}><MdNavigateBefore size={20}/></button>
        <button onClick={handleClick}>{playing ? <MdPause size={20}/> : <MdPlayArrow size={20}/>}</button>
        <button onClick={handleNext}><MdNavigateNext size={20}/></button>
      </div>
    </div>
  );
}
```

The code isnt too complicated, just an array of objects with the songID state controlling the current song, with the <audio> element playing the music. 

## Boxing gloves

The boxing gloves were done by simply changing the curor style upon clicking the glove, which I kept track of using a state variable. I found the gloves ***[here](https://sweezy-cursors.com/cursor/red-boxing-gloves-animated/)***.

```
<div className={clsx(" flex justify-center items-center gap-[5%] p-2",
{"cursor-[url(/Gloves.cur),_pointer]" : hits==0})}> //hits is set to 0 upon clicking the glove
```

clsx was very useful for changing the styles based on conditions

## Others

The font I used is ***[Kirang Haerang](https://fonts.google.com/specimen/Kirang+Haerang)***, the colour scheme was found ***[here](https://colorhunt.co/palette/f1ba88e9f5be81e7af03a791)*** and all other images were taken by me. Also shout out my good friend chatgpt for helping me with debugging.



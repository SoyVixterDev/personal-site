import { useState, useEffect, useRef} from 'react';

import { Vector2 } from '../structures/MathStructures.tsx';

import VirtualDesk from './VirtualDesk.tsx'
import Wallpaper from './Wallpaper.tsx'
import Taskbar from './Taskbar.tsx'
import Window from './Window.tsx'


import DefaultWallpaper from '../assets/defaultWallpaper.png';

const App = () =>
{
  const [size, setSize] = useState<Vector2>();

  const resizeHandler = () =>
  {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setSize(
        {
          x: width,
          y: height  
        }
      );
  }

  useEffect(() =>
  {
    window.addEventListener('resize', resizeHandler);

    return () => 
    {
      window.removeEventListener('resize', resizeHandler);
    }
  }, []);

  const reactiveOrientation: string = (size && (size?.y > size?.x) ? "portrait" : "landscape");  
  
  const containerRef = useRef<HTMLDivElement>(null);
  const virtualDeskRef = useRef<HTMLDivElement>(null);

  return (
    <div className="container" ref={containerRef}>
      <VirtualDesk virtualDeskRef={virtualDeskRef} reactiveOrientation={reactiveOrientation}>
        <Wallpaper />
        <Window containerRef={containerRef} virtualDeskRef={virtualDeskRef} icon={DefaultWallpaper} title="Test 2" initialPosition={{x: 600, y: 100}} initialSize={{x: 35, y:45}}></Window>
        <Window containerRef={containerRef} virtualDeskRef={virtualDeskRef} icon={DefaultWallpaper} title="Test 1" initialPosition={{x: 100, y: 100}} initialSize={{x: 35, y:45}}></Window>
        <Taskbar></Taskbar>
      </VirtualDesk>
    </div>
  )
}

export default App;

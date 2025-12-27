import { useState, useEffect, useRef} from 'react';

import { Vector2 } from './structures/MathStructures.tsx';

import VirtualDesk from './VirtualDesk.tsx'
import Wallpaper from './Wallpaper.tsx'
import Taskbar from './Taskbar.tsx'
import Window from './Window.tsx'


import DefaultWallpaper from './assets/defaultWallpaper.png';

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

  return (
    <VirtualDesk ref={containerRef} reactiveOrientation={reactiveOrientation}>
      <Wallpaper />

      <Window containerRef={containerRef} icon={DefaultWallpaper} title="Test" initialPosition={{x: 300, y: 300}} initialSize={{x: 400, y:400}}></Window>

      <Taskbar></Taskbar>
    </VirtualDesk>
  )
}

export default App;

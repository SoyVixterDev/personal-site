import { useState, useEffect} from 'react';

import VirtualDesk from './VirtualDesk.tsx'
import Wallpaper from './Wallpaper.tsx'
import Taskbar from './Taskbar.tsx'
import Window from './Window.tsx'

import DefaultWallpaper from './assets/defaultWallpaper.png';

interface Size
{
  width: number;
  height: number;
}

const App = () =>
{
  const [size, setSize] = useState<Size>();

  const resizeHandler = () =>
  {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setSize(
        {
          width: width,
          height: height
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

  const reactiveOrientation: string = (size && (size?.height > size?.width) ? "portrait" : "landscape");  
  
  return (
    <VirtualDesk reactiveOrientation={reactiveOrientation}>
      <Wallpaper />

      <Window icon={DefaultWallpaper} title="Test" pos={[25, 25]} size={[400, 400]}></Window>

      <Taskbar></Taskbar>
    </VirtualDesk>
  )
}

export default App;

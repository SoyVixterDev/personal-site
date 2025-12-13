import { useState, useEffect} from 'react';

import VirtualDesk from './VirtualDesk.tsx'
import Wallpaper from './Wallpaper.tsx'
import Taskbar from './Taskbar.tsx'

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
      <Taskbar></Taskbar>
    </VirtualDesk>
  )
}

export default App

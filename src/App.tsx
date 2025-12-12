import Wallpaper from './Wallpaper.tsx'
import VirtualDesk from './VirtualDesk.tsx'
import { useState, useEffect} from 'react';

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
    </VirtualDesk>
  )
}

export default App

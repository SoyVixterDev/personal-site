import { useState, useEffect, useRef, ReactNode} from 'react';

import { Vector2 } from './structures/MathStructures.tsx';
import { Dictionary } from './structures/CollectionStructures.tsx';

import VirtualDesk from './desktop-environment/VirtualDesk.tsx'
import Wallpaper from './desktop-environment/Wallpaper.tsx'
import Taskbar from './desktop-environment/Taskbar.tsx'
import Window from './desktop-environment/Window.tsx'

import DefaultWallpaper from './assets/defaultWallpaper.png';

const windowDict: Map<string, ReactNode> = new Map();

function CreateWindow(name: string, pos: Vector2, size: Vector2 /* Add Content and Icon Here */)
{
  windowDict.set(name, <Window icon={DefaultWallpaper} title={name} initialPosition={pos} initialSize={size} order={windowDict.size}></Window>);
}

function SelectWindow(name: string)
{
  return windowDict.get(name);
}

function CloseWindow(name: string)
{
  windowDict.delete(name);
}

let initialized = false;
function Init()
{
  if(initialized) return;

  initialized = true;

  windowDict.clear();
  for(let i = 0; i < 20; i++)
  {
      CreateWindow(`Test ${i}`, {x: i*2.5, y:i*2.5}, {x:32, y:18});
  }
}


const App = () =>
{
  Init();
  
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

  return (
    <div className="container">
      <VirtualDesk reactiveOrientation={reactiveOrientation}>
        <Wallpaper />
        { windowDict.values() }
        <Taskbar>
        </Taskbar>
      </VirtualDesk>
    </div>
  )
}

export { CloseWindow, SelectWindow, CreateWindow };
export default App;

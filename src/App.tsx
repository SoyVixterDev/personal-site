import React, { useState, useEffect, useRef, ReactNode} from 'react';

import { Vector2 } from './structures/MathStructures.tsx';
import { Dictionary } from './structures/CollectionStructures.tsx';

import VirtualDesk from './desktop-environment/VirtualDesk.tsx'
import Wallpaper from './desktop-environment/Wallpaper.tsx'
import Taskbar from './desktop-environment/Taskbar.tsx'
import Window from './desktop-environment/Window.tsx'
import TaskbarElement from './desktop-environment/TaskbarElement.tsx';

import DefaultWallpaper from './assets/defaultWallpaper.png';
import Terminal from './terminal-app/Terminal.tsx';


const activeDict: Map<string, WindowData> = new Map();
let topZIndex: number = 0;

/**
 * Stored data for windows
 */
interface WindowData
{
  title: string,
  icon: string,

  pos: Vector2,
  size: Vector2,
  zIndex: number,

  taskbarIconPos: Vector2,
  
  isMinimized: boolean,
  isMaximized: boolean,
  
  content: any
}
/**
 * Gets window rendering fromm saved data
 * @param data 
 * @returns 
 */
function WindowFromData(data: WindowData)
{
  return <Window
      title={data.title}
      icon={data.icon}
      position={data.pos}
      size={data.size}
      zIndex={data.zIndex}
      taskbarIconPos={data.taskbarIconPos}
      isMinimized={data.isMinimized}
      isMaximized={data.isMaximized}
    >{data.content}</Window>
  
}
/**
 * Gets a taskbar element from saved data
 * @param data 
 * @returns 
 */
function TaskbarElementFromData(data: WindowData)
{
  return(
    <TaskbarElement
      title={data.title}
      icon={data.icon}
    />
  )
}
/**
 * Tries to create a new window, or brings one into focus if the window already exists
 * @param name 
 * @param pos 
 * @param size 
 */
function CreateOrFocusWindow(name: string, icon: string, pos: Vector2, size: Vector2, content: any)
{
  if(activeDict.has(name))
  {
    FocusWindow(name);
    return;
  }

  const window: WindowData = {title: name, icon: icon, pos: pos, size: size, taskbarIconPos: {x: 2 + activeDict.size * 4, y: 2}, zIndex: ++topZIndex, isMinimized: false, isMaximized: false, content: content}

  activeDict.set(name, window);

  ForceUpdate();
}
/**
 * Brings a window into focus in the foreground. Unminimizes if required.
 * @param name 
 * @returns 
 */
function FocusWindow(name: string)
{
  const window = activeDict.get(name);
  if(window == null)
      return; 

  window.isMinimized = false;

  window.zIndex = ++topZIndex;

  ForceUpdate();
}
/**
 * Either focuses a window and unminimizes it or minimizes it if itś already in focus
 * @param name 
 */
function FocusOrMinimizeWindow(name: string)
{
  const window = activeDict.get(name);

  if(window == null)
      return;

  if(window.zIndex == topZIndex)
    ToggleMinimizeWindow(name);
  else
    FocusWindow(name);
}
/**
 * Toggles minimized state for a specific window
 * @param name 
 * @returns 
 */
function ToggleMinimizeWindow(name: string)
{
  const window = activeDict.get(name);

  if(window == null)
      return;

  window.isMinimized = !window.isMinimized;

  ForceUpdate();
}
/**
 * Toggles maximized state for a specific window
 * @param name 
 * @returns 
 */
function ToggleMaximizeWindow(name: string)
{
  const window = activeDict.get(name);

  if(window == null)
      return;

  window.isMaximized = !window.isMaximized;

  ForceUpdate();
}
/**
 * Closes a window process completely
 * @param name 
 */
function CloseWindow(name: string)
{
  activeDict.delete(name);

  ForceUpdate();
}
/**
 * Subscription to force a render update in the app
 */
export let ForceUpdate: () => void = () =>
{
  console.warn("Update forced before initialization!");
};


let initialized = false;
function Init()
{
  if(initialized) return;

  initialized = true;

  activeDict.clear();
  CreateOrFocusWindow("Terminal", DefaultWallpaper, {x: 25, y: 20}, {x: 40, y: 25}, <Terminal/>);
}

const App = () =>
{
  Init();
  
  const [size, setSize] = useState<Vector2>();
  const [, setTick] = useState(0);

  ForceUpdate = () => setTick(tick => tick + 1);

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
            {Array.from(activeDict.entries()).map(([id, windowData]) => (
            <React.Fragment key={id}>
                {WindowFromData(windowData)}
            </React.Fragment>
            ))}
        <Taskbar>
            {Array.from(activeDict.entries()).map(([id, windowData]) => (
            <React.Fragment key={id}>
                {TaskbarElementFromData(windowData)}
            </React.Fragment>
            ))}
        </Taskbar>
      </VirtualDesk>
    </div>
  )
}

export { CloseWindow, FocusWindow, FocusOrMinimizeWindow, CreateOrFocusWindow, ToggleMinimizeWindow, ToggleMaximizeWindow };
export default App;

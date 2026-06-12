import './css/Window.css';
import './css/Desktop.css';
import { RefObject, useEffect, useRef } from 'react';
import { CloseWindow } from '../App';

interface WindowDecoratorProps
{
    ref: RefObject<HTMLDivElement | null>;
    title: string;
    icon?: string;
}

const WindowDecorator = ({ref, title, icon}: WindowDecoratorProps) =>
{
    const closeRef = useRef<HTMLButtonElement>(null);
    const maximizeRef = useRef<HTMLButtonElement>(null);
    const minimizeRef = useRef<HTMLButtonElement>(null);

    useEffect(() =>
    {
        if(closeRef.current == null || maximizeRef.current == null || minimizeRef.current == null)
            return;

        const closeButton = closeRef.current;
        const maximizeButton = maximizeRef.current;
        const minimizeButton = minimizeRef.current;

        const handleClose = (e: MouseEvent) =>
        {
            e.stopPropagation();
            CloseWindow(title);
            console.log("Close");
        }
        const handleMaximize = (e: MouseEvent) =>
        {
            e.stopPropagation();
            console.log("Maximize");
        }
        const handleMinimize = (e: MouseEvent) =>
        {
            e.stopPropagation();
            console.log("Minimize");
        }
        
        closeButton.addEventListener('mousedown', handleClose);
        maximizeButton.addEventListener('mousedown', handleMaximize);
        minimizeButton.addEventListener('mousedown', handleMinimize);
        
        const cleanup = () =>
        {
            closeButton.removeEventListener('mousedown', handleClose);
            maximizeButton.removeEventListener('mousedown', handleMaximize);
            minimizeButton.removeEventListener('mousedown', handleMinimize);
        };

        return cleanup;
    });


    return  <div>
    <div ref={ref} className="window-decorator">
        <img className='window-decorator_icon' src={icon}/>
        <p className='window-decorator_title'>{title}</p>
        <div className="window-decorator_buttons">
            <button className="window-decorator-button" ref={closeRef} >🞮</button>
            <button className="window-decorator-button" ref={maximizeRef}>🞓</button>
            <button className="window-decorator-button" ref={minimizeRef}>-</button>
        </div>
    </div>

    </div>;   
}

export default WindowDecorator;
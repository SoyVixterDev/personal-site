import React, { Ref, RefObject, useEffect, useRef} from 'react'

import { Vector2 } from '../structures/MathStructures.tsx'

import WindowDecorator from './WindowDecorator.tsx'
import { SelectWindow } from '../App.tsx';


function clamp(val: number, min: number, max: number)
{
    return Math.min(Math.max(val, min), max);
}


interface WindowProps
{
    children?: any,
    title: string,
    icon?: string,
    initialPosition: Vector2,
    initialSize: Vector2,
    order: number
}

const Window = ({children, title, icon, initialPosition = {x: 0, y: 0}, initialSize = {x: 20, y: 20}, order = 0}: WindowProps) =>
{
    const windowRef = useRef<HTMLDivElement>(null);
    const decoratorRef = useRef<HTMLDivElement>(null);

    const isClicked = useRef<boolean>(false);

    const mouseInitialPos = useRef<Vector2>({x:0, y:0});
    const windowLastPos = useRef<Vector2>(initialPosition)

    useEffect(() =>
    {
        if(decoratorRef.current == null || windowRef.current == null)
            return;

        const thisWindow = windowRef.current;
        const decorator = decoratorRef.current;

        const onFocus = (e: MouseEvent) =>
        {
            SelectWindow(title);
        }
        
        const onMouseDown = (e: MouseEvent) =>
        {
            isClicked.current = true;

            const xVW = (e.clientX / window.innerWidth) * 100;
            const yVW = (e.clientY / window.innerWidth) * 100;

            mouseInitialPos.current = {
                x: xVW,
                y: yVW
            }
        };
        const onMouseUp = (e: MouseEvent) =>
        {
            if(isClicked.current == false)
                return;
            
            isClicked.current = false;

            const xVW = (thisWindow.offsetLeft / window.innerWidth) * 100;
            const yVW = (thisWindow.offsetTop / window.innerWidth) * 100;

            windowLastPos.current = {
                x: xVW,
                y: yVW
            }
        };
        const onMouseMove = (e: MouseEvent) =>
        {
            if(!isClicked.current) 
                return;

            const xVW = (e.clientX / window.innerWidth) * 100;
            const yVW = (e.clientY / window.innerWidth) * 100;

            const x = clamp(xVW- mouseInitialPos.current.x + windowLastPos.current.x, 0, 100 - initialSize.x);
            const y = yVW - mouseInitialPos.current.y + windowLastPos.current.y;

            thisWindow.style.left = `${x}vw`;
            thisWindow.style.top = `${y}vw`;
        };

        thisWindow.addEventListener(`mousedown`, onFocus);

        decorator.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mousemove', onMouseMove);
        
        const cleanup = () =>
        {
            thisWindow.removeEventListener(`mousedown`, onFocus);

            decorator.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mousemove', onMouseMove);
        };

        return cleanup;
    }, []);


    return (
    <div className='window' ref={windowRef} style={{position: 'absolute', left: initialPosition.x  + "vw", top: initialPosition.y + "vw", width: initialSize.x + "vw", height: initialSize.y + "vw"}}>
        <WindowDecorator ref={decoratorRef} title={title} icon={icon}></WindowDecorator>
        <div className='window-content'>{children}</div>
    </div>);
}

export default Window;
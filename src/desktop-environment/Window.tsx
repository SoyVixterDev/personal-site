import React, { Ref, RefObject, useEffect, useRef, useState} from 'react'

import { Vector2 } from '../structures/MathStructures.tsx'

import WindowDecorator from './WindowDecorator.tsx'
import { FocusWindow } from '../App.tsx';


function clamp(val: number, min: number, max: number)
{
    return Math.min(Math.max(val, min), max);
}

interface WindowProps
{
    children?: any,
    title: string,
    icon: string,

    position: Vector2,
    size: Vector2,
    zIndex: number,

    taskbarIconPos: Vector2,

    isMinimized: boolean,
    isMaximized: boolean
}

const Window = ({children, title, icon, position: position = {x: 0, y: 0}, size: size = {x: 20, y: 20}, zIndex: zIndex, taskbarIconPos: taskbarIconPos, isMinimized: isMinimized, isMaximized: isMaximized}: WindowProps) =>
{
    const windowRef = useRef<HTMLDivElement>(null);
    const decoratorRef = useRef<HTMLDivElement>(null);

    const isClicked = useRef<boolean>(false);

    const mouseInitialPos = useRef<Vector2>({x:0, y:0});
    const windowLastPos = useRef<Vector2>(position)

    useEffect(() =>
    {
        if(decoratorRef.current == null || windowRef.current == null)
            return;

        const thisWindow = windowRef.current;
        const decorator = decoratorRef.current;

        const onFocus = (e: MouseEvent) =>
        {
            FocusWindow(title);
        }

        const onMouseDown = (e: MouseEvent) =>
        {
            if(isMaximized)
                return;
            
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
            if(!isClicked.current || isMaximized) 
                return;

            const xVW = (e.clientX / window.innerWidth) * 100;
            const yVW = (e.clientY / window.innerWidth) * 100;

            const x = clamp(xVW- mouseInitialPos.current.x + windowLastPos.current.x, 0, 100 - size.x);
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
    }, [isMaximized]);

    const styleMaximized: React.CSSProperties = 
    {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 100 + 'vw',
        height: 100 + 'vh',
        transformOrigin: 'center',
        opacity: 1,
        zIndex: 999999
    }
    const styleNormal: React.CSSProperties = 
    {
        position: 'absolute',
        left: windowLastPos.current.x + 'vw',
        top: windowLastPos.current.y + 'vw',
        width: size.x + 'vw',
        height: size.y + 'vw',
        opacity: 1,
        zIndex: zIndex
    }
    const styleMinimized: React.CSSProperties = 
    {
        position: 'absolute',
        left: windowLastPos.current.x + size.x/2 + 'vw',
        top: windowLastPos.current.y + size.y/2 + 'vw',
        width: 0,
        height: 0,
        opacity: 0,
        zIndex: zIndex,
        pointerEvents: 'none'
    }

    const style = isMinimized ? styleMinimized : (isMaximized ? styleMaximized : styleNormal);

    return (
    <div className={`window ${isClicked.current ? 'dragging' : ''}`}ref={windowRef} style={style}>
        <WindowDecorator ref={decoratorRef} title={title} icon={icon}></WindowDecorator>
        <div className='window-content'>{children}</div>
    </div>);
}

export { WindowProps }
export default Window;
import React, { Ref, RefObject, useEffect, useRef} from 'react'

import { Vector2 } from '../structures/MathStructures.tsx'

import WindowDecorator from './WindowDecorator.tsx'

function clamp(val: number, min: number, max: number)
{
    return Math.min(Math.max(val, min), max);
}


interface WindowProps
{
    children?: any,
    containerRef: RefObject<HTMLDivElement | null>,
    virtualDeskRef: RefObject<HTMLDivElement | null>,
    title: string,
    icon?: string,
    initialPosition: Vector2,
    initialSize: Vector2
}

const Window = ({children, containerRef, virtualDeskRef, title, icon, initialPosition = {x: 0, y: 0}, initialSize = {x: 45, y: 45}}: WindowProps) =>
{
    const windowRef = useRef<HTMLDivElement>(null);
    const decoratorRef = useRef<HTMLDivElement>(null);

    const isClicked = useRef<boolean>(false);

    const mouseInitialPos = useRef<Vector2>({x:0, y:0});
    const windowLastPos = useRef<Vector2>(initialPosition)

    useEffect(() =>
    {
        if(decoratorRef.current == null || windowRef.current == null || containerRef.current == null || virtualDeskRef.current == null)
            return;

        const window = windowRef.current;
        const container = containerRef.current;
        const virtualDesk = virtualDeskRef.current;
        const decorator = decoratorRef.current;

        const onMouseDown = (e: MouseEvent) =>
        {
            isClicked.current = true;
            mouseInitialPos.current = {
                x: e.clientX,
                y: e.clientY
            }
        };
        const onMouseUp = (e: MouseEvent) =>
        {
            if(isClicked.current == false)
                return;
            
            isClicked.current = false;
            windowLastPos.current = {
                x: window.offsetLeft,
                y: window.offsetTop
            }
        };
        const onMouseMove = (e: MouseEvent) =>
        {
            if(!isClicked.current) 
                return;

            const x = clamp(e.clientX - mouseInitialPos.current.x + windowLastPos.current.x, 0, virtualDesk.clientWidth - window.clientWidth + 1);
            const y = clamp(e.clientY - mouseInitialPos.current.y + windowLastPos.current.y, 0, virtualDesk.clientHeight - window.clientHeight + 1);

            window.style.left = `${x}px`;
            window.style.top = `${y}px`;
            
            // This is an example for how to change the Z-Ordering of components, should find a way to use an order system from outside within a "Window Manager"
            window.style.zIndex = `${y}`;
        };

        decorator.addEventListener('mousedown', onMouseDown);
        container.addEventListener('mouseup', onMouseUp);
        container.addEventListener('mousemove', onMouseMove);
        
        const cleanup = () =>
        {
            decorator.removeEventListener('mousedown', onMouseDown);
            container.removeEventListener('mouseup', onMouseUp);
            container.removeEventListener('mousemove', onMouseMove);
        };

        return cleanup;
    });


    return <div className='window' ref={windowRef} style={{position: 'absolute', left: initialPosition.x, top: initialPosition.y, width: `${initialSize.x}%`, height: `${initialSize.y}%`}}>
        <WindowDecorator ref={decoratorRef} title={title} icon={icon}></WindowDecorator>
        <div className='window-content'>{children}</div>
    </div>
}

export default Window;
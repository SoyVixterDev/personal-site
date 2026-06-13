import { useEffect, useRef } from 'react';
import './css/Desktop.css';
import { FocusOrMinimizeWindow } from '../App';

interface TaskbarElementProps
{
    title: string,
    icon: any,
}

const TaskbarElement = ({title, icon}:TaskbarElementProps) =>
{
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() =>
    {
        if(buttonRef.current == null)
            return;

        const button = buttonRef.current;

        const onClick = (e: MouseEvent) =>
        {
            FocusOrMinimizeWindow(title);
        }

        button.addEventListener('mousedown', onClick);
        
        const cleanup = () =>
        {
            button.removeEventListener('mousedown', onClick);
        };

        return cleanup;
    }, []);

    return(
        <button className='taskbar-element' ref={buttonRef}>
            icon
        </button>
    )
}

export default TaskbarElement
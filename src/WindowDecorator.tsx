import './Window.css';
import './Desktop.css';
import { RefObject } from 'react';

interface WindowDecoratorProps
{
    ref: RefObject<HTMLDivElement | null>;
    title: string;
    icon?: string;
}

const WindowDecorator = ({ref, title, icon}: WindowDecoratorProps) =>
{
    return <div ref={ref} className="window-decorator">
        <img className='window-decorator_icon' src={icon}/>
        <p className='window-decorator_title'>{title}</p>
        <div className="window-decorator_buttons">
            {/* Buttons for close, minimize and maximuze here!!! */}
        </div>
    </div>;   
}

export default WindowDecorator;
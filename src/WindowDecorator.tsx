import './Window.css';
import './Desktop.css';

interface WindowDecoratorProps
{
    title: string,
    icon?: string
}

const WindowDecorator = ({title, icon}: WindowDecoratorProps) =>
{
    return <div className="window-decorator">
        <img className='window-decorator_icon' src={icon}/>
        <p className='window-decorator_title'>{title}</p>
        <div className="window-decorator_buttons">
            {/* Buttons for close, minimize and maximuze here!!! */}
        </div>
    </div>;   
}

export default WindowDecorator;
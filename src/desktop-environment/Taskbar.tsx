import './css/Desktop.css';
import DefaultTaskbar from '../assets/defaultTaskbar.png';

interface TaskbarProps
{
    children?: any,
}

const Taskbar = ({ children }: TaskbarProps) =>
{
    return(
        <div className='taskbar'>
            { children }
        </div>
    )
}

export default Taskbar
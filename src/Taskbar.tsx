import './Desktop.css';
import DefaultTaskbar from './assets/defaultTaskbar.png';

interface TaskbarProps
{
    children?: any,
}

const Taskbar = ({ children }: TaskbarProps) =>
{
    return(
        <div className='taskbar'>
            <img className='element-background' src={DefaultTaskbar}></img>
        </div>
    )
}

export default Taskbar
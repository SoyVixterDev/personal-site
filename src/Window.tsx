
import WindowDecorator from './WindowDecorator.tsx'

interface WindowProps
{
    children?: any,
    title: string,
    icon?: string,
    pos: [x: number, y: number],
    size: [x: number, y: number]
}

const Window = ({children, title, icon, pos = [0, 0], size = [100, 100]}: WindowProps) =>
{
    return <div className='window' style={{position: 'absolute', left: pos[0], top: pos[1], width: size[0], height: size[1]}}>
        <WindowDecorator title={title} icon={icon}></WindowDecorator>
        <div className='window-content'>{children}</div>
    </div>
}

export default Window;
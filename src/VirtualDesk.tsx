import { JSX, ReactNode, Ref } from "react";
import "./Desktop.css"

interface VirtualDeskProps
{
    children?: any;
    /** The current orientation of the screen */
    reactiveOrientation: string;
}

const VirtualDesk = ( {children, reactiveOrientation}:VirtualDeskProps) =>
{
    return(
        
        <div className={ "virtual-desk " + reactiveOrientation}>
            {children} 
        </div>
    );
}

export default VirtualDesk

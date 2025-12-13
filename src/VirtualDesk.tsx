import { JSX, ReactNode } from "react";
import "./Desktop.css"

interface VirtualDeskProps
{
    children?: any;
    /** The current orientation of the screen */
    reactiveOrientation: string;
}

const VirtualDesk = ( {children, reactiveOrientation}:VirtualDeskProps) =>
{
    //console.log(reactiveOrientation)
    return(
        
        <div className={ "virtual-desk " + reactiveOrientation}>
            {children} 
        </div>
    );
}

export default VirtualDesk

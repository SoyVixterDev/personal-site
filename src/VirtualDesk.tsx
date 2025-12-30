import { RefObject } from "react";
import "./Desktop.css"

interface VirtualDeskProps
{
    virtualDeskRef: RefObject<HTMLDivElement | null>;
    children?: any;
    /** The current orientation of the screen */
    reactiveOrientation: string;
}

const VirtualDesk = ( {children, virtualDeskRef, reactiveOrientation}:VirtualDeskProps) =>
{
    return(
        
        <div ref={virtualDeskRef} className={ "virtual-desk " + reactiveOrientation}>
            {children} 
        </div>
    );
}

export default VirtualDesk

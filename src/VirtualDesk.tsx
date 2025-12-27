import { JSX, ReactNode, Ref } from "react";
import "./Desktop.css"

interface VirtualDeskProps
{
    children?: any;
    ref: Ref<HTMLDivElement>;
    /** The current orientation of the screen */
    reactiveOrientation: string;
}

const VirtualDesk = ( {children, ref, reactiveOrientation}:VirtualDeskProps) =>
{
    return(
        
        <div ref={ref} className={ "virtual-desk " + reactiveOrientation}>
            {children} 
        </div>
    );
}

export default VirtualDesk

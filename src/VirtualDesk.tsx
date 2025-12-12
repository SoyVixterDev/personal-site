import "./VirtualDesk.css"

interface VirtualDeskProps
{
    /** The current orientation of the screen */
    reactiveOrientation: string;
}

const VirtualDesk = ( { reactiveOrientation }: VirtualDeskProps ) =>
{
    console.log(reactiveOrientation)
    return(
        
        <div className={ "virtual-desk " + reactiveOrientation }>
            { reactiveOrientation }
        </div>
    );
}

export default VirtualDesk

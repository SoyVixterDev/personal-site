import { CreateOrFocusWindow } from "../App";
import { PrintLine, Clear } from "./Terminal";
/**
 * Prints the text given as params
 * @param params 
 */
function Print(params: string[])
{
    PrintLine(params.join(" "));
    PrintLine('\n');
}
/**
 * Launches an app by name
 * @param params 
 */
function LaunchApp(params: string[])
{
    //TODO
}
/**
 * Tries to reboot if isSudo is valid
 */
function TryReboot(isSudo: boolean)
{
    if(isSudo)
        window.location.href = window.location.href;
    else
        PrintLine("You can't run this command unless you are root!")
}
/**
 * Prints help information
 * @param params 
 * @returns 
 */
function PrintHelp(params: string[])
{
    if(params.length != 0)
    {
        PrintLine("Command \`help\` doesn't have any parameters!");
        return;
    }

    const help = 
    [
        "-------------HELP-------------",
        "help - displays this command list",
        "clear - clears terminal output",
        "exit - exits the terminal",
        "launch {appname} - launches an app with the specified name",
        
        "...?",
        "------------------------------"
    ];

    for(let i = 0; i < help.length; i++)
    {
        PrintLine(help[i]);
    }
}
export { LaunchApp, Print, TryReboot, PrintHelp };
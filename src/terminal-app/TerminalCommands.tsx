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
 * Opens a link in a new tab
 * @param link 
 */
function OpenLink(link: string, focus: boolean = true)
{
    const tab = window.open(link, '_blank');;
    
    PrintLine("Opened site on a new tab!"); 

    if(tab != null && focus)
        tab.focus();
}
/**
 * Prints help information
 * @param params 
 * @returns 
 */
function PrintHelp(params: string[])
{
    if(params.length > 1)
    {
        PrintLine("Command \`help\` must have one parameter!");
        return;
    }
    let help;

    help = 
    [
        "-------------HELP-------------",
        "help {normal | projects | games} - displays command lists",
        "clear - clears terminal output",
        "exit - exits the terminal",
        "launch {appname} - launches an app with the specified name",
        "hash {input} - prints a hash of the input string",
        "ip - prints an ip address, not very useful",
        "...?",
        "------------------------------"
    ];
    if(params.length == 1)
    {
        switch(params[0])
        {
            case 'normal':
                break;
            case 'projects':
                help =
                [
                    "-------HELP - PROJECTS-------",
                    "openugc - opens the OpenUGC main site",
                    "jgame - opens the JGame Engine git repository",
                    "-----------------------------"
                ];
                break;
            case 'games':
                help =
                [
                    "---------HELP - GAMES---------",
                    "divemensions - opens the Divemensions Steam Page",
                    "unnatural - opens the Unnatural itch Page",
                    "paramnesia - opens the Paramnesia itch Page",
                    "fruitemup - opens the Fruit 'Em Up itch Page",
                    "souprush - opens the Soup Rush itch Page",
                    "unfinishedbusiness - opens the Unfinished Business itch Page",
                    "------------------------------"
                ];
                break;
            default:
                PrintLine(`${params[0]} isn't a valid help section!`)
                return;
        }
    }

    for(let i = 0; i < help.length; i++)
    {
        PrintLine(help[i]);
    }
}
export { LaunchApp, Print, TryReboot, PrintHelp, OpenLink };
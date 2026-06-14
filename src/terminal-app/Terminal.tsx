import './terminal.css'
import '../index.css'
import { ReactNode, useEffect, useRef, useState, KeyboardEvent } from 'react';
import { CloseWindow } from '../App';

import { LaunchApp, Print, PrintHelp, TryReboot } from './TerminalCommands.tsx'

const history: ReactNode[] = [];

const memory: string[] = [];
let memoryIndex: number = 0;

const prompt: string = 'user > ';
/**
 * Hashes string for no particular reason
 * @param string 
 * @returns 
 */
function hash(string: string)
{   
    let hash = 46270
    for(let i = 0; i < string.length; i++)
    {
        hash = ((hash << 4) + hash) + string.charCodeAt(i);
    }
    return hash;
}

function clamp(val: number, min: number, max: number)
{
    return Math.min(Math.max(val, min), max);
}

/**
 * List of commands that can be executed
 */
const commands: Map<number, (params: string[], isSudo: boolean) => void> = new Map([ 
    [ 13373981, () => { PrintLine("Sadly, this is only a website OS, no file system!") }],
    [ 1281934229, () => { PrintLine("Sadly, this is only a website OS, no file system!") }],
    [ 13374077, () => { PrintLine("Sadly, this is only a website OS, no file system!") }],
    [ 13373825, () => { PrintLine("Sadly, this is only a website OS, no file system!") }],
    [ 13374001, () => { PrintLine("Sadly, this is only a website OS, no file system!") }],
    [ 13373813, () => { PrintLine("Sadly, this is only a website OS, no file system!") }],
    [ -429908537, (params: string[]) => { PrintHelp(params) }],
    [ 1281104085, () => { Clear() }],
    [ 1282220715, (params: string[]) => { Print(params) }],
    [ -429917832, () => { CloseWindow('Terminal') }],
    [ 315875161, (params: string[]) => { LaunchApp(params) }],
    [ 227355553, () => { PrintLine("There are no eggs") }],
    [ 308767828, () => { CloseWindow('Terminal') }],
    [ -429909582, (params: string[]) => { PrintLine(hash(params.join(' ')).toString()) }],
    [ 324635545, (params: string[], isSudo: boolean) => { TryReboot(isSudo) }],
    [ 1167289951, () => { PrintLine("Opened OpenUGC site on a new tab!"); window.open('https://paulowgdev.github.io/OpenUGC/', '_blank')?.focus(); }],
    [ 13373927, () => PrintLine('127.0.0.1')]
]);

/**
 * Clears the terminal history
 */
function Clear()
{
    history.length = 0;
}
/**
 * Prints text to the terminal
 * @param text 
 */
function PrintLine(text: string)
{
    history.push(<div className='terminal-out'>{text}</div>);
}
/**
 * Handles receiving user input
 * @param input 
 */
function ReceiveInput(input: string)
{
    PrintLine(prompt + input);
    
    const inputSplit = input.split(' ');
    
    const isSudo = inputSplit[0] == 'sudo';
    const command = isSudo ? inputSplit[1] : inputSplit[0];
    const params = inputSplit.slice(isSudo ? 2 : 1);

    const exec = commands.get(hash(command));

    if(exec == null)
    {
        PrintLine(`\`${command}\` isn't a valid or recognized command!`)
        return;
    }

    exec(params, isSudo);
}


let initialized = false;
function Init()
{
    if(initialized)
        return;
    initialized = true;

    PrintLine('Welcome to VixOS!');
    PrintLine('----------------');
}

const Terminal = () =>
{
    Init();

    const [inputText, setInputText] = useState('');
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const handleClick = () =>
    {
        if(inputRef.current == null)
            return;

        inputRef.current.focus();
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) =>
    {
        switch(e.key)
        {
            case 'Enter':
                e.preventDefault();
                if(inputText == '')
                    return;
                
                memory.push(inputText);
                memoryIndex = memory.length;

                ReceiveInput(inputText);
                setInputText('');
                break;
            case 'ArrowUp':
                e.preventDefault();

                memoryIndex = clamp(memoryIndex - 1, 0, memory.length - 1);
                setInputText(memory[memoryIndex]);

                if(inputRef.current)
                    inputRef.current.selectionStart = inputRef.current.selectionEnd = memory[memoryIndex].length;
                break;
            case 'ArrowDown':
                e.preventDefault();

                memoryIndex = clamp(memoryIndex + 1, 0, memory.length - 1);
                setInputText(memory[memoryIndex])
                
                if(inputRef.current)
                    inputRef.current.selectionStart = inputRef.current.selectionEnd = memory[memoryIndex].length;
                break;
        }
    }

    return(
        <div className='terminal'>
            {Array.from(history)}
            <div className='terminal-input-line' onClick={handleClick}>
            <span className='terminal-prompt'>{prompt}</span>
            <textarea 
                className='terminal-in' 
                ref={inputRef} 
                value={inputText} 
                onChange={(e) => setInputText(e.target.value)} 
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoCorrect="off"
                autoCapitalize="off"
                autoComplete="off"/>
            </div>
        </div>
    );
}

export { Clear, PrintLine }
export default Terminal;
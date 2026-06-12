/**
 * Interface for dictionary
 */
interface Dictionary<T>
{
    [key: string]: number | T;

    length: number
}

export { Dictionary }
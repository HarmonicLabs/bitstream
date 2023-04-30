export function isBinary( str: string ): boolean
{
    if( typeof str !== "string" ) return false;
    
    for( let i = 0; i < str.length; i++)
    {
        const ch = str[i];
        if(!(ch === "0" || ch === "1")) return false;
    }

    return true;
}
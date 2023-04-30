export function removeSpaces( str: string ): string
{
    if(!(typeof str === "string")) return str;
    return str.trim().split(" ").join("");
}
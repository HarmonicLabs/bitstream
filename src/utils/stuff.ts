import { assert } from "./assert";

/**
 * @deprecated not sure it has ever made sense to have it
 * @returns a number in range ```[ 0 , 255 ]``` ( ```[ 0b0000_0000, 0b1111_1111 ]``` ) based on the first byte
 */
export function getFirstByte( bits: bigint ): number
{
    return Number( `0x${bits.toString(16).slice(0,2)}` );
}

/**
 * @deprecated use ```andMaskOfLength``` instead
 */
export function andMaskOfLengthInt( n: number ): bigint
{
    n = Math.round( Math.abs( n ) );

    // operatons used are valid on singed number
    if( n >= 30 )
    {
        return andMaskOfLength( BigInt( n ) );
    }

    return BigInt( ( 1 << n ) - 1 );
}

/**
 * returns a ```bigint``` of that as the last ```n``` bits setted to ones;
 * 
 * example
 * ```ts
 * getMaskOfLength( 7 ) === Bigint( 0b0111_1111 ); // true
 * ```
 */
export function andMaskOfLength( n: bigint ): bigint
{
    return BigInt( 
        (
            BigInt( 1 ) 
            << n
        ) 
        - BigInt( 1 )
    );
}

/**
 * @deprecated use ```getNLastBits``` instead
 */
export function getNLastBitsInt( fromNuber : number , nBits: number ) : number
{
    assert(
        typeof fromNuber === "number" && typeof nBits === "number",
        "can use getNLastBitsInt on number instances only"
    );
    return Number(
        BigInt( fromNuber ) 
        & 
        andMaskOfLength( BigInt( nBits ) )
    );
}

export function getNLastBits( fromNuber : bigint , nBits: bigint ) : bigint
{
    return (fromNuber & andMaskOfLength( nBits ));
}

/**
 * @returns the number of bits from the first setted to ```1``` on the left up until the end
 */
export function getNOfUsedBits( bits: bigint ): number
{
    if( bits === BigInt( 0 ) ) return 0;
    return bits.toString(2).length;
}

export function minBytesRequired( bigint: bigint ): number
{
    if( bigint < BigInt( 0 ) ) 
        throw new Error(
            "minBytesRequired works for positives integers only"
        );

    const fullByteOnes = BigInt( 0b1111_1111 );

    let mask: bigint = fullByteOnes;
    let bytesRequired: number = 1;

    while( bigint !== ( bigint & mask ))
    {
        mask = (mask << BigInt( 8 )) | fullByteOnes;
        bytesRequired++;
    }

    return bytesRequired;
}
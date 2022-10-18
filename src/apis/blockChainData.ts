export interface TransactionData {
    hash: string;
    ver: number;
    vin_sz: number;
    lock_time: string;
    size: number;
    relayed_by: string;
    block_height: number;
    tx_index: string;
    inputs: {
        prev_out: {
            hash: string;
            value: string;
            tx_index: string;
            n: string;
        },
        script: string,
        sequence: number,
    }[];
    out: {
        value: string;
        hash: string;
        script: string;
    }[],
    fee: number;
}

export interface BlockData {
    hash: string;
    ver: number;
    prev_block: string;
    mrkl_root: string;
    time: string;
    bits: string;
    n_tx: string;
    size: number;
    block_index: number;
    main_chain: boolean;
    height: number;
    received_time: number;
    relayed_by: string;
    tx: TransactionData[],
    next_block: string[]
}

const baseURL = import.meta.env.VITE_BLOCKCHAIN_API_BASE_URL


/**
 * Single Block
 * https://blockchain.info/rawblock/$block_hash
 * You can also request the block to return in binary form (Hex encoded) using ?format=hex
 * @param blockHash 
 * @returns 
 */
export const getSingleBlockData = (blockHash: string) => {
    const url = `${baseURL}/rawblock/${blockHash}`
    return fetch(url).then(res => res.json())
}

// /**
//  * Single Transaction
//  * https://blockchain.info/rawtx/$tx_hash
//  * You can also request the transaction to return in binary form (Hex encoded) using ?format=hex
//  * @param txHash 
//  * @returns
//  */
// export const getSingleTransactionData = (txHash: string) => {
   
// }


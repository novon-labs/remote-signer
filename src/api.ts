import { init, SecretKey, secretKeyToPublicKey, sign, verify } from "@chainsafe/bls";
import {hexToBytes, bytesToHex} from './utils'
import {publicToPrivate} from "./index"

export const upcheck = async(): Promise<string> =>{
    return "OK";
}
    
export const getKeys = async(): Promise<Array<Map<string, string>>> => {
    console.log("YO", publicToPrivate);
    return Array.from(publicToPrivate.keys())
}
    
export const signData = async(identifier: string, data: string): Promise <any> => {
    // let {bls_domain, data, fork, genesis_validators_root} = req.body;

    console.log("NO", publicToPrivate)
    if (identifier.startsWith("0x")) {
    identifier = identifier.slice(2);
    }

    if(!publicToPrivate.has(identifier)) {
        return {error: `Key not found: ${identifier}`}
    }

    const dataBytes = Uint8Array.from(hexToBytes(data));    
    const skHex = Uint8Array.from(hexToBytes(publicToPrivate.get(identifier)));
    const sig = sign(skHex, dataBytes);
    const sigHex = bytesToHex(sig);
    const response = {"signature": sigHex};
    return response;
}

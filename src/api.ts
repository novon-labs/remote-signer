import {init, PublicKey, SecretKey, sign} from "@chainsafe/bls";
import {hexToBytes, bytesToHex} from './utils'
import {publicToPrivate} from "./index"

export const upcheck = async(): Promise<string> =>{
    return "OK";
}
    
export const getKeys = async(): Promise<Array<Map<string, string>>> => {
    console.log("YO", publicToPrivate);
    return Array.from(publicToPrivate.keys())
}
    
export const signData = async(identifier: string, data: string): Promise<any> => {
    // let {bls_domain, data, fork, genesis_validators_root} = req.body;
    await init("blst-native");
    const pk = PublicKey.fromHex(identifier);
    console.log("pl", pk)
    console.log("pl", pk.toBytes())
    

    if(!publicToPrivate.has(identifier) && !publicToPrivate.has(identifier.slice(2)) ) {
        return {error: `Key not found: ${identifier}`}
    }
    const dataBytes = Uint8Array.from(hexToBytes(data));    
    
    const skHex = publicToPrivate.get(identifier) || publicToPrivate.get(identifier.slice(2));
    const secretKey = SecretKey.fromHex(skHex);
    const sig = secretKey.sign(dataBytes);
    console.log(sig.toBytes())
    return {"signature": sig.toHex()}
}


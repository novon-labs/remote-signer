import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {init, SecretKey, secretKeyToPublicKey} from "@chainsafe/bls";
import {hexToBytes, bytesToHex} from './utils'
import router from './router'

const app = express()
app.use(express.json()) 
app.use(morgan('tiny'));
app.use(cors())


const publicToPrivate = new Map();

(async () => {
    await init("herumi");
    const secretKeys = 
        [
            "0x68081afeb7ad3e8d469f87010804c3e8d53ef77d393059a55132637206cc59ec",
            "0x25295f0d1d592a90b333e26e85149708208e9f8e8bc18f6c77bd62f8ad7a6866", 
            "0x51d0b65185db6989ab0b560d6deed19c7ead0e24b9b6372cbecb1f26bdfad000", 
            "0x315ed405fafe339603932eebe8dbfd650ce5dafa561f6928664c75db85f97857",
            "0x25b1166a43c109cb330af8945d364722757c65ed2bfed5444b5a2f057f82d391",
            "0x3f5615898238c4c4f906b507ee917e9ea1bb69b93f1dbd11a34d229c3b06784b",
            "0x055794614bc85ed5436c1f5cab586aab6ca84835788621091f4f3b813761e7a8",
            "0x1023c68852075965e0f7352dee3f76a84a83e7582c181c10179936c6d6348893",
            "0x3a941600dc41e5d20e818473b817a28507c23cdfdb4b659c15461ee5c71e41f5",
        ]
        console.log(secretKeys.length);
    for(let i = 0; i < secretKeys.length; i++) {
        const secretKey = SecretKey.fromHex(secretKeys[i]);
        // const message = Uint8Array.from(hexToBytes("b6bb8f3765f93f4f1e7c7348479289c9261399a3c6906685e320071a1a13955c"))
        const sk = secretKey.toBytes();
        const pk = secretKeyToPublicKey(sk);
        
        publicToPrivate.set(bytesToHex(pk).slice(2), bytesToHex(sk).slice(2));
        // publicToPrivate.set(bytesToHex(pk2).slice(2), bytesToHex(sk2).slice(2));
    }
    console.log(publicToPrivate);

})();



app.use('/', router);

const PORT = process.env.PORT || 9001
app.listen(PORT, ()=> {
    console.log(`started at port ${PORT}`)
})
export {publicToPrivate};

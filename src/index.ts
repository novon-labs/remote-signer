import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { init, SecretKey, secretKeyToPublicKey } from "@chainsafe/bls";
import {hexToBytes, bytesToHex} from './utils'
import router from './router'

const app = express()
app.use(express.json()) 
app.use(morgan('tiny'));
app.use(cors())


const publicToPrivate = new Map();

(async () => {
    await init("herumi");
  
    for(let i = 0; i < 1; i++) {
        const secretKey = SecretKey.fromHex("0x68081afeb7ad3e8d469f87010804c3e8d53ef77d393059a55132637206cc59ec");
        const message = Uint8Array.from(hexToBytes("b6bb8f3765f93f4f1e7c7348479289c9261399a3c6906685e320071a1a13955c"))
        const sk = secretKey.toBytes();
        const pk = secretKeyToPublicKey(sk);
        
        publicToPrivate.set(bytesToHex(pk).slice(2), bytesToHex(sk).slice(2));
    }
    console.log(publicToPrivate);

  })();



app.use('/', router);

const PORT = process.env.PORT || 9000
app.listen(PORT, ()=> {
    console.log(`started at port ${PORT}`)
})
export {publicToPrivate};

import express, {Request, Response} from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import https from 'https';

const prisma = new PrismaClient()

const app = express()


app.use(express.json())
app.use(cors())

const options = {
  key: fs.readFileSync('./privkey.pem'),
  cert: fs.readFileSync('./fullchain.pem'),
};

app.get("/api/product/:barcode", async(req: Request, res: Response)=>{
    
    let {barcode} = req.params

    let data = await prisma.product.findMany({
        select:{
            Barcode: true,
            SecondaryBarcode: true,
            Name: true,
            RetailPrice: true,
            Qty: true,
        },
        where:{
            OR: [
                {Barcode: {contains: barcode}},
                // {SecondaryBarcode: {contains: barcode}}
            ]
        }
    })

    res.status(200).send({status: res.statusCode, data})
})


https.createServer(options, app).listen(443, () => {
  console.log('Running on HTTPS');
});
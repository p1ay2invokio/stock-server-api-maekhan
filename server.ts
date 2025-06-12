import express, {Request, Response} from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()


app.use(cors())
app.use(express.json())


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


app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})
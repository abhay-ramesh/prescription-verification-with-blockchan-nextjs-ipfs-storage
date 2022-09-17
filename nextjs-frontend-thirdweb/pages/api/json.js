import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const dat = JSON.parse(req.body)
        console.log(dat)
        // Process a POST request
        const file = await prisma.user.create({
            data: {
                cid: dat.cid,
                address: dat.address
            }
        })
        console.log(file)
        res.status(200).send(file)
    } else {
        // Handle any other HTTP method
    }
}
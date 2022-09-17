import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const dat = JSON.parse(req.body)
        console.log(dat)
        // Process a POST request
        const files = await prisma.user.findMany({
            where: {
                address: dat.address
            },
            select: {
                cid: true
            }
        })
        console.log(files)
        res.status(200).send(files)
    } else {
        // Handle any other HTTP method
    }
}
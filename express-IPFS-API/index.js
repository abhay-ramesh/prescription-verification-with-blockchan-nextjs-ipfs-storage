import * as IPFS from 'ipfs-core'
import express from 'express'
import cors from 'cors'
const app = express()
const port = 3001

// app.use(bodyParser.urlencoded({
//     extended: true
// }));

app.use(express.json());

app.use(cors());


// const ipfs = await IPFS.create()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const node = await IPFS.create()

app.post('/upload', async (req, res) => {
    async function upload(json_data) {

        const data = [{ "fs": "vdrsf", "srgvs": "vsdz" }, { "fs": "vdrsf", "srgvs": "vsdz" }]
        const { cid } = await node.add(JSON.stringify(json_data))
        const url = ("https://ipfs.io/ipfs/" + cid)
        console.log(url)
        return String(cid)
    }
    console.log(req.body)
    const cidd = await upload(req.body)
    console.log(cidd)
    res.status(200).json({ cid: cidd })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
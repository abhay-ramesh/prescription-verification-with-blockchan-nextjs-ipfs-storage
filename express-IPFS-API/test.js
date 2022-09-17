import * as IPFS from 'ipfs-core'
const node = await IPFS.create()

const data = [{ "fs": "vdrsf", "srgvs": "vsdz" }, { "fs": "vdrsf", "srgvs": "vsdz" }]
console.log(JSON.stringify(data))
const { cid } = await node.add(JSON.stringify(data))
const url = ("https://ipfs.io/ipfs/" + cid)
console.log(url)
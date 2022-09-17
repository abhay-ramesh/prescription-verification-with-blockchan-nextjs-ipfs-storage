import { ethers } from './ethers-5.6.esm.min.js'
// import * as fs from 'fs'
import { abi, contractAddress, abi_verify_signature, contractAddress_verify_signature } from './constants.js'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
let DOCTOR_PRV_KEY = "0x4197d7e535922b969992798c474991e21e021a9443ed787d9c8482127a98e138"
let PATIENT_PRV_KEY = "0x0ab8f44722b3254ba2fcf2d284cafa250f4f7d92c36de00f02e95db4bb641208"
let PATIENT_PUB_KEY = "0xE880daD6852fB97fCEc6EC36BB952224247A619f"
let DOCTOR_PUB_KEY = "0x42d62AE66ead5B9529Ee457fAE0Ad1965f38d6f8"

const sdk = new ThirdwebSDK("rinkeby")



export async function sign(private_key, message, address) {
    // we will sign the message with the private_key
    //const accounts = await ethers.getSigners(2);


    // const VerifySignature = await ethers.getContractFactory("VerifySignature");
    // const contract = await VerifySignature.deploy();
    // await contract.deployed();

    //const provider = new ethers.providers.Web3Provider(window.ethereum)
    //const signer = provider.getSigner()
    console.log("first")
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    console.log("first")

    const signer = new ethers.Wallet(private_key, provider)
    console.log("first")
    // const contract = new ethers.Contract(contractAddress_verify_signature, abi_verify_signature, signer)
    const contract = await sdk.getContractFromAbi(String(`{{${contractAddress_verify_signature}}}`), abi_verify_signature)
    console.log("first")
    const ftch = await fetch("/api/json", { method: "POST", body: JSON.stringify({ address: address, cid: message }) })
    console.log(ftch.json())
    // patient(message, address)
    const to = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
    const amount = 999
    const nonce = 123

    // const hash = await contract.call(`getMessageHash(${to},${amount},${message},${nonce})`);
    // console.log(hash);
    console.log("call")
    // const tx = await contract.call("getMessageHash", String(`{{${to}}}`), Number(amount), Number(nonce));
    // console.log(tx)
    //const receipt = tx.receipt;

    // const hash = await contract.getMessageHash(to, amount, message, nonce)
    console.log("first")
    // before passing the hash into the signMessage we need to convert it to a bytes type
    // const sig = await signer.signMessage(ethers.utils.arrayify(hash))
    // console.log("sig", sig)
    //console.log(`\n\nThis is the signed message: ${sig}\n\n`)
    return "sig";
}


export async function verify_signature(message, signed_msg, ISSUER_PRV_KEY) {
    const to = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
    const amount = 999
    const nonce = 123
    // const VerifySignature = await ethers.getContractFactory("VerifySignature");
    // const contract = await VerifySignature.deploy();
    // await contract.deployed();
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = new ethers.Wallet(ISSUER_PRV_KEY, provider)

    //const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress_verify_signature, abi_verify_signature, signer)


    let status = await contract.verify(signer.address, to, amount, message, nonce, signed_msg)
    //console.log(`Status: ${status}`)
    return status;
}

// the public keys referred to in this function are the L2 keys that we will generate.
export async function issueprescription(cid, publicKeyDoctor, publicKeyPatient) {
    console.log(cid, publicKeyDoctor, publicKeyPatient)
    console.log("issueprescription")
    console.log("Connecting...")
    if (typeof window.ethereum !== "undefined") {
        try {
            await ethereum.request({ method: "eth_requestAccounts" })
        } catch (error) {
            console.log(error)
        }
        //connectButton.innerHTML = "Connected! "

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)

        // generate L2 public key and private key of doctor 


        doctorSign = await sign(DOCTOR_PRV_KEY, cid)
        await contract.IssuePrescription(cid, DOCTOR_PUB_KEY, doctorSign, PATIENT_PUB_KEY)
        console.log("Done Issueing prescription. (Patient is yet to sign)")
    }
}

// export async function patient(contract, address) {
//     // var data = fs.readFileSync('data.json');
//     // var myObject = JSON.parse(data);
//     // let newData = {
//     //     "country": "England"
//     // }
//     // myObject.push(newData);
//     // var new_Data = JSON.stringify(myObject);
//     // fs.writeFile('data.json', new_Data, err => {
//     //     // error checking
//     //     if (err) throw err;

//     //     console.log("New data added");
//     // });

//     // (async () => {
//     //     const filename = "../../components/wrappers/contracts.json";
//     //     let users = [
//     //         {
//     //             name: "Amy",
//     //             age: 21,
//     //         },
//     //         {
//     //             name: "Bob",
//     //             age: 23,
//     //         },
//     //     ];
//     //     await fs.readFileSync(filename, JSON.stringify(users));

//     //     // append a new user to the JSON file
//     //     const user = {
//     //         name: "John",
//     //         age: 20,
//     //     };
//     //     const file = await fs.readFile(filename);
//     //     users = JSON.parse(file);
//     //     users.push(user);
//     //     await fs.writeFile(filename, JSON.stringify(users, null, 4));
//     // }
//     // )
//     //check if file exist
//     if (!fs.existsSync('../../components/wrapper/contracts.json')) {
//         //create new file if not exist
//         fs.closeSync(fs.openSync('../../components/wrapper/contracts.json', 'w'));
//     }

//     // read file
//     const file = fs.readFileSync('../../components/wrapper/contracts.json')
//     const data = contract
//     console.log(file)

//     const ages = [32, 33, 16, 40];
//     const result = ages.filter(checkAdult);

//     function checkAdult(age) {
//         return age >= 18;
//     }

//     //check if file is empty
//     if (file.length == 0) {
//         //add data to json file
//         fs.writeFileSync("../../components/wrapper/contracts.json", JSON.stringify([data]))
//     } else {
//         //append data to jso file
//         const json = JSON.parse(file.toString())
//         //add json element to json object
//         json.push(data);
//         fs.writeFileSync("../../components/wrapper/contracts.json", JSON.stringify(data))
//     }
// }

export async function patientsigncertificate(cid,) {

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)

    console.log("Going to sign")
    let patientSign = await sign(PATIENT_PRV_KEY, cid)
    console.log("Done signing")

    console.log("executing the contract call")
    await contract.PatientSignCertificate(cid, patientSign, PATIENT_PUB_KEY)
    console.log("finished executing contract call patient has signed");
}

export async function getDetailsAndVerify(cid, contract) {

    let tuple_details = await contract.getPrescriptionForVerification(PATIENT_PUB_KEY, cid)
    console.log(`Tuple Details:\n${tuple_details}`)
}




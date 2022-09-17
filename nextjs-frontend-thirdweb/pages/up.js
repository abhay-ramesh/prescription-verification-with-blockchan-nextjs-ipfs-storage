import { useContract, useContractWrite, useSDK } from '@thirdweb-dev/react'
import { useState } from 'react'
import { sign, issueprescription } from '../assets/Ishaan/index'
import { abi, contractAddress } from '../assets/Ishaan/constants'


function Uplaod({ address }) {
    const [fileUrl, updateFileUrl] = useState(null)
    const [meds, setMeds] = useState([])

    //
    let DOCTOR_PRV_KEY = "0x4197d7e535922b969992798c474991e21e021a9443ed787d9c8482127a98e138"
    let PATIENT_PRV_KEY = "0x0ab8f44722b3254ba2fcf2d284cafa250f4f7d92c36de00f02e95db4bb641208"
    let PATIENT_PUB_KEY = "0xE880daD6852fB97fCEc6EC36BB952224247A619f"
    let DOCTOR_PUB_KEY = "0x42d62AE66ead5B9529Ee457fAE0Ad1965f38d6f8"

    // const { contract } = useContract("0x5c963832fe90c608ef3b0ca334bf629aac48dd57");

    const sdk = useSDK()

    const contract = sdk.getContractFromAbi(
        String(`{{${contractAddress}}}`), abi
    )

    console.log(contract)

    const {
        mutate: IssuePrescription,
        isLoading,
        error,
    } = useContractWrite(contract, "IssuePrescription");


    const handleSubmit = event => {
        event.preventDefault()
        const d = new Date();
        d.setDate(d.getDate() + event.target.days.value);
        let medi = {
            med: event.target.prescription.value,
            morning: {
                bool: event.target.morning_bool.checked,
                food: event.target.morning_food.value,
            },
            noon: {
                bool: event.target.noon_bool.checked,
                food: event.target.noon_food.value,
            },
            evening: {
                bool: event.target.evening_bool.checked,
                food: event.target.evening_food.value,
            },
            bedtime: {
                bool: event.target.bedtime_bool.checked,
                food: event.target.bedtime_food.value,
            },
            exp: {
                date: d,
            }
        }
        setMeds(meds => [...meds, medi])
        event.target.reset()
        console.log(meds)
    }
    async function handleFinalSubmit() {
        console.log(meds)
        const response = await fetch("http://localhost:3001/upload", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(meds)
        }).then((response) => (response.json()))
        let contracts = meds
        console.log(response)
        updateFileUrl(response.cid)
        //
        // issueprescription(response.cid, address, PATIENT_PUB_KEY)

        const docsign = await sign(DOCTOR_PRV_KEY, response.cid, address)
        console.log(docsign)

        // const temp = await IssuePrescription([response.cid, DOCTOR_PUB_KEY, docsign, PATIENT_PUB_KEY])
        // console.log(temp)
    }


    return (
        <div className="bg-zinc-800 w-full h-screen p-10">
            <form onSubmit={handleSubmit} className=' flex flex-col border-2 rounded-xl p-8 space-y-4'>
                <div className=''>
                    <input type='text' name='prescription' placeholder="Prescription..." className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm' />
                </div>
                <div className='flex w-full justify-around divide-x-2 border-2 p-2 rounded-lg'>
                    <div className='text-center space-x-2 space-y-1'>
                        <p className='text-white'>Morning</p>
                        <input type='checkbox' name='morning_bool' />
                        <select name='morning_food'>
                            <option>Before Food</option>
                            <option>After Food</option>
                        </select>
                    </div>
                    <div className='text-center space-x-2 space-y-1'>
                        <p className='text-white'>Noon</p>
                        <input type='checkbox' name='noon_bool' />
                        <select name='noon_food'>
                            <option>Before Food</option>
                            <option>After Food</option>
                        </select>
                    </div>
                    <div className='text-center space-x-2 space-y-1'>
                        <p className='text-white'>Evening</p>
                        <input type='checkbox' name='evening_bool' />
                        <select name='evening_food'>
                            <option>Before Food</option>
                            <option>After Food</option>
                        </select>
                    </div>
                    <div className='text-center space-x-2 space-y-1'>
                        <p className='text-white'>Bedtime</p>
                        <input type='checkbox' name='bedtime_bool' />
                        <select name='bedtime_food'>
                            <option>Before Food</option>
                            <option>After Food</option>
                        </select>
                    </div>
                </div>
                <div className='w-full flex justify-end space-x-2'>
                    <label className='text-white'>Days: </label>
                    <input type='number' min={0} name='days' />
                </div>
                <div className='w-full flex justify-end'>
                    <button type='submit' className='bg-[#f213a4] py-2 px-6 rounded-md w-min text-white'>Submit</button>
                </div>
            </form>
            <div className='bg-white p-8 my-8'>
                <table className='table table-auto border-collapse'>
                    <thead className='border-2 divide-x-2'>
                        <tr className='divide-x-2'>
                            <th>Name</th>
                            <th colSpan="2">Morning</th>
                            <th colSpan="2">Noon</th>
                            <th colSpan="2">Evening</th>
                            <th colSpan="2">Bedtime</th>
                        </tr>
                    </thead>

                    <tbody>
                        {meds.map((med) => {
                            return (
                                <tr key={Math.random()} className='border-2 divide-x-2'>
                                    <td>{med.med}</td>
                                    <td>{med.morning.bool ? "✅" : "❌"}</td>
                                    <td>{med.morning.bool ? med.morning.food : ""}</td>
                                    <td>{med.noon.bool ? "✅" : "❌"}</td>
                                    <td>{med.noon.bool ? med.noon.food : ""}</td>
                                    <td>{med.evening.bool ? "✅" : "❌"}</td>
                                    <td>{med.evening.bool ? med.evening.food : ""}</td>
                                    <td>{med.bedtime.bool ? "✅" : "❌"}</td>
                                    <td>{med.bedtime.bool ? med.bedtime.food : ""}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className='w-full flex justify-end'>
                    <button onClick={handleFinalSubmit} className='bg-[#f213a4] py-2 px-6 rounded-md w-min text-white'>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default Uplaod
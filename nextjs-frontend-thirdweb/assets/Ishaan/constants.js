export const abi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_cid",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_publicKeyDoctor",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "DoctorSign",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_publicKeyPatient",
                "type": "address"
            }
        ],
        "name": "IssuePrescription",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_cid",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "PatientSign",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_publicKeyPatient",
                "type": "address"
            }
        ],
        "name": "PatientSignCertificate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "Doctor",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "doctor_name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_publicKeyPatient",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_cid",
                "type": "string"
            }
        ],
        "name": "getPrescriptionForVerification",
        "outputs": [
            {
                "internalType": "address",
                "name": "publicKeyDoctor",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "publicKeyPatient",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "signedByDoctor",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "signedByPatient",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "cid",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

export const contractAddress = "0x5c963832fe90c608ef3b0ca334bf629aac48dd57"



export const abi_verify_signature =
    [
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "_messageHash",
                    "type": "bytes32"
                }
            ],
            "name": "getEthSignedMessageHash",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_message",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_nonce",
                    "type": "uint256"
                }
            ],
            "name": "getMessageHash",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "_ethSignedMessageHash",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes",
                    "name": "_signature",
                    "type": "bytes"
                }
            ],
            "name": "recoverSigner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes",
                    "name": "sig",
                    "type": "bytes"
                }
            ],
            "name": "splitSignature",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "r",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32",
                    "name": "s",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint8",
                    "name": "v",
                    "type": "uint8"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_signer",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_message",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_nonce",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "signature",
                    "type": "bytes"
                }
            ],
            "name": "verify",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        }
    ]

export const contractAddress_verify_signature = "0xbcaa5a081c3d07c54f1a22b5d69a6698f3d85512"
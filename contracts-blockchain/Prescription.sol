// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract Prescription {
    
    struct prescription_on_chain {
        address publicKeyDoctor;
        address publicKeyPatient;
        string signedByDoctor;
        string signedByPatient;
        string cid;
    }

    

    address public Doctor;
    string public doctor_name;
    
    prescription_on_chain[] prescription_all;

    mapping(address => prescription_on_chain[]) patient_to_prescriptions;


    // ex. Doctor
    /*constructor(string memory _doctor_name) {
        Doctor = msg.sender;
        doctor_name = _doctor_name;
    }

    modifier onlyOwner {
        require(Doctor == msg.sender, "Only Doctor can call this function.");
        _;
    }*/

    function IssuePrescription(
        string memory _cid,
        address _publicKeyDoctor,
        string memory DoctorSign,
        address _publicKeyPatient
        ) public /*onlyOwner*/ {
        

   
        prescription_on_chain memory prescription_local = prescription_on_chain(
            {
                publicKeyDoctor: _publicKeyDoctor,
                publicKeyPatient: _publicKeyPatient,
                signedByDoctor: DoctorSign,
                signedByPatient:'',
                cid: _cid
            }
        );

        //prescription_mapping[_cid] = prescription_local;
        //prescription_all.push(prescription_local);
        patient_to_prescriptions[_publicKeyPatient].push(prescription_local);


    }

    
    function PatientSignCertificate(string memory _cid, string memory PatientSign, address _publicKeyPatient) public {
        //prescription_on_chain storage p_local = prescription_mapping[cid];
        //p_local.signedByPatient = PatientSign;
        
        //prescription_on_chain memory p = prescription_mapping[_cid];
        prescription_on_chain[] storage p_list = patient_to_prescriptions[_publicKeyPatient];
        for( uint i=0; i<p_list.length;i++)
        {
            if(keccak256(abi.encodePacked(p_list[i].cid)) == keccak256(abi.encodePacked(_cid)))
            {
                prescription_on_chain storage p = p_list[i];
                p.signedByPatient = PatientSign;
                break;
            }
        }   
    }

    /*function revoke(string memory hash) public {
        // check if msg.sender is the Issuerpublickey
        Certificate storage certificate = certificates[hash];
        address publicKeyIssuer = certificate.publicKeyIssuer;
        if (msg.sender == publicKeyIssuer) {
            certificate.valid = 0;
        }   
    }*/


    function getPrescriptionForVerification(address _publicKeyPatient, string memory _cid) view public returns(address publicKeyDoctor,
        address publicKeyPatient,
        string memory signedByDoctor,
        string memory signedByPatient,
        string memory cid) {

        prescription_on_chain memory p;
        //prescription_on_chain memory p = prescription_mapping[_cid];
        prescription_on_chain[] memory p_list = patient_to_prescriptions[_publicKeyPatient];
        for( uint i=0; i<p_list.length;i++)
        {
            if(keccak256(abi.encodePacked(p_list[i].cid)) == keccak256(abi.encodePacked(_cid)))
            {
                p = p_list[i];
                break;
            }
        }

        return (p.publicKeyDoctor, p.publicKeyPatient, p.signedByDoctor, p.signedByPatient, p.cid);
    }
}
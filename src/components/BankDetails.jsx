import React, { useState } from 'react';

const initialState = {
    Bankselect: ''
};

const Bank_List = [
    { id: 0, name: 'NA' },
    { id: 1, name: 'Bank of Baroda' },
    { id: 2, name: 'State Bank of India' },
    { id: 3, name: 'Punjab National Bank' },
    { id: 4, name: 'Canara Bank' },
    { id: 5, name: 'Union Bank of India' },
    { id: 6, name: 'HDFC Bank' },
    { id: 7, name: 'ICICI Bank' },
    { id: 8, name: 'Axis Bank' },
    { id: 9, name: 'Kotak Mahindra Bank' },
    { id: 10, name: 'IndusInd Bank' },
    { id: 11, name: 'Yes Bank' },
    { id: 12, name: 'IDFC FIRST Bank' },
    { id: 13, name: 'Bank of India' },
    { id: 14, name: 'Central Bank of India' },
    { id: 15, name: 'Indian Bank' },
    { id: 16, name: 'Bank of Maharashtra' },
    { id: 17, name: 'UCO Bank' },
    { id: 18, name: 'Oriental Bank of Commerce' },
    { id: 19, name: 'Federal Bank' },
    { id: 20, name: 'Karur Vysya Bank' },
    { id: 21, name: 'South Indian Bank' },
    { id: 22, name: 'RBL Bank' },
    { id: 23, name: 'Dena Bank' },
    { id: 24, name: 'Vijaya Bank' },
    { id: 25, name: 'Syndicate Bank' },
    { id: 26, name: 'Andhra Bank' },
    { id: 27, name: 'Punjab & Sind Bank' },
    { id: 28, name: 'Jammu and Kashmir Bank' },
    { id: 29, name: 'City Union Bank' },
    { id: 30, name: 'Bandhan Bank' },
    { id: 31, name: 'Karnataka Bank' },
    { id: 32, name: 'Catholic Syrian Bank' },
    { id: 33, name: 'Nainital Bank' },
    { id: 34, name: 'DCB Bank' },
    { id: 35, name: 'AU Small Finance Bank' },
    { id: 36, name: 'Equitas Small Finance Bank' },
    { id: 37, name: 'Ujjivan Small Finance Bank' },
    { id: 38, name: 'IDBI Bank' },
    { id: 39, name: 'Tamilnad Mercantile Bank' },
    { id: 40, name: 'Lakshmi Vilas Bank' },
    { id: 41, name: 'Kerala Gramin Bank' },
    { id: 42, name: 'Bharatiya Mahila Bank' },
    { id: 43, name: 'United Bank of India' },
    { id: 44, name: 'Syndicate Bank' },
    { id: 45, name: 'Allahabad Bank' },
    { id: 46, name: 'United Bank of India' },
    { id: 47, name: 'Syndicate Bank' },
    { id: 48, name: 'Allahabad Bank' },
    { id: 49, name: 'Indian Overseas Bank' },
    { id: 50, name: 'Punjab and Sind Bank' },
    { id: 51, name: 'Dhanlaxmi Bank' },
    { id: 52, name: 'Jana Small Finance Bank' },
    { id: 53, name: 'Saraswat Bank' },
    { id: 54, name: 'Kalyan Janata Sahakari Bank' },
    { id: 55, name: 'Thane Janata Sahakari Bank' },
    { id: 56, name: 'Sarva U.P. Gramin Bank' },
    { id: 99, name: 'Not listed' },
    
    // Add more Indian bank names as needed
];


const BankDetails = ({
    Bankselect,
    AccountName,
    IFSCcode,
    AccountNumber,
    handleBankChange,
    handleAccountNameChange,
    handleIFSCcode,
    handleAccountNumberChange
}) => {

    return (
        <>
            <div className="sm:col-span-3">
                <div className="my-0">
                    <label htmlFor="state" className="form-label font-medium text-sm" >Bank Name</label>
                    <select name='Bank_Name' className='text-sm w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-3 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary' value={Bankselect} id="state" onChange={(e) => handleBankChange(e.target.value)} >
                        <option value="">Select Bank</option>
                        {Bank_List.map((bank) => (
                            <option key={bank.id} value={bank.name}>
                                {bank.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="sm:col-span-3">
                <div className="my-0">
                    <label for="Account_Name" className="form-label font-medium text-sm">Account Name</label>
                    <input
                        type="text"
                        name='Account_Name'
                        className='text-sm w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                        id="Account_Name"
                        value={AccountName}
                        maxLength={75}
                        onChange={(e) => handleAccountNameChange(e.target.value)}
                        placeholder='Account Name (75)'
                        aria-describedby="Account_Name" />
                </div>
            </div>
            <div className="sm:col-span-3">
                <div className="my-0">
                    <label for="IFSC_Code" className="form-label font-medium text-sm" >IFSC Code</label>
                    <input
                        type="text"
                        name='IFSC_Code'
                        value={IFSCcode}
                        maxLength={20}
                        className='text-sm w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                        id="IFSC_Code"
                        onChange={(e) => handleIFSCcode(e.target.value)}
                        placeholder='IFSC Code (20)'
                        aria-describedby="IFSC_Code" />

                </div>
            </div>
            <div className="sm:col-span-3">
                <div className="my-0">
                    <label for="Account_Number" className="form-label font-medium text-sm" >Account Number</label>
                    <input
                        type="number"
                        name='Account_Number'
                        
                        maxLength={20}
                        onChange={(e) => handleAccountNumberChange(e.target.value)}
                        value={AccountNumber}
                        className='text-sm w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary' id="Account_Number" placeholder='Account Number (20)' aria-describedby="Account_Number" />
                </div>
            </div>


        </>
    );
};

export default BankDetails;
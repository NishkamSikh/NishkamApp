import React, { useState } from 'react';

const initialState = {
    selectedState: '',
    selectedDistrict: '',
    selectedTehsil: '',
    selectedVillage: '',
    selectedAddress: '',
    selectedPincode: '',
};

const IndianStates = [
    { name: 'Delhi', districts: ['Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'North East Delhi', 'North West Delhi', 'Shahdara', 'South Delhi', 'South East Delhi', 'South West Delhi', 'West Delhi'] },
    { name: 'Punjab', districts: ['Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Fazilka', 'Ferozepur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Mansa', 'Moga', 'Muktsar', 'Nawanshahr', 'Pathankot', 'Patiala', 'Rupnagar', 'Sahibzada Ajit Singh Nagar', 'Sangrur', 'Shahid Bhagat Singh Nagar', 'Sri Muktsar Sahib', 'Tarn Taran'] },
    // Add more states and districts here...
];

const Districts = {
    'Delhi': ['Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'North East Delhi', 'North West Delhi', 'Shahdara', 'South Delhi', 'South East Delhi', 'South West Delhi', 'West Delhi'],
    'Punjab': ['Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Fazilka', 'Ferozepur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Mansa', 'Moga', 'Muktsar', 'Nawanshahr', 'Pathankot', 'Patiala', 'Rupnagar', 'Sahibzada Ajit Singh Nagar', 'Sangrur', 'Shahid Bhagat Singh Nagar', 'Sri Muktsar Sahib', 'Tarn Taran'],
    // Add more districts here...
};

const Tehsils = {
    "Amritsar": ["Amritsar - I", "Amritsar - II", "Ajnala", "Baba Bakala"],
    "Barnala": ["Barnala", "Tapa"],
    "Bathinda": ["Bathinda - I", "Bathinda - II", "Maur", "Rampura Phul", "Talwandi Sabo"],
    "Faridkot": ["Faridkot", "Jaitu", "Kotkapura"],
    "Fatehgarh Sahib": ["Amloh", "Bassi Pathana", "Fatehgarh Sahib", "Khamano", "Sirhind -Fategarh"],
    "Fazilka": ["Abohar", "Fazilka", "Jalalabad", "Khuian Sarwar"],
    "Ferozepur": ["Ferozepur -I", "Ferozepur -II", "Firozpur Cantt.", "Guru Har Sahai", "Makhu", "Zira"],
    "Gurdaspur": ["Batala", "Dera Baba Nanak", "Dhariwal", "Dinanagar", "Gurdaspur", "Pathankot", "Qadian"],
    "Hoshiarpur": ["Dasuya", "Garhshankar", "Hoshiarpur -I", "Hoshiarpur -II", "Mukerian", "Sham Chaurasi", "Talwara"],
    "Jalandhar": ["Adampur", "Bhogpur", "Jalandhar - I", "Jalandhar - II", "Nakodar", "Phillaur", "Shahkot"],
    "Kapurthala": ["Bhulath", "Kapurthala -I", "Kapurthala -II", "Phagwara", "Sultanpur Lodhi"],
    "Ludhiana": ["Doraha", "Jagraon", "Khanna", "Ludhiana - I", "Ludhiana - II", "Malerkotla", "Payal", "Raikot", "Samrala"],
    "Mansa": ["Budhlada", "Mansa", "Sardulgarh"],
    "Moga": ["Baghapurana", "Dharamkot", "Kot Ise Khan", "Moga", "Nihal Singh Wala"],
    "Muktsar": ["Gidderbaha", "Malout", "Muktsar"],
    "Nawanshahr": ["Balachaur", "Banga", "Nawanshahr"],
    "Pathankot": ["Dhar Kalan", "Pathankot", "Sujanpur"],
    "Patiala": ["Ghanaur", "Nabha", "Patiala - I", "Patiala - II", "Rajpura", "Samana", "Shutrana"],
    "Rupnagar": ["Anandpur Sahib", "Kharar", "Morinda", "Nangal", "Rupnagar"],
    "Sahibzada Ajit Singh Nagar": ["Dera Bassi", "Kharar", "Mohali"],
    "Sangrur": ["Barnala", "Dhuri", "Lehragaga", "Malerkotla", "Moonak", "Sangrur - I", "Sangrur - II", "Sunam"],
    "Tarn Taran": ["Bhikhiwind", "Goindwal Sahib", "Khadoor Sahib", "Patti", "Tarn Taran"],
    "Central Delhi": ["Darya Ganj", "Karol Bagh", "Paharganj"],
    "East Delhi": ["Gandhi Nagar", "Preet Vihar", "Vivek Vihar"],
    "New Delhi": ["Chanakyapuri", "Connaught Place", "Parliament Street"],
    "North Delhi": ["Civil Lines", "Kotwali", "Sadar Bazar"],
    "North East Delhi": ["Seelampur", "Yamuna Vihar", "Karawal Nagar"],
    "North West Delhi": ["Narela", "Model Town", "Rohini"],
    "Shahdara": ["Shahdara", "Vivek Vihar", "Krishna Nagar"],
    "South Delhi": ["Defence Colony", "Hauz Khas", "Kalkaji"],
    "South East Delhi": ["Sarita Vihar", "Kalkaji", "Saket"],
    "South West Delhi": ["Dwarka", "Najafgarh", "Vasant Vihar"],
    "West Delhi": ["Patel Nagar", "Rajouri Garden", "Punjabi Bagh"]



    // Add more tehsils here...
};

const Form = ({
    selectedState,
    selectedDistrict,
    selectedTehsil,
    selectedVillage,
    selectedAddress,
    selectedPincode,
    handleStateChange,
    handleDistrictChange,
    handleTehsilChange,
    handleAddressChange,
    handleVillageChange,
    handlePinCodeChange
}) => {


    return (
        <>
            <div className="sm:col-span-3">
                <div className="my-0">
                    <label htmlFor="vendor_institution" className="block text-sm font-medium leading-6 text-grey-900">
                        State
                    </label>

                    <select
                        name='State'
                        className='text-sm w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-3 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                        id="state"
                        value={selectedState}
                        onChange={(e) => handleStateChange(e.target.value)}>
                        <option value="">Select State</option>
                        {IndianStates.map((state) => (
                            <option key={state.name} value={state.name}>
                                {state.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="sm:col-span-3">
                <div className="my-0">
                    <label htmlFor="district" className="block text-sm font-medium leading-6 text-grey-900">District:</label>
                    <select name='District'
                        className='text-sm  w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-3 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                        id="district"
                        value={selectedDistrict}
                        onChange={(e) => handleDistrictChange(e.target.value)}
                        disabled={!selectedState}>
                        <option value="">Select District</option>
                        {selectedState && Districts[selectedState] && Districts[selectedState].map((district) => (
                            <option key={district} value={district}>
                                {district}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="sm:col-span-3">
                <div className="my-0">
                    <label htmlFor="tehsil" className="block text-sm font-medium leading-6 text-grey-900">Tehsil:</label>
                    <select className='text-sm  w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-3 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary' name='Tehsil' id="tehsil" value={selectedTehsil} onChange={(e) => handleTehsilChange(e.target.value)} disabled={!selectedDistrict}>
                        <option value="">Select Tehsil</option>
                        {selectedDistrict && Tehsils[selectedDistrict] && Tehsils[selectedDistrict].map((tehsil) => (
                            <option key={tehsil} value={tehsil}>
                                {tehsil}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="text-sm sm:col-span-3">
                <div className="text-sm my-0">
                    <label for="Address" className="block text-sm font-medium leading-6 text-grey-900">Address</label>
                    <input
                        type="text"
                        name='Address'
                        id="Address"
                        value={selectedAddress}
                        placeholder='Address (75)' 
                        maxLength={75}  
                        onChange={(e) => handleAddressChange(e.target.value)}
                        className=' text-sm w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-3 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                        aria-describedby="Address" />
                </div>
            </div>
            <div className="sm:col-span-3">
                <div className="my-0">
                    <label for="pincode" className="block text-sm font-medium leading-6 text-grey-900">Pin Code</label>
                    <input
                        type="text"
                        value={selectedPincode}
                        maxLength={6}
                        placeholder='PIN (6)' 
                        onChange={(e) => handlePinCodeChange(e.target.value)}
                        id='Pincode'
                        name="Pincode"
                        className='text-sm w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-3 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary' aria-describedby="pincode" />
                        
                </div>
            </div>
            <div className="sm:col-span-3">
                <div className="my-0">
                    <label for="village"
                        className="block text-sm font-medium leading-6 text-grey-900">Village Name</label>
                    <input
                        type="text"
                        name='Village'
                        id="Village"
                        placeholder='Village (40)' 
                        maxLength={40}  
                        onChange={(e) => handleVillageChange(e.target.value)}
                        value={selectedVillage}
                        className='text-sm w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-3 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary' aria-describedby="Village" />
                </div>
            </div>


        </>
    );
};

export default Form;
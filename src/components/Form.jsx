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
    {
        name: 'Haryana',
        districts: ['Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad', 'Gurugram', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Mahendragarh', 'Nuh', 'Palwal', 'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar']
    },
    {
        name: 'Karnataka',
        districts: ['Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban', 'Bidar', 'Chamarajanagar', 'Chikballapur', 'Chikmagalur', 'Chitradurga', 'Dakshina Kannada', 'Davangere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri', 'Kalaburagi', 'Kodagu', 'Kolar', 'Koppal', 'Mandya', 'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga', 'Tumakuru', 'Udupi', 'Uttara Kannada', 'Vijayapura', 'Yadgir']
    },
    {
        name: 'Maharashtra',
        districts: ['Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara', 'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar', 'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal']
    },
    {
        name: 'Uttar Pradesh',
        districts: ['Agra', 'Aligarh', 'Allahabad', 'Ambedkar Nagar', 'Amethi', 'Amroha', 'Auraiya', 'Azamgarh', 'Baghpat', 'Bahraich', 'Ballia', 'Balrampur', 'Banda', 'Barabanki', 'Bareilly', 'Basti', 'Bhadohi', 'Bijnor', 'Budaun', 'Bulandshahr', 'Chandauli', 'Chitrakoot', 'Deoria', 'Etah', 'Etawah', 'Faizabad', 'Farrukhabad', 'Fatehpur', 'Firozabad', 'Gautam Buddha Nagar', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur', 'Hamirpur', 'Hapur', 'Hardoi', 'Hathras', 'Jalaun', 'Jaunpur', 'Jhansi', 'Kannauj', 'Kanpur Dehat', 'Kanpur Nagar', 'Kasganj', 'Kaushambi', 'Kheri', 'Kushinagar', 'Lalitpur', 'Lucknow', 'Maharajganj', 'Mahoba', 'Mainpuri', 'Mathura', 'Mau', 'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh', 'Rae Bareli', 'Rampur', 'Saharanpur', 'Sambhal', 'Sant Kabir Nagar', 'Shahjahanpur', 'Shamli', 'Shravasti', 'Siddharthnagar', 'Sitapur', 'Sonbhadra', 'Sultanpur', 'Unnao', 'Varanasi']
    },
    // Add more states and districts here...
];

const Districts = {
    'Delhi': ['Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'North East Delhi', 'North West Delhi', 'Shahdara', 'South Delhi', 'South East Delhi', 'South West Delhi', 'West Delhi'],
    'Punjab': ['Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Fazilka', 'Ferozepur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Mansa', 'Moga', 'Muktsar', 'Nawanshahr', 'Pathankot', 'Patiala', 'Rupnagar', 'Sahibzada Ajit Singh Nagar', 'Sangrur', 'Shahid Bhagat Singh Nagar', 'Sri Muktsar Sahib', 'Tarn Taran'],
    'Haryana': ['Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad', 'Gurugram', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Mahendragarh', 'Nuh', 'Palwal', 'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar'],
    'Karnataka': ['Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban', 'Bidar', 'Chamarajanagar', 'Chikballapur', 'Chikmagalur', 'Chitradurga', 'Dakshina Kannada', 'Davangere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri', 'Kalaburagi', 'Kodagu', 'Kolar', 'Koppal', 'Mandya', 'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga', 'Tumakuru', 'Udupi', 'Uttara Kannada', 'Vijayapura', 'Yadgir'],
    'Maharashtra': ['Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara', 'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar', 'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'],
    'Uttar Pradesh': ['Agra', 'Aligarh', 'Allahabad', 'Ambedkar Nagar', 'Amethi', 'Amroha', 'Auraiya', 'Azamgarh', 'Baghpat', 'Bahraich', 'Ballia', 'Balrampur', 'Banda', 'Barabanki', 'Bareilly', 'Basti', 'Bhadohi', 'Bijnor', 'Budaun', 'Bulandshahr', 'Chandauli', 'Chitrakoot', 'Deoria', 'Etah', 'Etawah', 'Faizabad', 'Farrukhabad', 'Fatehpur', 'Firozabad', 'Gautam Buddha Nagar', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur', 'Hamirpur', 'Hapur', 'Hardoi', 'Hathras', 'Jalaun', 'Jaunpur', 'Jhansi', 'Kannauj', 'Kanpur Dehat', 'Kanpur Nagar', 'Kasganj', 'Kaushambi', 'Kheri', 'Kushinagar', 'Lalitpur', 'Lucknow', 'Maharajganj', 'Mahoba', 'Mainpuri', 'Mathura', 'Mau', 'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh', 'Rae Bareli', 'Rampur', 'Saharanpur', 'Sambhal', 'Sant Kabir Nagar', 'Shahjahanpur', 'Shamli', 'Shravasti', 'Siddharthnagar', 'Sitapur', 'Sonbhadra', 'Sultanpur', 'Unnao', 'Varanasi'],
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
    "Central Delhi": ["Delhi","Darya Ganj", "Karol Bagh", "Paharganj"],
    "East Delhi": ["Delhi","Gandhi Nagar", "Preet Vihar", "Vivek Vihar"],
    "New Delhi": ["Delhi","Chanakyapuri", "Connaught Place", "Parliament Street"],
    "North Delhi": ["Delhi","Civil Lines", "Kotwali", "Sadar Bazar"],
    "North East Delhi": ["Delhi","Seelampur", "Yamuna Vihar", "Karawal Nagar"],
    "North West Delhi": ["Delhi","Narela", "Model Town", "Rohini"],
    "Shahdara": ["Delhi","Shahdara", "Vivek Vihar", "Krishna Nagar"],
    "South Delhi": ["Delhi","Defence Colony", "Hauz Khas", "Kalkaji"],
    "South East Delhi": ["Delhi","Sarita Vihar", "Kalkaji", "Saket"],
    "South West Delhi": ["Delhi","Dwarka", "Najafgarh", "Vasant Vihar"],
    "West Delhi": ["Delhi","Patel Nagar", "Rajouri Garden", "Punjabi Bagh"],
    'Ambala': ['Ambala-I', 'Ambala-II', 'Barara', 'Naraingarh'],
    'Bhiwani': ['Bawani Khera', 'Bhiwani', 'Loharu', 'Siwani'],
    'Charkhi Dadri': ['Badhra', 'Charkhi Dadri', 'Dadri'],
    'Faridabad': ['Ballabgarh', 'Faridabad', 'Palwal'],
    'Fatehabad': ['Bhattu Kalan', 'Fatehabad', 'Ratia', 'Tohana'],
    'Gurugram': ['Farrukhnagar', 'Gurugram', 'Manesar', 'Sohna'],
    'Hisar': ['Adampur', 'Barwala', 'Hansi', 'Hisar-I', 'Hisar-II', 'Narnaund', 'Uklana'],
    'Jhajjar': ['Bahadurgarh', 'Berli Kalan', 'Jhajjar'],
    'Jind': ['Jind', 'Julana', 'Narwana', 'Safidon'],
    'Kaithal': ['Guhla', 'Kaithal', 'Kalayat', 'Pundri', 'Rajaund'],
    'Karnal': ['Assandh', 'Gharaunda', 'Indri', 'Karnal'],
    'Kurukshetra': ['Pehowa', 'Shahbad', 'Thanesar'],
    'Mahendragarh': ['Ateli', 'Kanina', 'Mahendragarh', 'Nangal Chaudhry', 'Narnaul'],
    'Nuh': ['Ferozepur Jhirka', 'Nagina', 'Nuh', 'Taoru'],
    'Palwal': ['Hathin', 'Hodal', 'Palwal'],
    'Panchkula': ['Panchkula', 'Kalka'],
    'Panipat': ['Israna', 'Panipat', 'Samalkha'],
    'Rewari': ['Bawal', 'Dahina', 'Kosli', 'Rewari'],
    'Rohtak': ['Kalanaur', 'Maham', 'Rohtak'],
    'Sirsa': ['Dabwali', 'Ellenabad', 'Rania', 'Sirsa'],
    'Sonipat': ['Ganaur', 'Gohana', 'Kharkhoda', 'Sonipat'],
    'Yamunanagar': ['Chhachhrauli', 'Jagadhri', 'Radaur'],
    'Bagalkot': ['Badami', 'Bagalkot', 'Bilagi', 'Hungund', 'Jamakhandi'],
    'Ballari': ['Ballari', 'Hospet', 'Kudligi', 'Sandur', 'Siruguppa'],
    'Belagavi': ['Athani', 'Belagavi', 'Chikkodi', 'Gokak', 'Hukkeri', 'Khanapur', 'Ramdurg', 'Raybag', 'Savadatti'],
    'Bengaluru Rural': ['Devanahalli', 'Doddaballapura', 'Hosakote', 'Nelamangala'],
    'Bengaluru Urban': ['Bengaluru North', 'Bengaluru East', 'Bengaluru West', 'Bengaluru South'],
    'Bidar': ['Aurad', 'Basavakalyan', 'Bhalki', 'Bidar', 'Humnabad'],
    'Chamarajanagar': ['Chamarajanagar', 'Gundlupet', 'Kollegal', 'Yelandur'],
    'Chikballapur': ['Bagepalli', 'Chikballapur', 'Chintamani', 'Gauribidanur', 'Sidlaghatta'],
    'Chikmagalur': ['Chikmagalur', 'Kadur', 'Koppa', 'Mudigere', 'Narasimharajapura', 'Sringeri', 'Tarikere'],
    'Chitradurga': ['Challakere', 'Chitradurga', 'Holalkere', 'Hosadurga', 'Molakalmuru'],
    'Dakshina Kannada': ['Bantwal', 'Beltangadi', 'Mangaluru', 'Puttur', 'Sullia'],
    'Davangere': ['Channagiri', 'Davangere', 'Harpanahalli', 'Honnali', 'Jagalur'],
    'Dharwad': ['Dharwad', 'Hubballi', 'Kalghatgi', 'Kundgol', 'Navalgund'],
    'Gadag': ['Gadag-Betigeri', 'Mundargi', 'Nargund', 'Ron', 'Shirhatti'],
    'Hassan': ['Alur', 'Arkalgud', 'Arsikere', 'Belur', 'Channarayapatna', 'Hassan', 'Holenarasipura', 'Sakleshpur'],
    'Haveri': ['Byadagi', 'Hangal', 'Haveri', 'Mundgod', 'Ranebennur', 'Savanur', 'Shiggaon'],
    'Kalaburagi': ['Afzalpur', 'Aland', 'Chincholi', 'Chitapur', 'Kalaburagi', 'Jevargi', 'Sedam'],
    'Kodagu': ['Madikeri', 'Somwarpet', 'Virajpet'],
    'Kolar': ['Bangarapet', 'Kolar', 'Malur', 'Mulbagal', 'Srinivaspur'],
    'Koppal': ['Gangawati', 'Koppal', 'Kushtagi', 'Yelbarga'],
    'Mandya': ['Krishnarajpet', 'Maddur', 'Malavalli', 'Mandya', 'Nagamangala', 'Pandavapura', 'Srirangapatna'],
    'Mysuru': ['Hunsur', 'Krishnarajanagara', 'Mysuru', 'Nanjangud', 'Piriyapatna', 'Tirumakudalu Narasipura'],
    'Raichur': ['Devadurga', 'Lingsugur', 'Manvi', 'Raichur', 'Sindhnur'],
    'Ramanagara': ['Channarayapatna', 'Kanakapura', 'Magadi', 'Ramanagara'],
    'Shivamogga': ['Bhadravati', 'Hosanagara', 'Shikaripura', 'Shivamogga', 'Sorab', 'Thirthahalli'],
    'Tumakuru': ['Gubbi', 'Koratagere', 'Madhugiri', 'Pavagada', 'Sira', 'Tiptur', 'Tumakuru', 'Turuvekere'],
    'Udupi': ['Karkala', 'Kundapura', 'Udupi'],
    'Uttara Kannada': ['Bhatkal', 'Haliyal', 'Karwar', 'Kumta', 'Sirsi', 'Yellapur'],
    'Vijayapura': ['Babaleshwar', 'Basavana Bagewadi', 'Bijapur', 'Indi', 'Muddebihal'],
    'Yadgir': ['Gurmatkal', 'Shahapur', 'Yadgir'],
    'Ahmednagar': ['Ahmednagar', 'Akole', 'Jamkhed', 'Karjat', 'Kopargaon', 'Newasa', 'Pathardi', 'Rahata', 'Rahuri', 'Sangamner', 'Shevgaon', 'Shrigonda', 'Shrirampur', 'Parner'],
    'Akola': ['Akola', 'Akot', 'Balapur', 'Murtizapur', 'Telhara'],
    'Amravati': ['Achalpur', 'Amravati', 'Anjangaon', 'Daryapur', 'Teosa', 'Warud'],
    'Aurangabad': ['Aurangabad', 'Gangapur', 'Kannad', 'Khuldabad', 'Paithan', 'Phulambri', 'Sillod', 'Soegaon', 'Vaijapur'],
    'Beed': ['Ambejogai', 'Ashti', 'Beed', 'Georai', 'Kaij', 'Majalgaon', 'Parli', 'Patoda', 'Wadwani'],
    'Bhandara': ['Bhandara', 'Lakhandur', 'Mohadi', 'Pauni', 'Sakoli', 'Tumsar'],
    'Buldhana': ['Buldhana', 'Chikhli', 'Deulgaon Raja', 'Jalgaon Jamod', 'Khamgaon', 'Lonar', 'Malkapur', 'Mehkar'],
    'Chandrapur': ['Ballarpur', 'Bhadravati', 'Brahmapuri', 'Chandrapur', 'Chimur', 'Gondpipri', 'Korpana', 'Mul', 'Nagbhir', 'Pombhurna', 'Rajura', 'Sawali', 'Warora'],
    'Dhule': ['Dhule', 'Sakri', 'Shirpur'],
    'Gadchiroli': ['Armori', 'Aheri', 'Desaiganj', 'Dhanora', 'Etapalli', 'Gadchiroli', 'Kurkheda', 'Mulchera'],
    'Gondia': ['Amgaon', 'Deori', 'Goregaon', 'Gondia', 'Sadak Arjuni', 'Tirora'],
    'Hingoli': ['Aundha Nagnath', 'Basmath', 'Hingoli', 'Kalamnuri', 'Sengaon'],
    'Jalgaon': ['Amalner', 'Bhadgaon', 'Bhusawal', 'Bodwad', 'Chalisgaon', 'Chopda', 'Dharangaon', 'Erandol', 'Jalgaon', 'Jamner', 'Muktainagar', 'Pachora', 'Parola', 'Yawal'],
    'Jalna': ['Ambad', 'Badnapur', 'Bhokardan', 'Ghansawangi', 'Jafferabad', 'Jalna', 'Mantha', 'Partur'],
    'Kolhapur': ['Ajara', 'Bavani', 'Chandgad', 'Gadhinglaj', 'Hatkangale', 'Kagal', 'Karvir', 'Panhala', 'Radhanagari', 'Shahuwadi'],
    'Latur': ['Ahmadpur', 'Ausa', 'Chakur', 'Deoni', 'Jalkot', 'Latur', 'Nilanga', 'Renapur', 'Shirur-Anantpal', 'Udgir'],
    'Mumbai City': ['Mumbai'],
    'Mumbai Suburban': ['Andheri', 'Borivali', 'Chembur', 'Colaba', 'Dadar', 'Goregaon', 'Kurla', 'Malad', 'Mulund', 'Panvel', 'Thane'],
    'Nagpur': ['Hingna', 'Kamptee', 'Katol', 'Mouda', 'Nagpur', 'Ramtek', 'Savner', 'Umred'],
    'Nanded': ['Ardhapur', 'Bhokar', 'Biloli', 'Deglur', 'Dharmabad', 'Hadgaon', 'Himayatnagar', 'Kandhar', 'Kinwat', 'Loha', 'Mudkhed', 'Mukhed', 'Naigaon', 'Nanded', 'Umri'],
    'Nandurbar': ['Akkalkuwa', 'Akrani', 'Nandurbar', 'Navapur', 'Shahade', 'Taloda'],
    'Nashik': ['Baglan', 'Chandvad', 'Deola', 'Dindori', 'Igatpuri', 'Kalwan', 'Malegaon', 'Nandgaon', 'Nashik', 'Niphad', 'Peint', 'Sinnar', 'Surgana', 'Trimbak', 'Yevla'],
    'Osmanabad': ['Bhum', 'Kalamb', 'Lohara', 'Osmanabad', 'Paranda', 'Tuljapur', 'Umarga', 'Washi'],
    'Palghar': ['Dahanu', 'Jawhar', 'Mokhada', 'Palghar', 'Talasari', 'Vasai-Virar', 'Vikramgad'],
    'Parbhani': ['Gangakhed', 'Jintur', 'Manwath', 'Palam', 'Parbhani', 'Pathri', 'Purna', 'Sailu', 'Sonpeth'],
    'Pune': ['Ambegaon', 'Baramati', 'Daund', 'Haveli', 'Indapur', 'Junnar', 'Khed', 'Maval', 'Mulshi', 'Pune City', 'Purandar', 'Shirur', 'Velhe'],
    'Raigad': ['Alibag', 'Karjat', 'Khalapur', 'Mahad', 'Mangaon', 'Murud', 'Panvel', 'Pen', 'Roha', 'Shrivardhan', 'Tala', 'Uran'],
    'Ratnagiri': ['Chiplun', 'Dapoli', 'Guhagar', 'Khed', 'Lanja', 'Mandangad', 'Rajapur', 'Ratnagiri'],
    'Sangli': ['Atpadi', 'Jat', 'Kavathe Mahankal', 'Khanapur', 'Miraj', 'Palus', 'Shirala', 'Tasgaon', 'Walwa'],
    'Satara': ['Jaoli', 'Karad', 'Khandala', 'Khatav', 'Koregaon', 'Mahabaleshwar', 'Man', 'Patan', 'Phaltan', 'Satara', 'Wai'],
    'Sindhudurg': ['Devgad', 'Dodamarg', 'Kankavli', 'Kudal', 'Malwan', 'Sawantwadi', 'Vengurla'],
    'Solapur': ['Akkalkot', 'Barshi', 'Karmala', 'Madha', 'Malshiras', 'Mangalvedhe', 'Pandharpur', 'Sangole', 'Solapur North', 'Solapur South'],
    'Thane': ['Ambernath', 'Bhiwandi', 'Kalyan', 'Murbad', 'Shahapur', 'Thane', 'Ulhasnagar'],
    'Wardha': ['Arvi', 'Ashti', 'Deoli', 'Hinganghat', 'Samudrapur', 'Seloo', 'Wardha'],
    'Washim': ['Karanja', 'Malegaon', 'Mangrulpir', 'Manora', 'Risod', 'Washim'],
    'Yavatmal': ['Arni', 'Babulgaon', 'Darwha', 'Digras', 'Ghatanji', 'Kalamb', 'Kelapur', 'Mahagaon', 'Maregaon', 'Ner', 'Pandharkawada', 'Pusad', 'Ralegaon', 'Umarkhed', 'Wani', 'Yavatmal', 'Zari-Jamani'],
    'Agra': ['Agra', 'Etmadpur', 'Fatehabad', 'Kheragarh'],
    'Aligarh': ['Aligarh', 'Atrauli', 'Iglas', 'Khair'],
    'Allahabad': ['Allahabad', 'Bara', 'Karchhana', 'Koraon', 'Meja', 'Soraon'],
    'Ambedkar Nagar': ['Akbarpur', 'Jalalpur', 'Tanda'],
    'Amethi': ['Amethi', 'Gauriganj', 'Jagdishpur'],
    'Amroha': ['Amroha', 'Hasanpur','Dhanaura Mandi'],
    'Auraiya': ['Ajitmal', 'Auraiya', 'Bidhuna'],
    'Azamgarh': ['Azamgarh', 'Burhanpur', 'Lalganj', 'Mau'],
    'Baghpat': ['Baghpat', 'Baraut'],
    'Bahraich': ['Bahraich', 'Kaiserganj', 'Mahasi', 'Nanpara'],
    'Ballia': ['Ballia', 'Bansdih', 'Belthara Road', 'Rasra'],
    'Balrampur': ['Balrampur', 'Tulsipur', 'Utraula'],
    'Banda': ['Atarra', 'Baberu', 'Banda', 'Naraini'],
    'Barabanki': ['Barabanki', 'Fatehpur', 'Haidergarh', 'Ramsanehi Ghat', 'Zaidpur'],
    'Bareilly': ['Aonla', 'Baheri', 'Bareilly', 'Faridpur', 'Meerganj', 'Nawabganj'],
    'Basti': ['Basti', 'Bhanpur', 'Harraiya', 'Kaptanganj'],
    'Bhadohi': ['Aurai', 'Gyanpur', 'Sant Ravidas Nagar (Bhadohi)'],
    'Bijnor': ['Bijnor', 'Chandpur', 'Dhampur', 'Nagina', 'Najibabad'],
    'Budaun': ['Badaun', 'Bilsi', 'Bisauli', 'Dataganj'],
    'Bulandshahr': ['Anupshahr', 'Bulandshahr', 'Khurja', 'Siana', 'Sikandrabad'],
    'Chandauli': ['Chakia', 'Chandauli', 'Mughalsarai'],
    'Chitrakoot': ['Karwi', 'Mau', 'Rajapur'],
    'Deoria': ['Bhatpar Rani', 'Deoria', 'Pathardeva', 'Rampur Karkhana'],
    'Etah': ['Aliganj', 'Awagarh', 'Etah', 'Jalesar'],
    'Etawah': ['Auraiya', 'Bidhuna', 'Etawah', 'Jaswantnagar'],
    'Faizabad': ['Bikapur', 'Faizabad', 'Milkipur', 'Rudauli', 'Sohawal'],
    'Farrukhabad': ['Amritpur', 'Farrukhabad', 'Kaimganj'],
    'Fatehpur': ['Bindki', 'Fatehpur', 'Khaga'],
    'Firozabad': ['Firozabad', 'Jasrana', 'Shikohabad', 'Tundla'],
    'Gautam Buddha Nagar': ['Dadri', 'Greater Noida', 'Noida'],
    'Ghaziabad': ['Ghaziabad', 'Loni', 'Modinagar', 'Muradnagar'],
    'Ghazipur': ['Ghazipur', 'Jakhania', 'Mohammadabad', 'Saidpur'],
    'Gonda': ['Colonelganj', 'Gonda', 'Mankapur', 'Tarabganj'],
    'Gorakhpur': ['Bansgaon', 'Campierganj', 'Chauri Chaura', 'Gorakhpur', 'Hathwa', 'Khajni', 'Pipraich'],
    'Hamirpur': ['Hamirpur', 'Maudaha', 'Rath'],
    'Hapur': ['Garhmukteshwar', 'Hapur'],
    'Hardoi': ['Bilgram-Mallawan', 'Hardoi', 'Sandila', 'Sawayajpur'],
    'Hathras': ['Hathras', 'Sadabad', 'Sikandra Rao'],
    'Jalaun': ['Jalaun', 'Kalpi', 'Konch', 'Madhogarh'],
    'Jaunpur': ['Badlapur', 'Jaunpur', 'Kerakat', 'Machhlishahr', 'Mariahu'],
    'Jhansi': ['Baragaon', 'Chirgaon', 'Garautha', 'Jhansi', 'Mauranipur', 'Tehro'],
    'Kannauj': ['Chhibramau', 'Kannauj', 'Tirwa'],
    'Kanpur Dehat': ['Akbarpur', 'Bilhaur', 'Derapur', 'Rasulabad'],
    'Kanpur Nagar': ['Bilhaur', 'Ghatampur', 'Kanpur', 'Sikandra'],
    'Kasganj': ['Amanpur', 'Bilram', 'Kasganj'],
    'Kaushambi': ['Chail', 'Manjhanpur', 'Sirathu'],
    'Kheri': ['Dhaurahra', 'Gola Gokaran Nath', 'Kheri', 'Lakhimpur'],
    'Kushinagar': ['Hata', 'Kaptanganj', 'Khadda', 'Padrauna', 'Tamkuhi Raj'],
    'Lalitpur': ['Lalitpur', 'Mahroni', 'Talbehat'],
    'Lucknow': ['Bakshi Ka Talab', 'Lucknow', 'Malihabad'],
    'Maharajganj': ['Maharajganj', 'Nautanwa', 'Pharenda'],
    'Mahoba': ['Charkhari', 'Kulpahar', 'Mahoba'],
    'Mainpuri': ['Bhogaon', 'Karhal', 'Mainpuri'],
    'Mathura': ['Chhata', 'Mathura', 'Mat', 'Vrindavan'],
    'Mau': ['Ghosi', 'Madhuban', 'Mau'],
    'Meerut': ['Baghpat', 'Kithore', 'Meerut', 'Mawana','Sardhana'],
    'Mirzapur': ['Chunar', 'Lalganj', 'Marihan', 'Mirzapur'],
    'Moradabad': ['Bilari', 'Chandausi', 'Kanth', 'Moradabad', 'Thakurdwara'],
    'Muzaffarnagar': ['Budhana', 'Kairana', 'Khatauli', 'Muzaffarnagar'],
    'Pilibhit': ['Bisalpur', 'Pilibhit'],
    'Pratapgarh': ['Kunda', 'Patti', 'Pratapgarh', 'Raniganj'],
    'Rae Bareli': ['Dalmau', 'Lalganj', 'Rae Bareli', 'Salon'],
    'Rampur': ['Bilaspur', 'Rampur', 'Suar'],
    'Saharanpur': ['Behat', 'Deoband', 'Nakur', 'Saharanpur'],
    'Sambhal': ['Behjoi', 'Chandausi', 'Gunnaur', 'Sambhal'],
    'Sant Kabir Nagar': ['Khalilabad', 'Mehnagar', 'Sant Kabir Nagar'],
    'Shahjahanpur': ['Jalalabad', 'Powayan', 'Shahjahanpur', 'Tilhar'],
    'Shamli': ['Kairana', 'Shamli'],
    'Shravasti': ['Bhinga', 'Ikauna', 'Shravasti'],
    'Siddharthnagar': ['Bansi', 'Domariyaganj', 'Itwa', 'Shohratgarh'],
    'Sitapur': ['Laharpur', 'Mahmoodabad', 'Misrikh', 'Sidhauli', 'Sitapur'],
    'Sonbhadra': ['Robertsganj', 'Sonbhadra'],
    'Sultanpur': ['Amethi', 'Gauriganj', 'Jagdishpur', 'Musafirkhana', 'Sultanpur'],
    'Unnao': ['Bighapur', 'Purwa', 'Safipur', 'Unnao'],
    'Varanasi': ['Pindra', 'Rajatalab', 'Sevapuri', 'Varanasi']


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
                <div className="">
                    <label htmlFor="vendor_institution" className="block text-sm font-medium leading-6 text-gray-900">
                        State
                    </label>

                    <select
                        name='State'
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 valid:[&:not(:placeholder-shown)]:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-gray-300 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]"
                        id="state"
                        value={selectedState}
                        onChange={(e) => handleStateChange(e.target.value)}>
                        <option value="">Please select any option</option>
                        {IndianStates.map((state) => (
                            <option key={state.name} value={state.name}>
                                {state.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="sm:col-span-3">
                <div className="">
                    <label htmlFor="district" className="block text-sm font-medium leading-6 text-gray-900">District:</label>
                    <select name='District'
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 valid:[&:not(:placeholder-shown)]:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-gray-300 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]"
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
                <div className="">
                    <label htmlFor="tehsil" className="block text-sm font-medium leading-6 text-gray-900">Tehsil:</label>
                    <select className='w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 font-normal text-sm outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary' name='Tehsil' id="tehsil" value={selectedTehsil} onChange={(e) => handleTehsilChange(e.target.value)} disabled={!selectedDistrict}>
                        <option value="">Select Tehsil</option>
                        {selectedDistrict && Tehsils[selectedDistrict] && Tehsils[selectedDistrict].map((tehsil) => (
                            <option key={tehsil} value={tehsil}>
                                {tehsil}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="sm:col-span-3">
                <div className="">
                    <label for="Address" className="block text-sm font-medium leading-6 text-gray-900">Address</label>
                    <input
                        type="text"
                        name='Address'
                        value={selectedAddress}
                        onChange={(e) => handleAddressChange(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 valid:[&:not(:placeholder-shown)]:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-gray-300 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]"
                        id="Address"
                        placeholder='Address'
                        aria-describedby="Address" />
                </div>
            </div>
            <div className="sm:col-span-3">
                <div className="">
                    <label for="pincode" className="block text-sm font-medium leading-6 text-gray-900">Pin Code</label>
                    <input
                        type="text"
                        value={selectedPincode}
                        onChange={(e) => handlePinCodeChange(e.target.value)}
                        name='Pin_Code'
                        id='Pin_Code'
                        placeholder='PIN'
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 valid:[&:not(:placeholder-shown)]:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-gray-300 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]"
                        />
                </div>
            </div>
            <div className="sm:col-span-3">
                <div className="">
                    <label for="village"
                        className="block text-sm font-medium leading-6 text-gray-900">Village Name</label>
                    <input
                        type="text"
                        id='Village'
                        name='Village'
                        placeholder='Village Name'
                        onChange={(e) => handleVillageChange(e.target.value)}
                        value={selectedVillage}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-1.5 valid:[&:not(:placeholder-shown)]:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-gray-300 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]"
                        />
                </div>
            </div>


        </>
    );
};

export default Form;
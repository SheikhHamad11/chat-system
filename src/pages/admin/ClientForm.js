import React, { useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';


const initialState = {
  companyName: '',
  websiteUrl: '',
  subscriptionPackage: '',
  industry: '',
  companySize: '',
  officialPhone: '',
  officialEmail: '',
  officialFax: '',
  address: '',
  city: '',
  stateRegion: '',
  zipPostalCode: '',
  country: '',
  annualRevenue: '',
  logo: null,
  groupName: '',
  primaryEmail: '',
  primaryfirstName: '',
  primarylastName: '',
  primaryjobRole: '',
  primaryphone: '',
  secemail: '',
  secfirstName: "",
  seclastName: '',
  secjobRole: '',
  secphone: '',
  loginemail: '',
  password: '',
  language: '',
  profilePic: null

}

const companySizes = ['1-10', '11-20', '31-40', '41-50']
export default function ClientForm() {
  const [clients, setClients] = useState([])
  const [pemailError, setpEmailError] = useState('');
  const [semailError, setsEmailError] = useState('');
  const [loginemailError, setloginEmailError] = useState('');
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Email validation
    if (name === 'primaryEmail') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setpEmailError(emailRegex.test(value) ? '' : 'Invalid email address');
    }
    if (name === 'secemail') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setsEmailError(emailRegex.test(value) ? '' : 'Invalid email address');
    }
    if (name === 'loginemail') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setloginEmailError(emailRegex.test(value) ? '' : 'Invalid email address');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: file,
      // profilePic: file
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Check for email validation errors before submitting
    if (pemailError || semailError || loginemailError) {
      console.log('Form submission failed. Please fix validation errors.');
      return;
    }

    axios.post('http://192.168.60.116:5000/api/client', formData)
      .then((res) => {
        console.log('res', res)
      })
      .catch((err) => {
        console.log('err', err)
      })

    // Send formData to server or perform other actions
    let newData = [...clients, { ...formData }]
    setClients(newData)
    console.log('Form submitted:', formData);
  };

  return (
    <div className='d-flex'>
      <Sidebar />
      <div className="right">
        <div className='container'>
          <h1 className='text-center mt-2'>Client Form</h1>
          <form onSubmit={handleSubmit} className='card shadow border-0 my-3'>
            <div className="row m-3">
              <h3>Basic Info:</h3>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3"><label>Company Name:</label> <input required className='form-control' type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} /></div>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3"><label>Website URL:</label> <input required className='form-control' type="text" name="websiteUrl" value={formData.websiteUrl} onChange={handleInputChange} /></div>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3"><label>Subscription Package: </label> <input required className='form-control' type="number" name="subscriptionPackage" value={formData.subscriptionPackage} onChange={handleInputChange} /></div>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3"><label>Industry:</label> <input required className='form-control' type="text" name="industry" value={formData.industry} onChange={handleInputChange} /></div>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3"><label>Company Size:</label>
                <select className='form-select' name="companySize" value={formData.companySize} onChange={handleInputChange} id="">
                  {companySizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
                {/* <input required className='form-control' type="number" min='1' max='50' name="companySize" value={formData.companySize} onChange={handleInputChange} /> */}
              </div>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3"><label>Official Phone:</label> <input required className='form-control' type="tel" name="officialPhone" value={formData.officialPhone} onChange={handleInputChange} /></div>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3"><label>Official Email:</label> <input required className='form-control' type="email" name="officialEmail" value={formData.officialEmail} onChange={handleInputChange} /></div>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3"><label>Official Fax:</label> <input required className='form-control' type="text" name="officialFax" value={formData.officialFax} onChange={handleInputChange} /></div>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3"><label>Address:</label> <input required className='form-control' type="text" name="address" value={formData.address} onChange={handleInputChange} /></div>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3"><label>City:</label> <input required className='form-control' type="text" name="city" value={formData.city} onChange={handleInputChange} /></div>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3"><label>State/Region:</label> <input required className='form-control' type="text" name="stateRegion" value={formData.stateRegion} onChange={handleInputChange} /></div>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3"><label>Zip/Postal Code:</label> <input required className='form-control' type="number" name="zipPostalCode" value={formData.zipPostalCode} onChange={handleInputChange} /></div>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3"><label>Country:</label> <input required className='form-control' type="text" name="country" value={formData.country} onChange={handleInputChange} /></div>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3"><label>Annual Revenue:</label> <input required className='form-control' type="number" name="annualRevenue" value={formData.annualRevenue} onChange={handleInputChange} /></div>
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3"><label>Logo:</label> <input required className='form-control' type="file" name="logo" onChange={handleFileChange} accept="image/*" /></div>

              <h3>Group Info:</h3>
              <div className='col-12 col-md-6 col-lg-4 col-xxl-3'>
                <label>Groups:</label>
                <input required className='form-control' type="text" name="groupName" value={formData.groupName} onChange={handleInputChange} />
              </div>


              <h3>Primary Contact Info:</h3>
              <div className='col-12 col-md-6 col-lg-4 col-xxl-3'>
                <label>First Name:</label>
                <input required className='form-control' type="text" name="primaryfirstName" value={formData.primaryfirstName} onChange={handleInputChange} />
              </div>
              <div className='col-12 col-md-6 col-lg-4 col-xxl-3'>
                <label>Last Name:</label>
                <input required className='form-control' type="text" name="primarylastName" value={formData.primarylastName} onChange={handleInputChange} />
              </div>
              <div className='col-12 col-md-6 col-lg-4 col-xxl-3'>
                <label>Email:</label>
                <input required className='form-control' type="email" name="primaryEmail" value={formData.primaryEmail} onChange={handleInputChange} />
                {/* Email validation error message */}
                {pemailError && <div style={{ color: 'red' }}>{pemailError}</div>}
              </div>
              <div className='col-12 col-md-6 col-lg-4 col-xxl-3'>
                <label>Job Role:</label>
                <input required className='form-control' type="text" name="primaryjobRole" value={formData.primaryjobRole} onChange={handleInputChange} />
              </div>
              <div className='col-12 col-md-6 col-lg-4 col-xxl-3'>
                <label>Phone:</label>
                <input required className='form-control' type="tel" name="primaryphone" value={formData.primaryphone} onChange={handleInputChange} />
              </div>


              <h3>Secondary Contact Info:</h3>
              <div className='col-12 col-md-6 col-lg-4 col-xxl-3'>
                <label>First Name:</label>
                <input required className='form-control' type="text" name="secfirstName" value={formData.secfirstName} onChange={handleInputChange} />
              </div>
              <div className='col-12 col-md-6 col-lg-4 col-xxl-3'>
                <label>Last Name:</label>
                <input required className='form-control' type="text" name="seclastName" value={formData.seclastName} onChange={handleInputChange} />
              </div>
              <div className='col-12 col-md-6 col-lg-4 col-xxl-3'>
                <label>Email:</label>
                <input required className='form-control' type="email" name="secemail" value={formData.secemail} onChange={handleInputChange} />
                {/* Email validation error message */}
                {semailError && <div style={{ color: 'red' }}>{semailError}</div>}
              </div>
              <div className='col-12 col-md-6 col-lg-4 col-xxl-3'>
                <label>Job Role:</label>
                <input required className='form-control' type="text" name="secjobRole" value={formData.secjobRole} onChange={handleInputChange} />
              </div>
              <div className='col-12 col-md-6 col-lg-4 col-xxl-3'>
                <label>Phone:</label>
                <input required className='form-control' type="tel" name="secphone" value={formData.secphone} onChange={handleInputChange} />
              </div>


              <h3>Login Info:</h3>
              <div className='col-12 col-md-6 col-lg-4 col-xxl-3'>
                <label>Email:</label>
                <input required className='form-control' type="email" name="loginemail" value={formData.loginemail} onChange={handleInputChange} />
                {/* Email validation error message */}
                {loginemailError && <div style={{ color: 'red' }}>{loginemailError}</div>}
              </div>
              <div className='col-12 col-md-6 col-lg-4 col-xxl-3'>
                <label>Password:</label>
                <input required className='form-control' type="tel" name="password" value={formData.password} onChange={handleInputChange} />
              </div>
              <div className='col-12 col-md-6 col-lg-4 col-xxl-3'>
                <label>Language:</label>
                <input required className='form-control' type="text" name="language" value={formData.language} onChange={handleInputChange} />
              </div>
              <div className='col-12 col-md-6 col-lg-4 col-xxl-3'>
                <label>Profile Picture:</label>
                <input required className='form-control' type="file" name="profilePic" onChange={handleFileChange} accept="image/*" />
              </div>
              <div className='text-center'>
                <button className='btn btn-outline-primary w-50 mx-auto my-3' type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div>

      </div>
      {/* <ManageClient clients={clients}/> */}
    </div>
  );
};


import React , {useState} from 'react'
import styles from './signUp.module.scss'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // Toggle password visibility
  };

  return (
     
      <main>
        
        <div className={styles['background-image']}> </div>

     <div className={styles.container}>

      <form className={styles.form}>
        <h1>Register</h1>
        <div className="row mb-3">
          <div className="col-12 col-md-6">
            <input type="text" className="form-control" placeholder="User Name" name="userName" />
          </div>
          <div className="col-12 col-md-6">
            <input type="text" className="form-control" placeholder="Last Name" name="lastName" />
          </div>
        </div>
        
        <div className="row mb-3">
          <div className="col-12">
            <input type="text" className="form-control" placeholder="Phone" name="phone" />
          </div>
        </div>

        <div className="row mb-3">
            <div className="col-12 col-md-6">
              <input
                type={passwordVisible ? 'text' : 'password'} // Toggle between text and password
                className="form-control"
                placeholder="Password"
                name="password"
              />
              <span onClick={togglePasswordVisibility} style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '10px' }}>
                <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
              </span>
            </div>
            <div className="col-12 col-md-6">
              <input
                type={passwordVisible ? 'text' : 'password'} // Toggle between text and password
                className="form-control"
                placeholder="Confirm Password"
                name="confirmPassword"
              />
              <span onClick={togglePasswordVisibility} style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '10px' }}>
                <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
              </span>
            </div>
          </div>


        <div className="row mb-3">
          <div className="col-12 col-md-6">
            <input type="email" className="form-control" placeholder="Email" name="email" />
          </div>
          <div className="col-12 col-md-6">
            <input type="number" className="form-control" placeholder="Age" name="age" />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-12">
            <select className="form-control" name="gender">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-12 col-md-6">
            <input type="text" className="form-control" placeholder="Street" name="street" />
          </div>
          <div className="col-12 col-md-6">
            <input type="text" className="form-control" placeholder="City" name="city" />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-12 col-md-6">
            <input type="text" className="form-control" placeholder="State" name="state" />
          </div>
          <div className="col-12 col-md-6">
            <input type="text" className="form-control" placeholder="Country" name="country" />
          </div>
        </div>

        <button type="submit" className={styles['gradient-button']}>Register</button>

       
      </form>
    </div>
      </main>
    
  )
}

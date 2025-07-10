import React, { useContext, useEffect, useState } from "react";
import { mediaContext } from "../../../../Context/MediaStore";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from './form.module.scss';
import girl from '../../../../images/profile-icon-png-919.png';
import man from '../../../../images/Admin-Profile-Vector-PNG-File.png';
import Button from 'react-bootstrap/Button';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { BaseUrl } from '../../../BaseUrl/base'

const Form = () => {
    const notify = (msg, type) => {
        toast[type](msg, {
            autoClose: 1000,
            theme: 'dark'
        });
    };

    const [loading, setLoading] = useState(false);
    const { userData, saveUserData } = useContext(mediaContext);

    const validationSchema = Yup.object({
        userName:Yup.string().required().min(3).max(15),
        lastName:Yup.string().required().min(3).max(15),
        phone:Yup.string()
        .matches(/^\d{11}$/, 'Phone number must be exactly 11 digits')
        .required('Phone number is required'),     
        email: Yup.string().email('Invalid email').required('Email is required'),
        age: Yup.number().required('Age is required').positive().integer(),
        gender: Yup.string().required('Gender is required'),
        address: Yup.object({
            street: Yup.string().required('Street is required'),
            city: Yup.string().required('City is required'),
            state: Yup.string().required('State is required'),
            country: Yup.string().required('Country is required'),
        }),
        password: Yup.string().required('Password is required')
    });

    const formik = useFormik({
        initialValues: {
            userName: '',
            lastName: '',
            phone: '',
            email: '',
            age: '',
            gender: 'male',
            address: {
                street: '',
                city: '',
                state: '',
                country: ''
            },
            password: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);

            try {
                const response = await fetch(`${BaseUrl}/users/updateUserData`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (!response.ok) {
                    setLoading(false);
                    throw new Error('Failed to update user data, check your password.');
                }

                const data = await response.json();
                notify("User data updated successfully!", 'success');
                localStorage.setItem('token', data.token);
                saveUserData();
                setLoading(false);
            } catch (error) {
                setLoading(false);
                notify(error.message, 'error');
            }
        }
    });

    useEffect(() => {
        if (userData) {
            formik.setValues({
                userName: userData.userName || '',
                lastName: userData.lastName || '',
                phone: userData.phone || '',
                email: userData.email || '',
                age: userData.age || '',
                gender: (userData.gender || 'male').toLowerCase(),
                address: {
                    street: userData.address?.street || '',
                    city: userData.address?.city || '',
                    state: userData.address?.state || '',
                    country: userData.address?.country || ''
                },
                password: ''
            });
        }
    }, [userData]);

    return (
        <>
            <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
                <h2 className={styles.info}>Profile Info</h2>

                <div className={styles.inputGroup}>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="userName">User Name</label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            placeholder="Enter your user name"
                            {...formik.getFieldProps('userName')}
                            className={styles.formInput}
                        />
                        {formik.touched.userName && formik.errors.userName ? (
                            <div className={styles.error}>{formik.errors.userName}</div>
                        ) : null}
                        <i className={`fas fa-user ${styles.inputIcon}`}></i>
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Enter your last name"
                            {...formik.getFieldProps('lastName')}
                            className={styles.formInput}
                        />
                        {formik.touched.lastName && formik.errors.lastName ? (
                            <div className={styles.error}>{formik.errors.lastName}</div>
                        ) : null}
                        <i className={`fas fa-user ${styles.inputIcon}`}></i>
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            placeholder="Enter your phone"
                            {...formik.getFieldProps('phone')}
                            className={styles.formInput}
                        />
                        {formik.touched.phone && formik.errors.phone ? (
                            <div className={styles.error}>{formik.errors.phone}</div>
                        ) : null}
                        <i className={`fas fa-phone ${styles.inputIcon}`}></i>
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            {...formik.getFieldProps('email')}
                            className={styles.formInput}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className={styles.error}>{formik.errors.email}</div>
                        ) : null}
                        <i className={`fas fa-envelope ${styles.inputIcon}`}></i>
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            placeholder="Enter your age"
                            {...formik.getFieldProps('age')}
                            className={styles.formInput}
                        />
                        {formik.touched.age && formik.errors.age ? (
                            <div className={styles.error}>{formik.errors.age}</div>
                        ) : null}
                        <i className={`fas fa-calendar-alt ${styles.inputIcon}`}></i>
                    </div>
                    <div className={styles.inputWrapper}>
                        <label className={styles.label}>Gender</label>
                        <div className={styles.genderWrapper}>
                            <label className={styles.imageLabel}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={formik.values.gender === "male"}
                                    onChange={formik.handleChange}
                                    className={styles.hiddenRadio}
                                />
                                <img
                                    src={man}
                                    alt="Male"
                                    className={`${styles.image} ${formik.values.gender === "male" ? styles.selected : ''}`}
                                />
                            </label>
                            <label className={styles.imageLabel}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={formik.values.gender === "female"}
                                    onChange={formik.handleChange}
                                    className={styles.hiddenRadio}
                                />
                                <img
                                    src={girl}
                                    alt="Female"
                                    className={`${styles.image} p-2 ${formik.values.gender === "female" ? styles.selected : ''}`}
                                />
                            </label>
                        </div>
                        {formik.touched.gender && formik.errors.gender ? (
                            <div className={styles.error}>{formik.errors.gender}</div>
                        ) : null}
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="address.street">Street</label>
                        <input
                            type="text"
                            id="address.street"
                            name="address.street"
                            placeholder="Enter your street"
                            {...formik.getFieldProps('address.street')}
                            className={styles.formInput}
                        />
                        {formik.touched.address?.street && formik.errors.address?.street ? (
                            <div className={styles.error}>{formik.errors.address.street}</div>
                        ) : null}
                        <i className={`fas fa-road ${styles.inputIcon}`}></i>
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="address.city">City</label>
                        <input
                            type="text"
                            id="address.city"
                            name="address.city"
                            placeholder="Enter your city"
                            {...formik.getFieldProps('address.city')}
                            className={styles.formInput}
                        />
                        {formik.touched.address?.city && formik.errors.address?.city ? (
                            <div className={styles.error}>{formik.errors.address.city}</div>
                        ) : null}
                        <i className={`fas fa-building ${styles.inputIcon}`}></i>
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="address.state">State</label>
                        <input
                            type="text"
                            id="address.state"
                            name="address.state"
                            placeholder="Enter your state"
                            {...formik.getFieldProps('address.state')}
                            className={styles.formInput}
                        />
                        {formik.touched.address?.state && formik.errors.address?.state ? (
                            <div className={styles.error}>{formik.errors.address.state}</div>
                        ) : null}
                        <i className={`fas fa-map-marker-alt ${styles.inputIcon}`}></i>
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="address.country">Country</label>
                        <input
                            type="text"
                            id="address.country"
                            name="address.country"
                            placeholder="Enter your country"
                            {...formik.getFieldProps('address.country')}
                            className={styles.formInput}
                        />
                        {formik.touched.address?.country && formik.errors.address?.country ? (
                            <div className={styles.error}>{formik.errors.address.country}</div>
                        ) : null}
                        <i className={`fas fa-flag ${styles.inputIcon}`}></i>
                    </div>
                </div>

                <div className={styles.inputWrapper}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        {...formik.getFieldProps('password')}
                        className={styles.formInput}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className={styles.error}>{formik.errors.password}</div>
                    ) : null}
                    <i className={`fas fa-lock ${styles.inputIcon}`}></i>
                </div>

                <Button type="submit" variant="success" disabled={loading} className={styles.button}>
                    {loading ? <span className="spinner-border spinner-border-sm"></span> : 'Update Profile'}
                </Button>
            </form>
        </>
    );
};

export default Form;

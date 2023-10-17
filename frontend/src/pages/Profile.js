import React, { useState, useEffect, useCallback } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';

import { useAuthContext } from "../hooks/useAuthContext";

import Layout from "../layouts/Layout";
import Banner from "../components/Banner";
import Popup from '../components/Popup';
import { InputField, InputHeader } from '../components/Inputs';
import { RectangleButton } from '../components/Buttons';

import BannerImage from "../assets/post-banner.png";

import { UserCircleIcon, CreditCardIcon, KeyIcon, ArrowPathIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";

export default function Profile() {
    const { user } = useAuthContext();

    const [name, setName] = useState('Fish Ee');
    const [email, setEmail] = useState('fish@gmail.com');
    const [paymentInfo, setPaymentInfo] = useState('1111 2222 3333 4444');

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordScore, setPasswordScore] = useState(0);
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [isAccountActive, setIsAccountActive] = useState(false);
    const [isPaymentActive, setIsPaymentActive] = useState(false);
    const [displayPasswordPopup, setDisplayPasswordPopup] = useState(false);

    async function handleEditProfile() {
        console.log("handle profile!");
    }

    async function handleEditPayment() {
        console.log("handle pay!");
    }

    async function handlePasswordChange(e) {
        e.preventDefault();

        console.log("handle password!");
    }

    return (
        <Layout>
            <section className="grid">
                <Banner image={BannerImage} title="Profile" />
            </section>

            <div className="flex flex-col p-4 gap-2 ">
                <InputHeader title="Account Settings" heroIcon={<UserCircleIcon />} edit active={isAccountActive}
                    onClick={() => {
                        setIsAccountActive((currentIsAccountActive) => {
                            const newIsAccountActive = !currentIsAccountActive;
                            if (!newIsAccountActive) { handleEditProfile(); }
                            return newIsAccountActive;
                        });
                    }} />
                <InputField title="Name" placeholder="Enter Name" type="text"
                    active={isAccountActive} value={name} onChange={(e) => setName(e.target.value)} />
                <InputField title="Email Address" placeholder="Enter Email" type="email"
                    active={isAccountActive} value={email} onChange={(e) => setEmail(e.target.value)} />

                <InputHeader title="Change Password" heroIcon={<KeyIcon />} />
                <div className="self-start">
                    <RectangleButton title="Begin" heroIcon={<ArrowPathIcon />}
                        onClick={() => { setDisplayPasswordPopup(!displayPasswordPopup) }} />
                </div>

                <div className="py-2"></div>

                <InputHeader title="Payment Settings" heroIcon={<CreditCardIcon />} edit active={isPaymentActive}
                    onClick={() => {
                        setIsPaymentActive((currentIsPaymentActive) => {
                            const newIsPaymentActive = !currentIsPaymentActive;
                            if (!newIsPaymentActive) { handleEditPayment(); }
                            return newIsPaymentActive;
                        });
                    }} />
                <InputField title="Payment Info" placeholder="Enter Credit Card Information" type="tel"
                    active={isPaymentActive} value={paymentInfo} onChange={(e) => setPaymentInfo(e.target.value)} />
            </div>

            <Popup title="Change Password"
                variableThatDeterminesIfPopupIsActive={displayPasswordPopup}
                setVariableThatDeterminesIfPopupIsActive={setDisplayPasswordPopup}
                onSubmit={handlePasswordChange}
            >
                <InputField title="Current Password" placeholder="Enter Current Password" type="password" width='full'
                    value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />

                <InputField title="New Password" placeholder="Enter New Password" type="password" width='full'
                    value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

                <PasswordStrengthBar className="-mt-4" password={newPassword} onChangeScore={(passwordScore, feedback) => { setPasswordScore(passwordScore) }}
                    barColors={['#ddd', '#FF0000', '#FFA500', '#00FF00', '#0000FF']}
                    scoreWords={['Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong']}
                />

                <InputField title="Confirm New Password" placeholder="Confirm New Password" type="password" width='full'
                    value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
            </Popup>
        </Layout>
    );
};
// import React from 'react'

// function Otp() {
//   return (
//     <div>
//       <h1>hello otp</h1>
//     </div>
//   )
// }

// export default Otp

import React, { useState, useRef, useEffect } from "react";
import "./Otp.css";

const PhoneVerificationPopup = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showPopup, setShowPopup] = useState(false);
  const inputRefs = useRef([]);

  const handleInput = (index, event) => {
    const { value } = event.target;
    if (isNaN(value)) {
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData("Text");
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      const digit = parseInt(pastedData.charAt(i), 10);
      if (!isNaN(digit)) {
        newOtp[i] = digit;
      }
    }
    setOtp(newOtp);
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (event.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  useEffect(() => {
    if (showPopup) {
      inputRefs.current[0].focus();
    }
  }, [showPopup]);

  return (
    <div>
      <button className="verify-btn" onClick={() => setShowPopup(true)}>
        Verify Phone
      </button>
      {showPopup && (
        <div className="otp-popup">
          <h2 className="popup-title">Phone Varification</h2>
          <h3>Enter the otp you recived on 821xxxxxx8</h3>
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                className="otp-input"
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleInput(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                ref={(ref) => (inputRefs.current[index] = ref)}
              />
            ))}
          </div>
          <div className="twobtns">
            <button className="cancel-btn" onClick={() => setShowPopup(false)}>
              Cancel
            </button>
            <button
              className="verify-btn"
              onClick={() => alert(`OTP entered: ${otp.join("")}`)}
            >
              Verify
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneVerificationPopup;

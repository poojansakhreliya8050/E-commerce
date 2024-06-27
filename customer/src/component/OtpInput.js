import React, { useState, useRef, useEffect } from 'react';

const OtpInput = ({setOtpNumber}) => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    // Focus on next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && otp[index] === "") {
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }
  };
  
  useEffect(() => {
    setOtpNumber(otp.join(''))
  }, [otp])

  return (
    <div className="flex space-x-2">
      {otp.map((data, index) => {
        return (
          <input
            className="w-12 h-12 text-center text-2xl border-2 border-gray-300 rounded-md focus:border-blue-500 outline-none"
            type="text"
            name="otp"
            maxLength="1"
            key={index}
            value={data}
            onChange={e => handleChange(e.target, index)}
            onKeyDown={e => handleKeyDown(e, index)}
            ref={el => (inputRefs.current[index] = el)}
          />
        );
      })}
    </div>
  );
};

export default OtpInput;

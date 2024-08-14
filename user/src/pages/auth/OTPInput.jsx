import React from "react";

const OTPInput = ({ length = 6, onComplete }) => {
  const [otp, setOtp] = React.useState(Array(length).fill(""));
  const inputsRef = React.useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/[^0-9]/.test(value)) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
      onComplete(newOtp.join(""));

    // Move to the next input field if the value is valid
    if (value && index < length - 1) {
      const nextInput = inputsRef.current[index + 1];
      if (nextInput && !otp[index + 1]) {
        nextInput.focus();
      }
    }

    // Call the onComplete function when all digits are entered
    if (newOtp.every((digit) => digit)) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    // Move focus on Backspace or Arrow keys
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleFocus = (index) => {
    // Focus on the input field when it is clicked
    inputsRef.current[index].focus();
  };

  return (
    <div className="flex space-x-2 justify-center">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={() => handleFocus(index)}
          className="w-12 h-12 text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-700 max-sm:w-10 max-sm:h-10 text-center text-xl border rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:outline-none focus:ring-blue-500"
        />
      ))}
    </div>
  );
};

export default OTPInput;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";

const PasswordInput = ({ passcode }: string | any) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className="flex items-center space-x-3">
      <input
        type={showPassword ? "password" : "text"}
        id="password"
        name="password"
        value={passcode}
        className="border-none outline-none text-[20px] font-bold text-white leading-7 bg-transparent"
      />
      <button
        className="border-none outline-none text-[20px] font-medium text-blue-1"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        show
      </button>
    </div>
  );
};

export default PasswordInput;

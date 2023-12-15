"use client"

import  React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {setAuthentication} from "../const/auth"
import axiosInstance from "../interceptors/axios"
import { type } from 'os';


interface ITextInput {
  label?: string;
  placeholder: string;
  value?: any;
  type:any;
  onChange?: (value: any) => void;
}

const TextInput: React.FC<ITextInput> = ({
  label,
  value,
  type,
  placeholder,
  onChange,
}) => {
  return (
    <div className="w-full">
      {label ? <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</p> : null}
      <input
        className="w-full h-11"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        type={type}
      />
    </div>
  );
};

export default TextInput;
import React from 'react';
import FirstFormValidator from '../hooks/FirstFormValidator';

function MyForm() {
  const initialState = {
    name: '',
    lastName: '',
    email: '',
    phone: '',
  };

  const validationRules = {
    name: {
      required: {
        validate: (value) => value.trim() !== '',
        message: 'Name is required.',
      },
    },
    lastName: {
      required: {
        validate: (value) => value.trim() !== '',
        message: 'Last name is required.',
      },
    },
    email: {
      required: {
        validate: (value) => value.trim() !== '',
        message: 'Email is required.',
      },
      emailFormat: {
        validate: (value) =>
          /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value),
        message: 'Invalid email format.',
      },
    },
    phone: {
      required: {
        validate: (value) => value.trim() !== '',
        message: 'Phone is required.',
      },
      phoneFormat: {
        validate: (value) =>
          /^\d{10}$/g.test(value),
        message: 'Invalid phone number format. (10 digits)',
      },
    },
  };

  const { values, errors, handleChange, handleSubmit } = FirstFormValidator(
    initialState,
    validationRules
  );

  return (
    <div className='flex justify-center items-center h-[100vh]'>
      <form onSubmit={handleSubmit} className='bg-[#1a1a1a] text-white w-[400px] h-[400px] flex flex-col justify-center items-center p-10 rounded-xl'>
        <div className='flex flex-col w-[100%] text-center mb-2'>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder='First Name'
            className='rounded-[15px] p-1 mb-2'
          />
          {errors.name && <span>{errors.name}</span>}
        </div>
        <div className='flex flex-col w-[100%] text-center mb-2'>
          <input
            type="text"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            placeholder='Last Name'
            className='rounded-[15px] p-1 mb-2'
          />
          {errors.lastName && <span>{errors.lastName}</span>}
        </div>
        <div className='flex flex-col w-[100%] text-center mb-2'>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder='Email'
            className='rounded-[15px] p-1 mb-2'
          />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div className='flex flex-col w-[100%] text-center mb-2'>
          <input
            type="text"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            placeholder='Phone Number'
            className='rounded-[15px] p-1 mb-2'
          />
          {errors.phone && <span>{errors.phone}</span>}
        </div>
        <button type="submit" className='uppercase font-bold mt-2'>Submit</button>
      </form>
    </div>
  );
}

export default MyForm;

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
        validate: (value) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value),
        message: 'Invalid email format.',
      },
    },
    phone: {
      required: {
        validate: (value) => value.trim() !== '',
        message: 'Phone is required.',
      },
      phoneFormat: {
        validate: (value) => /^\d{5,}$/g.test(value),
        message: 'Invalid phone number format. (Above 5 digits)',
      },
    },
  };

  const { values, errors, handleChange, handleSubmit } = FirstFormValidator(
    initialState,
    validationRules
  );

  return (
    <div className='flex justify-center items-center h-[100vh]'>
      <div className='bg-[#1a1a1a] text-white w-[400px] h-[400px] p-10 rounded-xl'>
        <h1 className='mb-2 mt-[-30px] text-center text-[2rem] uppercase font-bold'>Form Validering</h1>
        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center h-[100%] text-black'>
          <div className='flex flex-col w-[100%] text-center mb-2'>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder='First Name'
              className='rounded-[15px] p-1 mb-2'
            />
            {errors.name && <span className='text-white'>{errors.name}</span>}
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
            {errors.lastName && <span className='text-white'>{errors.lastName}</span>}
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
            {errors.email && <span className='text-white'>{errors.email}</span>}
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
            {errors.phone && <span className='text-white'>{errors.phone}</span>}
          </div>
          <button type="submit" className='uppercase font-bold mt-2 text-white'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default MyForm;
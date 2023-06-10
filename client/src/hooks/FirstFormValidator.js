import { useState } from 'react';

function useFormValidator(initialState, validationRules) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const validationErrors = validateField(name);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationErrors[name],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};
    for (const fieldName in validationRules) {
      if (validationRules.hasOwnProperty(fieldName)) {
        const fieldErrors = validateField(fieldName);
        if (Object.keys(fieldErrors).length > 0) {
          validationErrors = {
            ...validationErrors,
            ...fieldErrors,
          };
          break;
        }
      }
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // Perform form submission logic here
      alert('Form submitted successfully!');
      setValues(initialState); // Clear the form values
      setErrors({}); // Clear the form errors
    }
  };

  const validateField = (fieldName) => {
    const fieldValue = values[fieldName];
    const rules = validationRules[fieldName];
    let fieldErrors = {};
    for (const rule in rules) {
      if (rules.hasOwnProperty(rule)) {
        const isValid = rules[rule].validate(fieldValue);
        if (!isValid) {
          fieldErrors = {
            ...fieldErrors,
            [fieldName]: rules[rule].message,
          };
          break;
        }
      }
    }
    return fieldErrors;
  };

  return { values, errors, handleChange, handleBlur, handleSubmit };
}

export default useFormValidator;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // Perform form submission logic here
      console.log('Form submitted successfully!');
    }
  };

  const validate = () => {
    let validationErrors = {};
    for (const fieldName in validationRules) {
      if (validationRules.hasOwnProperty(fieldName)) {
        const fieldValue = values[fieldName];
        const rules = validationRules[fieldName];
        for (const rule in rules) {
          if (rules.hasOwnProperty(rule)) {
            const isValid = rules[rule].validate(fieldValue);
            if (!isValid) {
              validationErrors = {
                ...validationErrors,
                [fieldName]: rules[rule].message,
              };
              break;
            }
          }
        }
      }
    }
    return validationErrors;
  };

  return { values, errors, handleChange, handleSubmit };
}

export default useFormValidator;

import { useState } from 'react';

function useFormValidator(initialState, validationRules) {
  // Tilstand for formularværdier
  const [values, setValues] = useState(initialState);

  // Tilstand for fejlmeddelelser
  const [errors, setErrors] = useState({});

  // Håndterer ændring af formularværdier
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Håndterer tab af fokus på formularfelter
  const handleBlur = (e) => {
    const { name } = e.target;
    const validationErrors = validateField(name);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationErrors[name],
    }));
  };

  // Håndterer formularindsendelse
  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    // Validerer hvert formularfelt baseret på valideringsreglerne
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

    // Opdaterer fejltilstanden med de valideringsfejl, der blev fundet
    setErrors(validationErrors);

    // Hvis der ikke er nogen valideringsfejl, udføres formularindsendelseslogikken
    if (Object.keys(validationErrors).length === 0) {
      // Udfør logik for formularindsendelse her
      alert('Formular indsendt succesfuldt!');
      setValues(initialState); // Ryd formularværdierne
      setErrors({}); // Ryd formularfejlene
    }
  };

  // Validerer et specifikt formularfelt baseret på valideringsreglerne
  const validateField = (fieldName) => {
    const fieldValue = values[fieldName];
    const rules = validationRules[fieldName];
    let fieldErrors = {};

    // Gennemgår hver valideringsregel for det specifikke formularfelt
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

  // Returnerer de nødvendige værdier og funktioner fra hook'en
  return { values, errors, handleChange, handleBlur, handleSubmit };
}

export default useFormValidator;

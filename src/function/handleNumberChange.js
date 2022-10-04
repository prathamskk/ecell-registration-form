// Test Functions

const regex = /[1-9]{1}[0-9]{9}/;

export const handleNumberChange = (
  e,
  person,
  isValid,
  setPerson,
  setIsValid
) => {
  const name = e.target.name;
  const value = e.target.value;

  // console.log(name, value);

  let result = regex.test(e.target.value);

  if (result) {
    setIsValid({ ...isValid, [name]: true });
  } else {
    setIsValid({ ...isValid, [name]: false });
  }

  setPerson({ ...person, [e.target.name]: value });
};

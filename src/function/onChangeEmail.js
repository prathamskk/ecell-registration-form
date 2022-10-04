const regex = new RegExp(
  "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@sakec.ac.in"
);

export const onChangeEmail = (e, person, isValid, setPerson, setIsValid) => {
  const name = e.target.name;
  const value = e.target.value;

  let result = regex.test(e.target.value);

  if (result) {
    setIsValid({ ...isValid, [name]: true });
  } else {
    setIsValid({ ...isValid, [name]: false });
  }

  setPerson({ ...person, [name]: value });
};

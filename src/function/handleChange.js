export const handleChange = (e, person, setPerson) => {
  const name = e.target.name;
  const value = e.target.value;
  setPerson({ ...person, [name]: value });
};

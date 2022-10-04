export const handleReCaptcha = (e, person, setPerson) => {
  setPerson({ ...person, recaptcha_token: e });
};

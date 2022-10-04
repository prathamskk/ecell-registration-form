import React, { useState, useEffect } from "react";

const isNumberRegx = /\d/;
const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

export default function PasswordValidity({
  setIsValidPassword,
  isvalidPassword,
  password,
  style,
}) {
  const [valid, setvalid] = useState({
    minChar: null,
    number: null,
    specialChar: null,
  });

  let minChar = password.length >= 8 ? true : false;
  let number = isNumberRegx.test(password) ? true : false;
  let specialChar = specialCharacterRegx.test(password) ? true : false;

  useEffect(() => {
    // console.log(minChar, number, specialChar);
    if (minChar && number && specialChar) {
      setIsValidPassword(true); // 1 1 1
    } else if (minChar && number && !specialChar) {
      setIsValidPassword(false); // 1 1 0
    } else if (minChar && !number && specialChar) {
      setIsValidPassword(false); // 1 0 1
    } else if (minChar && !number && !specialChar) {
      setIsValidPassword(false); // 1 0 0
    } else if (!minChar && number && specialChar) {
      setIsValidPassword(false); // 0 1 1
    } else if (!minChar && number && !specialChar) {
      setIsValidPassword(false); // 0 1 0
    } else if (!minChar && !number && specialChar) {
      setIsValidPassword(false); // 0 0 1
    } else {
      setIsValidPassword(false); // 0 0 0
    }
  }, [minChar, number, specialChar]);

  return (
    <div className="password-validity" style={style}>
      <p>Password must contain:</p>
      <ul className="text-muted">
        <PasswordValidityItem
          Valid={minChar}
          text={"Have at least 8 characters"}
        />
        <PasswordValidityItem Valid={number} text={"Have at least 1 number"} />
        <PasswordValidityItem
          Valid={specialChar}
          text={"Have at least 1 special character"}
        />
      </ul>
    </div>
  );
}

function PasswordValidityItem({ text, Valid }) {
  return <li className={Valid ? "text-success" : "text-danger"}>{text}</li>;
}

import {
  InitialState,
  InitialFocused,
  InitialPerf,
  InitialValid,
} from "./InitialStateValues";

export default function handleSubmit(
  e,
  person,
  setPerson,
  perf,
  setPerf,
  setisFocused,
  setIsValid,
  setModal,
  isValid,
  setSubmit
) {
  e.preventDefault();

  if (
    person.name.length >= 2 &&
    person.lname.length >= 2 &&
    person.year != "" &&
    person.division != "" &&
    person.rollno != "" &&
    isValid.phone &&
    isValid.email &&
    perf.first != "" &&
    perf.second != "" &&
    perf.third != "" &&
    person.whyEcell.length >= 2 &&
    person.description.length >= 2 &&
    person.recaptcha_token != ""
  ) {
    let finalperf = JSON.stringify(perf);
    let newPerson = { ...person, preference: finalperf };
    // console.log(newPerson);
    setSubmit(true);
    console.log(e.target);
    const scriptURL = 'https://script.google.com/macros/s/AKfycby31mS5fuSCq8QR6WXH9cHAZjlsk0T9al-OyCjKVJO44liYzRfj/exec'
   
    fetch(scriptURL, { method: 'POST', body: new FormData(e.target)})
    .then((res) => {
      setModal({
        openModal: true,
        resCode: res.status,
      });
      setPerf(InitialPerf);
      setIsValid(InitialValid);
      setisFocused(InitialFocused);
      setPerson(InitialState);
      setSubmit(false);
    });
    // fetch(
    //   "https://zbba6bfl4k.execute-api.ap-south-1.amazonaws.com/dev/ecell/register",
    //   {
    //     method: "POST",
    //     headers: {
    //       //REMEMBER THIS PASS THIS
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(newPerson),
    //   }
    // ).then((res) => {
    //   setModal({
    //     openModal: true,
    //     resCode: res.status,
    //   });
    //   setPerf(InitialPerf);
    //   setIsValid(InitialValid);
    //   setisFocused(InitialFocused);
    //   setPerson(InitialState);
    //   setSubmit(false);
    // });
  }
}

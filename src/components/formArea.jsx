// Imported Packages
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { v4 } from "uuid";

// Imported Hooks

import useWindowDimension from "../hooks/useWindowDimension";
import { useState, useEffect } from "react";

// Imported Icons
import Correct from "../assets/icon/correct.png";
import Failed from "../assets/icon/failed.png";

// Imported InitialStateValues
import {
  InitialState,
  InitialPerf,
  InitialFocused,
  InitialValid,
} from "../function/InitialStateValues";
import { year, Perference, PerferenceOpt } from "../data/data.json";

// Imported Functions
import handleSubmit from "../function/handleSubmit";
import { handleReCaptcha } from "../function/handleReCaptcha";
import { onChangePerf } from "../function/onChangePerf";
import { onChangeEmail } from "../function/onChangeEmail";
import { handleNumberChange } from "../function/handleNumberChange";
import { handleChange } from "../function/handleChange";

export default function FormArea({ setModal }) {
  const { width, height } = useWindowDimension();

  const [person, setPerson] = useState(InitialState);
  const [isFocused, setisFocused] = useState(InitialFocused);
  const [isValid, setIsValid] = useState(InitialValid);
  const [perf, setPerf] = useState(InitialPerf);
  const [submit, setSubmit] = useState(false);

  const [optionlist, setOptionlist] = useState({
    first: PerferenceOpt,
    second: PerferenceOpt,
    third: PerferenceOpt,
  });

  // Focused state

  useEffect(() => {
    if (perf.first != "") {
      let result = optionlist.first.filter((item) => item.value !== perf.first);
      setOptionlist({ ...optionlist, second: result, third: result });
    }
  }, [perf.first]);

  useEffect(() => {
    if (perf.second != "" && perf.second != "none") {
      if (perf.third === "none" && optionlist.third.length === 1) {
        setPerf({ ...perf, third: "" });
      }

      let result = optionlist.second.filter(
        (item) => item.value !== perf.second
      );
      setOptionlist({ ...optionlist, third: result });
    }
    if (perf.second === "none") {
      let result = optionlist.second.filter(
        (item) => item.value === perf.second
      );
      let select = document.querySelector("#third");
      result.splice(0, 0, {
        value: "",
        label: "",
      });
      setOptionlist({ ...optionlist, third: result });
      setPerf({ ...perf, third: "none" });
    }
  }, [optionlist.second, perf.second]);

  // console.log(optionlist.second.length, optionlist.third.length);

  // console.log(perf);

  return (
    <>
      <form
        method="post"
        onSubmit={(e) =>
          handleSubmit(
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
          )
        }
        autoComplete="off"
        aria-labelledby="Application for Membership"
      >
        <div
          className="form-control"
          style={{
            paddingBottom: width < 900 ? "30px" : "",
          }}
        >
          {/* First Name & Last Name */}
          <div className="name-area">
            {/* First Name */}
            <div className="input-group">
              <input
                type="text"
                name="name"
                id="name"
                className="input"
                value={person.name.replace(/[^a-z]/gi, "")}
                // onInput={}
                onChange={(e) => handleChange(e, person, setPerson)}
                required
                aria-required="true"
                placeholder="eg. John"
                style={{
                  textTransform: "capitalize",
                }}
              />
              <label htmlFor="name" className="input-label">
                first name
              </label>
            </div>

            {/* Last Name */}
            <div className="input-group">
              <input
                type="text"
                name="lname"
                id="lname"
                className="input"
                value={person.lname.replace(/[^a-z]/gi, "")}
                onChange={(e) => handleChange(e, person, setPerson)}
                aria-required="true"
                required
                placeholder="eg. Smith"
                style={{
                  textTransform: "capitalize",
                }}
              />
              <label htmlFor="lname" className="input-label">
                Surname
              </label>
            </div>
          </div>

          {/* Year , Divisions & Roll No. */}

          <div className="name-area">
            {/* Year */}
            <div className="input-group">
              <select
                type="text"
                name="year"
                id="year"
                className="input "
                value={person.year}
                onChange={(e) => handleChange(e, person, setPerson)}
                required
                aria-required="true"
                placeholder="eg. BE-1"
              >
                {year.map((items, index) => {
                  return (
                    <option
                      key={index}
                      value={items.value}
                      hidden={index == 0 ? true : false}
                    >
                      {items.label}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="year" className="input-label">
                Year
              </label>
            </div>
            {/* Divison */}
            <div className="input-group">
              <input
                type="text"
                name="division"
                id="division"
                className="input"
                value={person.division
                  .replace(/[^0-9.]/g, "")
                  .replace(/(\..*)\./g, "$1")}
                onChange={(e) => handleChange(e, person, setPerson)}
                required
                aria-required="true"
                placeholder="eg. 1"
                min={1}
              />
              <label htmlFor="division" className="input-label">
                Divison
              </label>
            </div>
            {/* Roll No */}
            <div className="input-group">
              <input
                type="text"
                name="rollno"
                id=" rollno"
                className="input"
                value={person.rollno
                  .replace(/[^0-9.]/g, "")
                  .replace(/(\..*)\./g, "$1")}
                onChange={(e) => handleChange(e, person, setPerson)}
                required
                aria-required="true"
                placeholder="eg. 04 or 35"
              />
              <label htmlFor=" rollno" className="input-label">
                Roll No
              </label>
            </div>
          </div>

          {/* Email */}
          <div className="input-group">
            <input
              type="text"
              name="email"
              id="email"
              className="input email "
              value={person.email}
              onChange={(e) =>
                onChangeEmail(e, person, isValid, setPerson, setIsValid)
              }
              required
              aria-required="true"
              placeholder="eg. example@sakec.ac.in"
              autoComplete="off"
              onFocus={() => {
                setisFocused({ ...isFocused, email: true });
              }}
            />
            <label htmlFor="email" className="input-label">
              email address
            </label>
            {person.email && (
              <img
                src={isValid.email ? Correct : Failed}
                alt=""
                width={20}
                height={20}
                style={{
                  position: "absolute",
                  top: 12.5,
                  right: width < 900 ? 10 : -30,
                }}
              />
            )}
            <div
              className="email-validity"
              style={{
                fontSize: ".75em",
                marginTop: ".8%",
                display: !isValid.email ? "block" : "none",
              }}
            >
              <p
                className="text-danger"
                style={{
                  display: isValid.email ? "none" : "block",
                }}
              >
                Please use your college email address
              </p>
            </div>
          </div>

          {/* Phone Number*/}
          <div className="input-group">
            <input
              type="tel"
              name="phone"
              id="phone"
              className="input"
              value={person.phone}
              maxLength={10}
              onChange={(e) =>
                handleNumberChange(e, person, isValid, setPerson, setIsValid)
              }
              onFocus={(e) => {
                setisFocused({ ...isFocused, [e.target.name]: true });
              }}
              required
              aria-required="true"
            />
            <label htmlFor="phone" className="input-label">
              phone number
            </label>
            {person.phone && (
              <img
                src={isValid.phone ? Correct : Failed}
                alt=""
                width={20}
                height={20}
                style={{
                  position: "absolute",
                  top: 10,
                  right: width < 900 ? 10 : -30,
                }}
              />
            )}
            <div
              className="email-validity"
              style={{
                fontSize: ".75em",
                marginTop: ".8%",
                display: !isValid.phone ? "block" : "none",
              }}
            >
              <p
                className="text-danger"
                style={{
                  display: isValid.phone ? "none" : "block",
                }}
              >
                Please enter your whatsapp number.
              </p>
            </div>
          </div>

          {/* Team Preference */}
          <div className="preferences"></div>
          <div
            style={{
              marginTop: "1%",
            }}
          >
            <div id="preference-container" className="name-area ">
              <div className="input-group">
                <select
                  type="text"
                  name="first"
                  id="first"
                  className="input "
                  value={perf.first}
                  onChange={(e) => onChangePerf(e, perf, setPerf)}
                  required
                  aria-required="true"
                  placeholder="eg. BE-1"
                >
                  {Perference.map((items, index) => {
                    return (
                      <option
                        key={index}
                        value={items.value}
                        hidden={index == 0 ? true : false}
                      >
                        {items.label}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="first" className="input-label">
                  First
                </label>
              </div>

              {/* Second Team Perference*/}

              <div className="input-group">
                <select
                  type="text"
                  name="second"
                  id="second"
                  className="input "
                  value={perf.second}
                  onChange={(e) => onChangePerf(e, perf, setPerf)}
                  required
                  aria-required="true"
                  placeholder="eg. BE-1"
                >
                  {optionlist.second.map((items, index) => {
                    return (
                      <option
                        key={index}
                        value={items.value}
                        hidden={index == 0 ? true : false}
                      >
                        {items.label}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="second" className="input-label">
                  Second
                </label>
              </div>

              {/* Third Team Perference */}

              <div className="input-group">
                <select
                  type="text"
                  name="third"
                  id="third"
                  className="input "
                  value={perf.third}
                  onChange={(e) => onChangePerf(e, perf, setPerf)}
                  required
                  aria-required="true"
                  placeholder="eg. BE-1"
                >
                  {optionlist.third.map((items, index) => {
                    return (
                      <option
                        key={index}
                        value={items.value}
                        hidden={index == 0 ? true : false}
                      >
                        {items.label}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="third" className="input-label">
                  third
                </label>
              </div>
            </div>
            <a
              href="https://ecellsakec.in/faq"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: ".75em",
                color: "#3498DB",
                marginTop: "7.5%",
              }}
            >
              still not sure which team to choose ?
            </a>
          </div>

          {/* Why Ecell */}

          <div className="input-group">
            <textarea
              name="whyEcell"
              id="whyEcell"
              className="input "
              // placeholder={`Give Brief Description of your ${state.company_type}`}
              minLength={2}
              maxLength={500}
              value={person.whyEcell.trimStart()}
              onChange={(e) => handleChange(e, person, setPerson)}
              onFocus={() => {
                setisFocused({ ...isFocused, whyEcell: true });
              }}
              required
              aria-required="true"
            />
            <label htmlFor="whyEcell" className="input-label">
              Why do you want to join e-cell ?
            </label>

            {/* Description Validity */}

            {isFocused.whyEcell && (
              <div
                className="validity"
                style={{
                  fontSize: ".75em",
                }}
              >
                <p
                  className="text-danger"
                  style={{
                    display:
                      person.whyEcell.length >= 2 &&
                      person.whyEcell.length < 500
                        ? "none"
                        : "block",
                  }}
                >
                  Please write about why you want to join e-cell.
                </p>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="input-group">
            <textarea
              name="description"
              id="description"
              className="input "
              // placeholder={`Give Brief Description of your ${state.company_type}`}
              minLength={2}
              maxLength={500}
              value={person.description.trimStart()}
              onChange={(e) => handleChange(e, person, setPerson)}
              onFocus={() => {
                setisFocused({ ...isFocused, description: true });
              }}
              required
              aria-required="true"
              style={{
                fontSize: "0.9em",
              }}
            />
            <label htmlFor="description" className="input-label">
              Past experience or Skill Set
            </label>

            {/* Description Validity */}

            {isFocused.description && (
              <div
                className="validity"
                style={{
                  fontSize: ".7em",
                }}
              >
                <p
                  className="text-danger"
                  style={{
                    display:
                      person.description.length >= 2 &&
                      person.description.length < 500
                        ? "none"
                        : "block",
                  }}
                >
                  Please write about your past experience in and outside sakec
                  or about your skill set
                </p>
              </div>
            )}
          </div>

          {/* ReCAPTCHA */}

          <ReCAPTCHA
            sitekey="6Lekeo0gAAAAANQn_eAw4gHugk-P_V8sdFex94e9"
            name="ReCAPTCHA"
            onChange={(e) => handleReCaptcha(e, person, setPerson)}
            required
            aria-required="true"
            style={{ transform: "scale(0.8)", transformOrigin: "0 0" }}
          />
        </div>

        <div
          style={{
            paddingBottom: width < 900 ? "50px" : "5px",
            marginTop: "1.5%",
          }}
        >
          <button
            type="submit"
            className="register-btn"
            style={{
              backgroundColor: submit ? "rgba(52, 152, 219, 0.7)" : "#3498db",
            }}
          >
            {submit ? <div className="loader"></div> : "register"}
          </button>
        </div>
      </form>
    </>
  );
}

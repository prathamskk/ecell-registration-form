import React, { useEffect } from "react";
import useWindowDimension from "../hooks/useWindowDimension";
import lottie from "lottie-web";
import successfull from "../assets/lotties/successfull.json";
import unsuccessfull from "../assets/lotties/unsuccessfull.json";

export default function Modal({ openModal, resCode }) {
  const { width, height } = useWindowDimension();

  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#success"),
      animationData: resCode == 200 ? successfull : unsuccessfull,
      loop: false,
    });

    let svg = document.querySelectorAll("svg");
    svg.forEach((e, index) => {
      if (index >= 1) {
        // e.style.contentVisibility = "hidden";
        e.style.display = "none";
      }
    });
  }, []);

  return (
    <div
      className="modal"
      style={{
        width: "100%",

        borderRadius: width < 900 ? "20px 20px 0 0" : "20px 0 0 20px",
        background: "#fff",
      }}
    >
      <div className="modal-content">
        {/* <img
          src={resCode == 200 ? checkAnime : crossAnime}
          alt={resCode == 200 ? "check icon" : "cross icon"}
          width={width < 900 ? 175 : 225}
          height={width < 900 ? 175 : 225}
        /> */}
        <div
          id="success"
          style={{
            width: width < 900 ? 175 : 250,
            height: width < 900 ? 175 : 250,
          }}
        />
        <p>
          {resCode == 200
            ? "We look forward to have you in our team. We will get back to you soon."
            : "You have already registered!"}
        </p>
      </div>
    </div>
  );
}

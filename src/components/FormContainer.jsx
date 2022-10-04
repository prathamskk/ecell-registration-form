import React from "react";
import useWindowDimension from "../hooks/useWindowDimension";
import FormArea from "./formArea";

export default function FormContainer({ setModal }) {
  const { width, height } = useWindowDimension();
  return (
    <div
      className="container"
      style={{
        borderRadius: width < 900 ? "20px 20px 0 0" : "20px 0 0 20px",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        className="cont-header"
        style={{
          textAlign: "center",
        }}
      >
        <h1>Application for Membership</h1>
      </div>
      <div className="hr">
        <hr />
      </div>
      <FormArea setModal={setModal} />
    </div>
  );
}

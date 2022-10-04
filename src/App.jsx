import { useState } from "react";
import logo from "./logo.svg";
import SakecEcellLogo from "./assets/svg/SakecEcellLogo";
import SakecLogo from "./assets/svg/SakecLogo";

import useWindowDimension from "./hooks/useWindowDimension";
import SignUp from "./assets/icon/Standup meeting-bro.webp";
import AnimatedBackground from "./components/AnimatedBackground";
import FormContainer from "./components/FormContainer";
import Modal from "./components/Modal";

import logoSakec from "./assets/svg/sakec_logo_white.svg";
import logoEcell from "./assets/svg/e_cell_logo_BLACK_1.svg";

function App() {
  const [modal, setModal] = useState({
    openModal: false,
    resCode: null,
  });

  const { width, height } = useWindowDimension();

  const styles = {
    width: width < 900 ? 130 : 160,
    height: width < 900 ? 140 : 170,
    fill: "#fff",
    // top: 10,
  };

  return (
    <>
      <AnimatedBackground />
      <div
        className="root-container"
        // style={{
        //   height: height,
        // }}
      >
        <header
          style={{
            height: width < 1000 ? "" : "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: width < 1000 ? "0em 2em" : "0 3em",
            }}
          >
            {/* <SakecLogo {...styles} />
             */}
            <div
              style={{
                width: width < 900 ? 85 : 125,
                fill: "#fff",
              }}
            >
              <img src={logoSakec} alt="" width="100%" height="100%" />
            </div>
            <div
              style={{
                width: width < 900 ? 102.5 : 140,
                fill: "#fff",
              }}
            >
              <img src={logoEcell} alt="" width="100%" height="100%" />
            </div>
          </div>
          <div
            style={{
              display: width < 1000 ? "none" : "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={SignUp} alt="" className="sign-up-illustration" />
            {/* <SignUpIllustration /> */}
            <p>Welcome to E-CELL</p>
          </div>
        </header>
        <main
          style={{
            width: "100%",
            height: height < 1000 ? "" : "100%",
          }}
        >
          {modal.openModal ? (
            <Modal {...modal} />
          ) : (
            <FormContainer setModal={setModal} />
          )}
        </main>
      </div>
    </>
  );
}

export default App;

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as ReactDOM from "react-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "../services/firebase";
import { get, getDatabase, ref, update } from "firebase/database";
import styles from "../styles/Home.module.css";


function GameSuitComponent() {
  const [user, setUser] = useState({});
  const [playerScore, setPlayerScore] = useState(0);
  const [compScore, setCompScore] = useState(0);

  let refRockPlayer = useRef("");
  let refRockCom = useRef("");

  let refPaperPlayer = useRef("");
  let refPaperCom = useRef("");

  let refScissorPlayer = useRef("");
  let refScissorCom = useRef("");

  let refResult_label = useRef("");
  let refReset = useRef("");

  let hasil_suit;

  const auth = getAuth(firebase);
  const database = getDatabase(firebase);

  const getDataUserLogin = () => {
    onAuthStateChanged(auth, (dataUser) => {
      if (dataUser) {
        setUser(dataUser);
      }
    });
  };

  let i = 0;
  useEffect(() => {
    if (i === 0) {
      getDataUserLogin();
      i++;
    }
  }, [i]);
  console.info(user);

  let array_com = ["Batu", "Gunting", "Kertas"];

  class comAction {
    static com_choosing() {
      let random_com = Math.floor(Math.random() * 3);
      console.log("com: " + array_com[random_com]);

      let hasil_com = array_com[random_com];

      if (hasil_com === "Batu") {
        const rock_com = refRockCom.current;
        rock_com.classList.add(styles.com_choose_suit);
        console.log(hasil_com, "==> ini hasil suit com");
      } else if (hasil_com === "Kertas") {
        const paper_com = refPaperCom.current;
        paper_com.classList.add(styles.com_choose_suit);
        console.log(hasil_com, "==> ini hasil suit com");
      } else {
        const scissor_com = refScissorCom.current;
        scissor_com.classList.add(styles.com_choose_suit);
        console.log(hasil_com, "==> ini hasil suit com");
      }
      return hasil_com;
    }
  }

  class validate_hasilSuit extends comAction {
    static validate_suit(pilihan_player) {
      let hasil_com = comAction.com_choosing();

      console.log(pilihan_player, "==> ini pilihan suit player");

      console.log("hasil com : " + hasil_com);

      if (
        (hasil_com === "Batu" && pilihan_player === "Kertas") ||
        (hasil_com === "Gunting" && pilihan_player === "Batu") ||
        (hasil_com === "Kertas" && pilihan_player === "Gunting")
      ) {
        if (playerScore === 3 || compScore === 3) {
          alert(
            "The Game Has Reached The Maximum Score, Please Reset The Game!"
          );
          hasil_suit = "GAME END!";
        } else {
          // > Update Player Score
          setPlayerScore(playerScore + 1);

          // > Update total_score in db
          const updateScore = async () => {
            const usersRef = ref(database, "users");
            const snapshot = await get(usersRef);

            const users = [];
            snapshot.forEach((childSnapshot) => {
              const childData = childSnapshot.val();
              users.push({
                ids: childSnapshot.key,
                ...childData,
              });
            });

            // > Cek apakah username dan email sudah digunakan
            const checkData = users.find((data) => data.id === user.uid);
            console.info(checkData);

            if (checkData) {
              const userRef = ref(database, `users/${checkData.ids}`);
              await update(userRef, {
                total_score: checkData.total_score + 10,
              });
              console.info("Score updated successfully");
            }
          };

          // => Jalankan method update point di db
          updateScore();

          // return player win
          hasil_suit = "Player 1 Win";
        }
      } else if (hasil_com === pilihan_player) {
        if (playerScore === 3 || compScore === 3) {
          alert(
            "The Game Has Reached The Maximum Score, Please Reset The Game!"
          );
          hasil_suit = "GAME END!";
        } else {
          // > Update state score user
          setPlayerScore(playerScore + 0);
          setCompScore(compScore + 0);

          // draw
          hasil_suit = "Draw";
        }
      } else {
        if (playerScore === 3 || compScore === 3) {
          alert(
            "The Game Has Reached The Maximum Score, Please Reset The Game!"
          );
          hasil_suit = "GAME END!";
        } else {
          // > Update state score computer
          setCompScore(compScore + 1);

          // return com win
          hasil_suit = "Com Win";
        }
      }

      console.log(hasil_suit);

      return hasil_suit;
    }
  }

  // setelah suit
  const disableButton = (e) => {
    refRockPlayer.disableButton = true;
    refPaperPlayer.disableButton = true;
    refScissorPlayer.disableButton = true;
  };

  // setelah klik reset
  function enableButton() {
    refRockPlayer.disableButton = false;
    refPaperPlayer.disableButton = false;
    refScissorPlayer.disableButton = false;
  }

  // nampilin hasil result
  function showResultLabel() {
    let result_label = refResult_label.current;

    console.log(hasil_suit, "==> hasil suit di showResultLabelFunction");
    console.log(result_label, "==> result label");

    result_label = hasil_suit;

    refResult_label.innerText = result_label;

    console.log(refResult_label, "==> isi refResultLabel");

    // alert(refResult_label.innerText);

    const resultLabel_final = refResult_label.current;
    resultLabel_final.innerText = hasil_suit;
    resultLabel_final.classList.add(styles.lbl_hasil_suit);
  }

  const resetClicked = (e) => {
    e.preventDefault();

    const result = refResult_label.current;

    let rockBtnPlayer = refRockPlayer.current;
    let paperBtnPlayer = refPaperPlayer.current;
    let scissorBtnPlayer = refScissorPlayer.current;

    let rock_com = refRockCom.current;
    let paper_com = refPaperCom.current;
    let scissor_com = refScissorCom.current;

    rockBtnPlayer.classList.remove(styles.btn_choose_suit);
    paperBtnPlayer.classList.remove(styles.btn_choose_suit);
    scissorBtnPlayer.classList.remove(styles.btn_choose_suit);

    rock_com.classList.remove(styles.com_choose_suit);
    paper_com.classList.remove(styles.com_choose_suit);
    scissor_com.classList.remove(styles.com_choose_suit);

    const resultLabel_final = refResult_label.current;
    resultLabel_final.innerText = "VS";

    resultLabel_final.classList.remove(styles.lbl_hasil_suit);

    // > Reset Score Player dan Computer
    setPlayerScore(0);
    setCompScore(0);

    enableButton();
  };

  const conClicked = (e) => {
    e.preventDefault();

    const result = refResult_label.current;

    let rockBtnPlayer = refRockPlayer.current;
    let paperBtnPlayer = refPaperPlayer.current;
    let scissorBtnPlayer = refScissorPlayer.current;

    let rock_com = refRockCom.current;
    let paper_com = refPaperCom.current;
    let scissor_com = refScissorCom.current;

    rockBtnPlayer.classList.remove(styles.btn_choose_suit);
    paperBtnPlayer.classList.remove(styles.btn_choose_suit);
    scissorBtnPlayer.classList.remove(styles.btn_choose_suit);

    rock_com.classList.remove(styles.com_choose_suit);
    paper_com.classList.remove(styles.com_choose_suit);
    scissor_com.classList.remove(styles.com_choose_suit);   

    const resultLabel_final = refResult_label.current;
    resultLabel_final.innerText = "VS";

    resultLabel_final.classList.remove(styles.lbl_hasil_suit);

    enableButton();
  };

  const rockClicked = (e) => {
    e.preventDefault();
    console.log("Batu");

    const rockBtnPlayer = refRockPlayer.current;
    rockBtnPlayer.classList.add(styles.btn_choose_suit);

    console.log(rockBtnPlayer, "==> isi rockBtnPlayer");

    let suitPlayer = "Batu";

    validate_hasilSuit.validate_suit(suitPlayer);

    disableButton();
    showResultLabel();
  };

  const paperClicked = (e) => {
    console.log("Kertas");
    //paper.value = "btn-choose-suit";

    const paperBtnPlayer = refPaperPlayer.current;
    paperBtnPlayer.classList.add(styles.btn_choose_suit);

    console.log(paperBtnPlayer, "==> isi paperBtnPlayer");

    let suitPlayer = "Kertas";

    validate_hasilSuit.validate_suit(suitPlayer);
    disableButton();
    showResultLabel();
  };

  const scissorClicked = (e) => {
    console.log("Gunting");

    const scissorBtnPlayer = refScissorPlayer.current;
    scissorBtnPlayer.classList.add(styles.btn_choose_suit);

    console.log(scissorBtnPlayer, "==> isi scissorBtnPlayer");

    let suitPlayer = "Gunting";

    validate_hasilSuit.validate_suit(suitPlayer);
    disableButton();
    showResultLabel();
  };

  let button;

  if (playerScore === 3 || compScore === 3) {
    button = (
      <>
        <button id="reset-btn" className={styles.btn_suit} onClick={resetClicked}>
          <img
            src="../assets/refresh.png"
            alt="refresh"
            style={{ width: "50px", height: "50px" }}
          />
        </button>
      </>
    );
  } else {
    button = (
      <>
        <button
          id="reset-btn"
          className="btn-suit btn btn-secondary"
          onClick={conClicked}
        >
          CONTINUE
        </button>
      </>
    );
  }

  return (
    <>
      <div className={styles.body_container}>
        <div style={{ width: "100%", textAlign: "left" }}>
          <div className="row" style={{ paddingRight: 0, paddingLeft: 0 }}>
            <div className="col-1">
              {/* <a src="assets/angle-left.png" onClick={handleBack}>
                                
                            </a> */}
            </div>
            <div className="col-1">
              <img
                src="../assets/logo.png"
                alt="logo"
                style={{ width: "50px", height: "50px" }}
              />
            </div>
            <div className="col-10" style={{ paddingTop: "10px" }}>
              ROCK PAPER SCISSOR
            </div>
          </div>
        </div>

        <div
          className="container-player-label"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <div className="row" style={{ paddingRight: 0, paddingLeft: 0 }}>
            <div className="col-5">
              <h4
                style={{
                  fontSize: "20px",
                  textAlign: "right",
                  color: "black",
                  paddingRight: "20%",
                  fontWeight: "bold",
                }}
              >
                PLAYER 1 (Score: {playerScore})
              </h4>
            </div>
            <div className="col-2"></div>
            <div className="col-5">
              <h4
                style={{
                  fontSize: "20px",
                  textAlign: "left",
                  color: "black",
                  paddingLeft: "22%",
                  fontWeight: "bold",
                }}
              >
                COM (Score: {compScore})
              </h4>
            </div>
          </div>
        </div>

        <div
          className="container-icon-rock"
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            paddingTop: "3%",
            marginBottom: "5%",
          }}
        >
          <div className="row" style={{ paddingLeft: 0, paddingRight: 0 }}>
            <div
              className="col-5"
              style={{ textAlign: "right", paddingRight: "10%" }}
            >
              <button
                id="rock-btn"
                onClick={rockClicked}
                ref={refRockPlayer}
                className={styles.btn_suit}
              >
                <img
                  src="../assets/batu.png"
                  alt="batu-player"
                  style={{ width: "100px", height: "100px" }}
                />
              </button>
            </div>
            <div className="col-2"></div>
            <div className="col-5" style={{ paddingRight: "15%" }}>
              <button id="rock-com-btn" className={styles.btn_suit} ref={refRockCom}>
                <img
                  src="../assets/batu.png"
                  alt="batu-com"
                  style={{ width: "100px", height: "100px" }}
                />
              </button>
            </div>
          </div>
        </div>

        <div
          className="container-icon-paper"
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "5%",
          }}
        >
          <div
            className="row"
            style={{ paddingRight: "10%", paddingRight: "0" }}
          >
            <div
              className="col-5"
              style={{ textAlign: "right", paddingRight: "10%" }}
            >
              <button
                id="paper-btn"
                onClick={paperClicked}
                ref={refPaperPlayer}
                className={styles.btn_suit}
              >
                <img
                  src="../assets/kertas.png"
                  alt="kertas-player"
                  style={{ width: "100px", height: "100px" }}
                />
              </button>
            </div>
            <div className="col-2" style={{ textAlign: "center" }}>
              <h1 id="result-label" ref={refResult_label}>
                VS
              </h1>
            </div>
            <div className="col-5" style={{ paddingRight: "15%" }}>
              <button id="paper-com-btn" className={styles.btn_suit} ref={refPaperCom}>
                <img
                  src="../assets/kertas.png"
                  alt="kertas-com"
                  style={{ width: "100px", height: "100px" }}
                />
              </button>
            </div>
          </div>
        </div>

        <div
          className="container-icon-scissor"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <div
            className="row"
            style={{ paddingRight: "10%", paddingRight: "0" }}
          >
            <div
              className="col-5"
              style={{ textAlign: "right", paddingRight: "10%" }}
            >
              <button
                id="scissor-btn"
                onClick={scissorClicked}
                ref={refScissorPlayer}
                className={styles.btn_suit}
              >
                <img
                  src="../assets/gunting.png"
                  alt="gunting-player"
                  style={{ width: "100px", height: "100px" }}
                />
              </button>
            </div>
            <div className="col-2"></div>
            <div className="col-5" style={{ paddingRight: "15%" }}>
              <button
                id="scissor-com-btn"
                className={styles.btn_suit}
                ref={refScissorCom}
              >
                <img
                  src="../assets/gunting.png"
                  alt="gunting-com"
                  style={{ width: "100px", height: "100px" }}
                />
              </button>
            </div>
          </div>
        </div>

        <div style={{ width: "100%", textAlign: "center" }}>
          {button}
          {/* <button id="reset-btn" className="btn-suit" onClick={resetClicked}>
            <img
              src="../assets/refresh.png"
              alt="refresh"
              style={{ width: "50px", height: "50px" }}
            />
          </button> */}
        </div>
      </div>
    </>
  );
}

export default GameSuitComponent;

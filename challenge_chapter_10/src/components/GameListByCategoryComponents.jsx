import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
} from "react-share";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { gameDetail } from "@/redux/actions/game.action";

export default function GameListByCategoryComponent(props) {
  // > router
  const router = useRouter();
  const dispatch = useDispatch();

  const shareUrl = "http://www.google.com"; // facebook gabisa kalo pake url ini

  const [chooseGame, setChooseGame] = useState();

  const dataGame = useSelector((state) => state.gameReducer);

  function handleDetail(e) {
    const arrGame = [];
    if (!localStorage.getItem("token")) {
      router.push("/login");
    } else {
      dataGame.gameListData.forEach((element) => {
        if (element.id === parseInt(e.target.value)) {
          arrGame.push(element);

          localStorage.setItem(element.name, element.name);
        }
      });

      setChooseGame(arrGame);

      router.push("/GameDetail");
    }
  }

  useEffect(() => {
    let dataGameDetail = gameDetail(chooseGame);

    dispatch(dataGameDetail);
  }, [chooseGame]);

  return (
    <>
      <h1 className="text-white">{props.propsCategory}</h1>
      <div className="row align-items-start text-center pb-3">
        {props.propsHandleGame.map((el, idx) => (
          <div className="col-3" key={idx}>
            <button
              className="rounded-3"
              onClick={(e) => handleDetail(e)}
              value={el.id}
              style={{
                background: `url(${el.image})`,
                backgroundSize: "100% 200px",
                backgroundRepeat: "none",
                width: "100%",
                height: "200px",
                opacity: `${
                  localStorage.getItem(el.name) === el.name ? "40%" : "100%"
                }`,
              }}
            >
              <h1 className="text-white fw-bold">
                {localStorage.getItem(el.name) === el.name ? "PLAYED" : ""}
              </h1>
            </button>
            <FacebookShareButton
              url={shareUrl}
              quote={el.name}
              hashtag={"#" + el.name}
            >
              <FacebookIcon size={40} round={true} />
            </FacebookShareButton>

            <WhatsappShareButton
              url={shareUrl}
              quote={el.name}
              hashtag={"#" + el.name}
            >
              <WhatsappIcon size={40} round={true} />
            </WhatsappShareButton>
          </div>
        ))}
      </div>
    </>
  );
}

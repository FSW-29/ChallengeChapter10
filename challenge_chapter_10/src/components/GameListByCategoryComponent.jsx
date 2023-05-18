import React from "react";
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
} from "react-share";

function GameListByCategoryComponent(props) {
  const shareUrl = "http://www.google.com"; // facebook gabisa kalo pake url ini

  return (
    <>
      <h1>{props.propsCategory}</h1>
      <div className="row align-items-start text-center pb-3">
        {props.propsHandleGame.map((el, idx) => (
          <div className="col-3" key={idx}>
            <button
              className="rounded-3"
              onClick={(e) => props.propsHandleDetail(e)}
              value={el.id}
              style={{
                background: `url(${el.image})`,
                backgroundSize: "100% 200px",
                backgroundRepeat: "none",
                width: "100%",
                height: "200px",
              }}
            />
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

export default GameListByCategoryComponent;

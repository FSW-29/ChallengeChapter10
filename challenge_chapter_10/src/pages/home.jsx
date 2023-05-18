import React, { useEffect } from "react";
import NavbarHomeComponent from "../components/NavbarHome";
import { useRouter } from "next/router";
import LandingDefinitionComponent from "../components/LandingDefinitionComponent";
import CarouselGameListComponent from "../components/CarouselGameListComponent";
import GameListByCategoryComponent from "../components/GameListByCategoryComponents";
// import { getAuth, signOut } from "firebase/auth";
// import firebase from "../../services/firebase";

const HomePage = (props) => {
  const array = props.propsArray;
  let racing = [];
  const router = useRouter();
  //const navigate = useNavigate();

  useEffect(() => {
    cekToken();
    // fetchData();
    // console.log(database,'===> isi get database')
    // console.log(authFirebase, '===> isi getAuth')
    // console.log(userId,'===> isi auth current user uid')
  }, []);

  const cekToken = () => {
    if (!localStorage.getItem("token")) {
      let tokenLocal = localStorage.getItem("token");
      console.log(tokenLocal, "masuk ga ya");
      router.push('/login');
      //navigate("/login");
    }
  };

  const handleGameRacing = () => {
    for (let property in array) {
      if (array[property].type === "racing") {
        racing.push(array[property]);
      }
    }
  };

  handleGameRacing();

  const handleDetail = (e) => {
    e.preventDefault();

    //find data berdasarkan select
    const game = array.find((obj) => obj.id === parseInt(e.target.value));
    props.propsGame(game);

    //navigate("/game-detail/" + e.target.value);
  };

  const navigateToGameList = () => {
    //navigate("/game-list");
  };

  return (
    <>
      <NavbarHomeComponent propsPutUsername={props.propsSetUsername} />
      {/* <LandingCarouselComponent />*/}
      <CarouselGameListComponent />
      <LandingDefinitionComponent />
      <div className="bg-dark text-white text-center p-3">
        <GameListByCategoryComponent
          propsCategory={"Top"}
          propsHandleGame={racing}
          propsHandleDetail={handleDetail}
        />
        <button
          type="button"
          class="btn btn-outline-light"
          //onClick={navigateToGameList}
        >
          VIEW MORE
        </button>
      </div>
    </>
  );
};

export default HomePage;

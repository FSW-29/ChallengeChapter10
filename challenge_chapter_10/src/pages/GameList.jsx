import { useEffect } from "react";
import { useSelector } from "react-redux";

import Head from "next/head";
import NavbarLanding from "@/components/NavbarLanding";
import NavbarHome from "@/components/NavbarHome";
import CarouselGameListComponent from "@/components/CarouselGameListComponent";
import GameListByCategoryComponent from "@/components/GameListByCategoryComponents";
import NavbarMainComponent from "@/components/NavbarMainComponent";

export default function GameList() {
  const dataGame = useSelector((state) => state.gameReducer);
  const gameRacing = dataGame.gameListRacing;
  const gamePuzzle = dataGame.gameListPuzzle;
  const gameAction = dataGame.gameListAction;
  const gameNew = dataGame.gameListNew;

  useEffect(() => {
    gameNew;
    gameRacing;
    gamePuzzle;
    gameAction;
  }, []);

  return (
    <>
      <Head>
        <title>Game List</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {localStorage.getItem("token") ? (
        <>
          <NavbarMainComponent />
        </>
      ) : (
        <>
          <NavbarMainComponent />
        </>
      )}
      <section className="h-100 bg-dark pt-3">
        <CarouselGameListComponent />
        <div className="container w-100 mt-5">
          <GameListByCategoryComponent
            propsCategory={"New"}
            propsHandleGame={gameNew}
          />

          <GameListByCategoryComponent
            propsCategory={"Racing"}
            propsHandleGame={gameRacing}
          />

          <GameListByCategoryComponent
            propsCategory={"Puzzle"}
            propsHandleGame={gamePuzzle}
          />

          <GameListByCategoryComponent
            propsCategory={"Action"}
            propsHandleGame={gameAction}
          />
        </div>
      </section>
    </>
  );
}

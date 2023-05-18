import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  gameList,
  gameRacing,
  gamePuzzle,
  gameAction,
  gameNew,
  gameLeaderboard,
} from "@/redux/actions/game.action";
import Head from "next/head";
//import Link from "next/link";
// import 'bootstrap/dist/js/bootstrap';

import CarouselGameListComponent from "@/components/CarouselGameListComponent";
import GameListByCategoryComponent from "@/components/GameListByCategoryComponents";
import LandingDefinitionComponent from "@/components/LandingDefinitionComponent";
import NavbarLanding from "@/components/NavbarLanding";

export default function Home() {
  const dispatch = useDispatch();

  const [game, setGame] = useState();
  const [racing, setRacing] = useState();
  const [puzzle, setPuzzle] = useState();
  const [action, setAction] = useState();
  const [gameTypeNew, setGameTypeNew] = useState();
  const [leaderboard, setLeaderboard] = useState();

  async function getData() {
    const data = await fetch("/api/game/game_list");
    const result = await data.json();
    setGame(result.data);
    manipulationTypeGame(result.data);
  }

  function manipulationTypeGame(dataGame) {
    const typeRacing = [];
    const typePuzzle = [];
    const typeAction = [];
    const typeNew = [];

    dataGame.forEach((element) => {
      if (element.type === "racing") {
        typeRacing.push(element);
      } else if (element.type === "puzzle") {
        typePuzzle.push(element);
      } else if (element.type === "action") {
        typeAction.push(element);
      } else if (element.type === "new") {
        typeNew.push(element);
      }
    });

    setRacing(typeRacing);
    setPuzzle(typePuzzle);
    setAction(typeAction);
    setGameTypeNew(typeNew);
  }

  async function getLeaderboard() {
    const data = await fetch("/api/game/leaderboard");
    const result = await data.json();
    setLeaderboard(result.data);
  }

  useEffect(() => {
    getData();
    getLeaderboard();
  }, []);

  useEffect(() => {
    let dataGameList = gameList(game);
    let dataGameRacing = gameRacing(racing);
    let dataGamePuzzle = gamePuzzle(puzzle);
    let dataGameAction = gameAction(action);
    let dataGameNew = gameNew(gameTypeNew);
    let dataLeaderboard = gameLeaderboard(leaderboard);

    dispatch(dataGameList);
    dispatch(dataGameRacing);
    dispatch(dataGamePuzzle);
    dispatch(dataGameAction);
    dispatch(dataGameNew);
    dispatch(dataLeaderboard);
  }, [game]);

  return (
    <>
      <Head>
        <title>FSW 29</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <NavbarLanding />
        <section className="h-100 bg-dark pt-3">
          <CarouselGameListComponent />
          <LandingDefinitionComponent />
          {/* <GameListByCategoryComponent
            propsCategory={"Top"}
            propsHandleGame={racing}
          /> */}
        </section>
      </main>
    </>
  );
}

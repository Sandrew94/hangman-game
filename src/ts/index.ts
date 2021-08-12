import "../scss/main.scss";
import { takeAPIWord } from "./components/asyncRequest";

class HangManGame {
  constructor(public word: Promise<string | void>) {}
}

const randomWord = takeAPIWord(20);
const hangManNewGame = new HangManGame(randomWord);
console.log(hangManNewGame);

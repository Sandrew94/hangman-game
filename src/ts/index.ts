import "../scss/main.scss";
import { takeAPIWord } from "./components/asyncRequest";

class HangManGame {
  constructor(public word: Promise<string | undefined>) {}
}

const randomWord = takeAPIWord(20);
const hangManNewGame = new HangManGame(randomWord);
console.log(hangManNewGame);

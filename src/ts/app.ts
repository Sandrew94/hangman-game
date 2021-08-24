import "../scss/main.scss";
import { takeAPIWord } from "./components/asyncRequest";
import { HangManGame_Value } from "./components/HangmanGame_Value";

const randomWord = takeAPIWord(20);
new HangManGame_Value(randomWord);

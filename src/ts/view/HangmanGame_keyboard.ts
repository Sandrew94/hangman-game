import { forEachType } from "../utils/exportTypes";

export class HangManGame_Keyboard {
  private keyboardContainer: HTMLDivElement;
  private allKeyboardKey: HTMLInputElement[];
  private label: HTMLInputElement;
  constructor() {
    this.keyboardContainer = document.querySelector(
      ".keyboard_container"
    )! as HTMLDivElement;
    this.createKeys();
    ///////////
    //////////
    this.allKeyboardKey = [
      ...document.querySelectorAll<HTMLInputElement>(".keyboard__key"),
    ];
    this.label = document.querySelector(".label-letter")! as HTMLInputElement;
    this.createInputKey();
  }

  createKeys() {
    const keyLayout: string[] = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      "space",
    ];

    const createKeyboard: forEachType = (key) => {
      const html = `<input type="button" value="${key}" class='keyboard__key'>
      `;
      this.keyboardContainer.insertAdjacentHTML("beforeend", html);
    };

    keyLayout.forEach(createKeyboard);
  }

  createInputKey() {
    this.allKeyboardKey.forEach((htmlKey: HTMLInputElement) => {
      htmlKey.addEventListener("click", () => {
        switch (htmlKey.value) {
          case "space":
            this.label.value += " ";
            break;
          default:
            this.label.value = htmlKey.value;
            break;
        }
        htmlKey.classList.add("back-color", "disable");
      });
    });
  }
}

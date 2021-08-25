import { forEachType } from "../utils/exportTypes";

export class HangManGame_Keyboard {
  constructor() {
    this.createKeys();
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
      const keyboardContainer = document.querySelector(
        ".keyboard_container"
      )! as HTMLDivElement;
      const html = `<input type="button" value="${key}" class='keyboard__key'>
      `;
      keyboardContainer.insertAdjacentHTML("beforeend", html);
    };

    keyLayout.forEach(createKeyboard);
  }

  createInputKey() {
    const allKey: HTMLInputElement[] = [
      ...document.querySelectorAll<HTMLInputElement>(".keyboard__key"),
    ];
    const label = document.querySelector(".label-letter")! as HTMLInputElement;
    allKey.forEach((htmlKey: HTMLInputElement) => {
      htmlKey.addEventListener("click", () => {
        switch (htmlKey.value) {
          case "space":
            label.value += " ";
            break;
          default:
            label.value = htmlKey.value;
            break;
        }
        htmlKey.classList.add("back-color", "disable");
      });
    });
  }
}

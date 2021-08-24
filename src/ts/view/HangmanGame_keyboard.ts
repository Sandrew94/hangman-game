export class HangManGame_Keyboard {
  constructor() {
    this.createKeys();
    this.createInputKey();
  }

  createKeys() {
    const keyLayout = [
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

    keyLayout.forEach((key: string) => {
      const keyboardContainer = document.querySelector(
        ".keyboard_container"
      )! as HTMLDivElement;
      const html = `<input type="button" value="${key}" class='keyboard__key'>
      `;
      keyboardContainer.insertAdjacentHTML("beforeend", html);
    });
  }

  createInputKey() {
    const allKey = document.querySelectorAll(
      ".keyboard__key"
    )! as NodeListOf<Element>;
    const label = document.querySelector(".label-letter")! as HTMLInputElement;
    allKey.forEach((htmlKey: any) => {
      console.log(htmlKey);
      htmlKey.addEventListener("click", () => {
        switch (htmlKey.value) {
          case "space":
            label.value += " ";
            break;
          default:
            label.value = htmlKey.value;
            break;
        }
        htmlKey.classList.toggle("back-color");
      });
    });
  }
}

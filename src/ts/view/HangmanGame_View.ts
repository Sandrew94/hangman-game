export class HangManGame_View {
  constructor(public singleWord: string) {
    this.createHtmlKeyword(singleWord);
  }

  createHtmlKeyword(singleWord: string) {
    const containerLetters = document.querySelector(
      ".words_container"
    )! as HTMLDivElement;

    [...singleWord].forEach((_, idx) => {
      let html = `<span class="words_container-length" data-tag="${idx}">*</span>`;
      containerLetters.insertAdjacentHTML("beforeend", html);
    });
  }

  static wrongDigit(htmlElement: string) {
    const hangman = document.querySelector(htmlElement)! as HTMLDivElement;
    hangman?.classList.remove("hidden");
  }

  winningMessage() {}
}

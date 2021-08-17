export class HangManGame_View {
  constructor(public singleWord: string) {
    this.createHtmlKeyword(singleWord);
  }

  createHtmlKeyword(singleWord: string) {
    const containerLetters = document.querySelector(
      ".words_container"
    )! as HTMLDivElement;

    Array.from(singleWord).forEach((_, idx) => {
      let html = `<span class="words_container-length" data-tag="${idx}">*</span>`;
      containerLetters.insertAdjacentHTML("beforeend", html);
    });
  }

  winningMessage() {}
  wrongDigit() {}
}

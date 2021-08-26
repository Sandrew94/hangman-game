export const takeAPIWord = async function (pullOfWord: number): Promise<void> {
  try {
    const response = await fetch(
      `https://random-word-api.herokuapp.com/word?number=${pullOfWord}`
    );
    return await response.json();
  } catch {
    const input = document.querySelector(".input")! as HTMLInputElement;
    input.classList.add("input-error");
    input.innerHTML =
      "Server Error - Wait some minutes than try to reload the page!";
  }
};

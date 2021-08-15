export const takeAPIWord = async function (pullOfWord: number): Promise<void> {
  const response = await fetch(
    `https://random-word-api.herokuapp.com/word?number=${pullOfWord}`
  );
  return await response.json();
};

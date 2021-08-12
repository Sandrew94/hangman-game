export const takeAPIWord = async function (pullOfWord: number): Promise<void> {
  const response = await fetch(
    `https://random-word-api.herokuapp.com/word?number=${pullOfWord}`
  );
  const data = await response.json();

  const randomArrNum = Math.floor(Math.random() * (data.length + 1));

  data.map((_: string, idx: number, arr: string[]): undefined | string => {
    if (idx - 1 !== randomArrNum) return;
    else {
      console.log(arr[idx]);
      return arr[idx];
    }
  });
};

export function randomColorGenerator() {
  let characters = ['a', 'b', 'c', 'd', 'e', 'f', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let randomColorArray = [];
  for (let i = 0; i < 6; i++) {
    let randomIndex = Math.floor(Math.random() * characters.length);
    randomColorArray.push(characters[randomIndex]);
  }
  return `#${randomColorArray.join('')}`;
}

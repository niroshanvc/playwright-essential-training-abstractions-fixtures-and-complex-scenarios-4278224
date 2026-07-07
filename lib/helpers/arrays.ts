// helper function to select a value from an array
export function randomValueFromArray(array: string[]) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex]!; 
}
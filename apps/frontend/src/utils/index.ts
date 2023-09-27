export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    console.info("Copying to clipboard was successful!");
  } catch (error) {
    console.error("Could not copy text: ", error);
  }
};

export const getRandomItems = <T>(arr: T[], n: number) => {
  // Copy the array and shuffle it using the Fisher-Yates shuffle algorithm
  const shuffled = arr.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Return the first n items from the shuffled array
  return shuffled.slice(0, n);
};

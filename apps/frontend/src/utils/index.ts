export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    console.info("Copying to clipboard was successful!");
  } catch (error) {
    console.error("Could not copy text: ", error);
  }
};

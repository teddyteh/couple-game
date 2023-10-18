import { useMobileBridge } from "@/hooks/useMobileBridge";

export const copyToClipboard = async ({
  shareLink,
  sendMessage,
}: { shareLink: string } & Pick<
  ReturnType<typeof useMobileBridge>,
  "sendMessage"
>) => {
  try {
    const sentMessage = sendMessage({
      action: "copyToClipboard",
      payload: shareLink,
    });
    if (sentMessage) {
      return true;
    }

    await navigator.clipboard.writeText(shareLink);
    console.info("Copying to clipboard was successful!");

    return true;
  } catch (error) {
    console.error("Could not copy text: ", error);
  }

  return false;
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

export const retry = async <T>(
  fn: () => Promise<T>,
  retries: number,
  retryDelay: number
): Promise<T | null> => {
  let attempts = 0;
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  while (attempts < retries) {
    try {
      const result = await fn();
      return result;
    } catch (error) {
      attempts++;
      console.error(`Error (attempt ${attempts}):`, error);
      if (attempts < retries) {
        await delay(retryDelay);
      }
    }
  }

  return null;
};

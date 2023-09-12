export {};

declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage: (data: any) => void;
    };
  }
}

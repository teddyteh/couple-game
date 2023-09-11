import { CSSProperties } from "react";

// Source: https://codingtorque.com/quiz-app-using-javascript/
export const styles: { [key: string]: CSSProperties } = {
    container: {
      padding: 0,
      margin: 0,
      boxSizing: "border-box",
      fontFamily: '"Poppins", sans-serif',
      height: "100vh",
      background: "linear-gradient(184deg,#8754ff,#8E2DE2)",
      position: "relative",
    },
    displayContainer: {
      backgroundColor: "#ffffff",
      padding: "3.1em 1.8em",
      width: "80%",
      maxWidth: "37.5em",
      margin: "0 auto",
      position: "absolute",
      transform: "translate(-50%, -50%)",
      top: "50%",
      left: "50%",
      borderRadius: "0.6em",
    },
    header: {
      marginBottom: "1.8em",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: "0.6em",
      borderBottom: "0.1em solid #c0bfd2",
    },
    timerDiv: {
      backgroundColor: "#e1f5fe",
      width: "7.5em",
      borderRadius: "1.8em",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0.7em 1.8em",
    },
    containerDiv: {
      marginBottom: "1.25em",
      fontWeight: 600,
    },
    question: {
      marginBottom: "1.25em",
      fontWeight: 600,
    },
    options: {
      display: "flex",
      flexDirection: "column",
    },
    optionDiv: {
      fontSize: "0.9em",
      width: "100%",
      padding: "1em",
      margin: "0.3em 0",
      textAlign: "left",
      outline: "none",
      backgroundColor: "transparent",
      border: "1px solid #c0bfd2",
      borderRadius: "0.3em",
      cursor: "pointer",
    },
    selectedOptionDiv: {
      backgroundColor: "#f0f0f0",
    },
    button: {
      fontSize: "1em",
      backgroundColor: "#8754ff",
      color: "#ffffff",
      padding: "0.7em 1.8em",
      borderRadius: "0.3em",
      boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.3)",
      border: "none",
      cursor: "pointer",
    },
    disabledButton: {
      backgroundColor: "#c0bfd2",
      cursor: "not-allowed",
    },
    scoreContainer: {
      top: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    userScore: {
      fontSize: "1.5em",
    },
    restartButton: {
      marginTop: "0.9em",
    },
  };
  
import { Question } from "@/types/question";
import { getRandomItems } from ".";

const DUMMY_QUESTIONS = [
  {
    question: "What is your favorite color?",
    options: ["Red", "Blue", "Green", "Yellow"],
  },
  {
    question: "What is your favorite animal?",
    options: ["Dog", "Cat", "Bird", "Fish"],
  },
];

const QUESTION_COUNT = 5;

export const fetchQuestionsFromURL = async () => {
  try {
    const response = await fetch(
      "https://d101rsr8tfejfu.cloudfront.net/couple-compatibility.json",
      {
        method: "GET",
        mode: "cors",
        cache: "no-store",
      }
    );
    const data = <Question[]>await response.json();
    const randomItems = getRandomItems(data, QUESTION_COUNT);
    return randomItems;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return DUMMY_QUESTIONS;
  }
};

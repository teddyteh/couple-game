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
let cachedQuestions: Question[] | null = null;

const fetchQuestionsFromUrl = async (category: string) => {
  try {
    const response = await fetch(
      `https://d101rsr8tfejfu.cloudfront.net/${category}.json`,
      {
        method: "GET",
        mode: "cors",
        cache: "no-store",
      }
    );
    const questions = <Question[]>await response.json();
    console.info("Fetched questions", questions);
    return questions;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return DUMMY_QUESTIONS;
  }
};

export const fetchQuestions = async (category: string) => {
  if (!cachedQuestions) {
    const questions = await fetchQuestionsFromUrl(category);
    cachedQuestions = questions;
  }

  const randomQuestions = getRandomItems(cachedQuestions, QUESTION_COUNT);
  return randomQuestions;
};

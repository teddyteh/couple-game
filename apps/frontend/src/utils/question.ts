import { Question } from "@/types/question";
import { getRandomItems } from ".";
import { retry } from "./retry";

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
const HISTORY_COUNT = 10;
const cachedQuestions: { [key: string]: Question[] } = {};
const history: { [key: string]: Question[] } = {};

const isQuestions = (payload: any): payload is Question[] =>
  (payload as Question[]).every(
    (question) => question.question && question.options
  );

const fetchQuestionsFromUrl = async (category: string): Promise<Question[]> => {
  return (
    (await retry<Question[]>(
      async () => {
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
        if (!isQuestions) {
          throw new Error("Not quite questions...");
        }

        return questions;
      },
      2,
      500
    )) ?? DUMMY_QUESTIONS
  );
};

export const fetchQuestions = async (category: string) => {
  if (!cachedQuestions[category]) {
    const questions = await fetchQuestionsFromUrl(category);
    cachedQuestions[category] = questions;
  }

  const availableQuestions = cachedQuestions[category].filter(
    (q) => !history[category]?.includes(q)
  );

  // If there are not enough available questions, reset the history for this category
  if (availableQuestions.length < QUESTION_COUNT) {
    delete history[category]; // or set it to an empty array: history[category] = [];

    // Fetch from the entire pool again
    return getRandomItems(cachedQuestions[category], QUESTION_COUNT);
  }

  const randomQuestions = getRandomItems(availableQuestions, QUESTION_COUNT);

  // Update the history
  if (!history[category]) {
    history[category] = [];
  }

  // Add the new random questions to the beginning of the history array
  history[category] = [...randomQuestions, ...history[category]].slice(
    0,
    HISTORY_COUNT
  );

  return randomQuestions;
};

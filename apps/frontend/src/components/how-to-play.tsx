import { FooterComponent } from "./footer";
import { LogoComponent } from "./logo";

export const HowToPlayComponent = () => {
  return (
    <div className="screen-section how-to-play-screen">
      <LogoComponent />
      <button type="button" id="close-how-to" className="close-button">
        X
      </button>
      <h2 className="title">How to play? It's easy and fun...</h2>
      <p className="text">
        Answer to Couple trivia questions and find out how well do you know the
        city of Wapuss! Challenge yourself and share your Couple status with
        your friends (it's not showing off if you back it up).
      </p>

      <p className="text">
        To start playing the Couple trivia game, first, tune to see the coolest
        Wapuus of all the WordCamps. When you are ready, click Start and choose
        the correct answer from the four given options.
      </p>

      <p className="text">
        You will have 10 seconds for each question to choose your answer. After
        the time is up, the next question will load. So, stay tuned, be quick
        and pay attention to the details of each Couple.
      </p>

      <p className="text">
        You will receive one point for each correct answer, and zero points for
        a wrong one. If you are right on the question, the option you choose
        will be green and you will get a point. If your answer is not correct,
        it will turn into red and no extra points for you.
      </p>

      <p className="text">
        When you have finished the Couple trivia, your total score will indicate
        how well you know Wapuus by their city. Enjoy!
      </p>
      <button className="default-button" id="start2">
        Ok. Let's start
      </button>
      <FooterComponent />
    </div>
  );
};

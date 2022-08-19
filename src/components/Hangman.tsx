import { useState } from "react";
type Props = {
  word: string;
  guessesLeft: number;
  guessedWords: string[];
  guessedLetters: string[];
};

export function Hangman() {
  let [words, setWords] = useState([
    "hello",
    "bye",
    "world",
    "javascript",
    "typescript",
  ]);
  let [guessedLetters, setGuessedLetters] = useState<String[]>([]);
  let [guessesLeft, setGuessesLeft] = useState(5);

  let [word, setWord] = useState(
    words[Math.floor(Math.random() * words.length)]
  );

  let showLines = () => {
    let lines = [];
    for (let i = 0; i < word.length; i++) {
      if (guessedLetters.includes(word[i])) {
        lines.push(word[i]);
      } else {
        lines.push("_");
      }
    }
    return lines.join(" ");
  };

  let keyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      let letter = e.key.toLowerCase();
      if (!guessedLetters.includes(letter)) {
        setGuessedLetters([...guessedLetters, letter]);
        if (!word.includes(letter)) {
          setGuessesLeft(guessesLeft - 1);
        }
      }
    }
  };

  let winner = () => {
    let count = 0;
    for (let i = 0; i < word.length; i++) {
      if (guessedLetters.includes(word[i])) {
        count++;
      }
    }
    return count === word.length;
  };

  return (
    <div>
      <h1>Hangman</h1>
      <div className="lines"> {showLines()}</div>
      <div>{window.addEventListener("keydown", keyDown)}</div>
      <h1>Guesses Left: {guessesLeft}</h1>
      <h1>Your Guesses: {guessedLetters.join(" ")}</h1>
      <button className="btn"
        onClick={() => {
          setGuessesLeft(5);
          setGuessedLetters([]);
          setWord(words[Math.floor(Math.random() * words.length)]);
        }
        }
      >
        New Word
      </button>
      {winner() && <h1>You Win!</h1>}
      {guessesLeft <1 && <h1>You Lose! The word was {word}</h1>}
    </div>
  );
}
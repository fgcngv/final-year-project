

// "use client";
// import { useEffect, useState } from "react";

// export function useTypewriter(words: string[], typingSpeed = 100, deletingSpeed = 50, delay = 1500) {
//   const [text, setText] = useState("");
//   const [index, setIndex] = useState(0);
//   const [isDeleting, setIsDeleting] = useState(false);

//   useEffect(() => {
//     const currentWord = words[index % words.length];
//     let timer: NodeJS.Timeout;

//     if (isDeleting) {
//       timer = setTimeout(() => {
//         setText(currentWord.substring(0, text.length - 1));
//         if (text.length - 1 === 0) {
//           setIsDeleting(false);
//           setIndex((prev) => prev + 1);
//         }
//       }, deletingSpeed);
//     } else {
//       timer = setTimeout(() => {
//         setText(currentWord.substring(0, text.length + 1));
//         if (text.length + 1 === currentWord.length) {
//           setTimeout(() => setIsDeleting(true), delay);
//         }
//       }, typingSpeed);
//     }

//     return () => clearTimeout(timer);
//   }, [text, isDeleting, index, words, typingSpeed, deletingSpeed, delay]);

//   return text;
// }









"use client";
import { useEffect, useState } from "react";

export function useTypewriter(words: string[], typingSpeed = 20) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const currentWord = words[index];
    if (!currentWord) return;

    if (text.length < currentWord.length) {
      const timer = setTimeout(() => {
        setText(currentWord.substring(0, text.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timer);
    }

    // Once finished typing last word, stop.
    if (index < words.length - 1) {
      setIndex((prev) => prev + 1);
      setText("");
    }
  }, [text, index, words, typingSpeed]);

  return text;
}

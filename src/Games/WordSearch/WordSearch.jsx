import React, { useState, useEffect } from 'react';
import './WordSearch.css';

const WordSearch = () => {
  const [words, setWords] = useState([]);
  const [grid, setGrid] = useState([]);
  const [foundWords, setFoundWords] = useState([]);

  const [clickedWords,setClickedWords] = useState([]);

  useEffect(() => {
    generateWordSearch();
  }, []);

  const generateWordSearch = () => {
    const nRows = 10;
    const nCols = 10;
    const words = ['MAGNET', 'CHARGES', 'AMPERE', 'CURRENT', 'LAW'];

    const grid = Array.from({ length: nRows }, () =>
      Array.from({ length: nCols }, () => ({
        letter: getRandomLetter(),
        found: false,
      }))
    );

    for (const word of words) {

      const position = getRandomPlace();
      const { row, col } = getRandomPosition(nRows, nCols);

      for (let i = 0; i < word.length; i++) {
        let numRows = row;
        let numCols = col;

        if (position === 'horizontal') {
          numCols += i;
        } else if (position === 'vertical') {
          numRows += i;
        } else if (position === 'diagonal') {
          numCols += i;
          numRows += i;
        }

        if (grid[numRows] && grid[numRows][numCols]) {
          grid[numRows][numCols].letter = word[i];
        }
      }
    }

    setWords(words);
    setGrid(grid);
    setFoundWords([]);
    setClickedWords([]);
  };

  const getRandomLetter = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomI = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomI];
  };

  const getRandomPlace = () => {
    const position = ['horizontal', 'vertical', 'diagonal'];
    const randomI = Math.floor(Math.random() * position.length);
    return position[randomI];
  };

  const getRandomPosition = (nRows, nCols) => {
    const row = Math.floor(Math.random() * nRows);
    const col = Math.floor(Math.random() * nCols);
    return { row, col };
  };
  const handleWordClick = (word, letter) => {
    setClickedWords((prevClickedWords) => [...prevClickedWords, word]);
    console.log(letter);
  };

  const handleChange = (event) => {
    const textareaValue = event.target.value;
    const isWordFound = words.includes((word) => word === textareaValue);

    if (isWordFound) {
      event.target.value = 'found';
    }
  };


  const handleReset = () => {
    generateWordSearch();

  };


  return (
    <div>
      <h1>WORD SEARCH GAME</h1>
     <div className="word-search-grid">
  {grid.length > 0 &&
    grid[0].map((_, colIndex) => (
      <div key={colIndex} className="word-search-column">
        {grid.map((row, rowIndex) => (
          <div
            onClick={() => handleWordClick(row[colIndex].letter)}
            key={rowIndex}
            className={`word-search-cell ${
              row[colIndex].found ? 'found' : ''
            }`}
          >
            {row[colIndex].letter}
          </div>
        ))}
      </div>
    ))}
</div>
<div className="word-search-container">
      <div className="word-list">
        <h3>Words to Find:</h3>
        <ul
        >
          {words.map((word, index) => (
            <li key={index}
            className={clickedWords.includes(word)?'found':''}
          >
              {word}
            </li>
          ))}
        </ul>
      </div>
      </div>
      <div className="found-words">
        <h3>Found Words:</h3>
        <textarea
          value={clickedWords.join('')}
          rows={5}
          cols={20}
          onChange={handleChange}
          className="textarea"
        />
      </div>
      <button onClick={handleReset} className="reset">Reset</button>
    </div>
  );
};

export default WordSearch;

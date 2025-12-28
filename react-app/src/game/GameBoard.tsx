//основна логіка
//зараз не перевіряється друге число
import {useEffect, useState} from "react"

export default function GameBoard() {
    const [matrix, setMatrix] = useState(Array(4).fill(0).map(() => Array(4).fill(0)));
    const [win, setWin] = useState(false);
    const [gameOver, setGameOver] = useState(false);


        const addTwo = (newMatrix) => {
            const percentage = Math.floor(Math.random() * 10)

            let row = Math.floor(Math.random() * 4)
            let cell = Math.floor(Math.random() * 4)

            while (newMatrix[row][cell] !== 0) {
                row = Math.floor(Math.random() * 4)
                cell = Math.floor(Math.random() * 4)
            }

            if (percentage === 9) {
                newMatrix[row][cell] = 4;
            } else {
                newMatrix[row][cell] = 2;
            }
        }

    useEffect(() => {
        setMatrix(prev => {
            const newMatrix = prev.map(row => [...row]);
            addTwo(newMatrix);
            addTwo(newMatrix);
            return newMatrix;
        });
    }, []);

        let changeMatrix = (newMatrix) => {
            let different = false;

            for(let row = 0; row < 4; row++) {
                for (let cell = 0; cell < 4; cell++) {
                    if(newMatrix[row][cell] != matrix[row][cell]) {
                        different = true;
                        break;
                    }
                }
            }
            if (different) {
                setMatrix(newMatrix);
                addTwo(newMatrix);
            }
        }


    const movLeft = () => {
        const newMatrix = matrix.map(row => row.filter(num => num !== 0));

        for (let row = 0; row < 4; row++) {
                while (newMatrix[row].length < 4) {
                    newMatrix[row].push(0)
                }
        }

        for (let row = 0; row < 4; row++) {
            for (let cell = 0; cell < 3; cell++) {
                if(newMatrix[row][cell] === newMatrix[row][cell+1] && newMatrix[row][cell] != 0) {
                    newMatrix[row][cell] += newMatrix[row][cell+1]
                    newMatrix[row][cell+1] = 0
                    cell++;
                }
            }
        }

        newMatrix.map(row => row.filter(num => num !== 0));
        for (let row = 0; row < 4; row++) {
            while (newMatrix[row].length < 4) {
                newMatrix[row].push(0)
            }
        }

        changeMatrix(newMatrix)
        winFunc(newMatrix)
        if(gameOverFunc(newMatrix)) {
            setGameOver(true)
        }
    }

    const movRight = () => {
        const newMatrix = matrix.map(row => row.filter(num => num !== 0));

        for (let row = 0; row < 4; row++) {
            while (newMatrix[row].length < 4) {
                    newMatrix[row].unshift(0)
            }
        }

        for (let row = 0; row < 4; row++) {
            for (let cell = 3; cell >= 0; cell--) {
                if(newMatrix[row][cell] === newMatrix[row][cell-1] && newMatrix[row][cell] != 0) {
                    newMatrix[row][cell] += newMatrix[row][cell-1]
                    newMatrix[row][cell-1] = 0
                    cell--;
                }
            }
        }

        newMatrix.map(row => row.filter(num => num !== 0));
        for (let row = 0; row < 4; row++) {
            while (newMatrix[row].length < 4) {
                newMatrix[row].unshift(0)
            }
        }

        changeMatrix(newMatrix)
        winFunc(newMatrix)
        if(gameOverFunc(newMatrix)) {
            setGameOver(true)
        }
    }

    const movUp = () => {
        const newMatrix = Array(4).fill(0).map(() => Array(4).fill(0));


        for (let col = 0; col < 4; col++) {
            let column = [];
        for (let row = 0; row < 4; row++) {
            if(matrix[row][col] != 0) {
                column.push(matrix[row][col]);
            }
           }

            for (let cell = 0; cell < column.length - 1; cell++) {
                if(column[cell] === column[cell + 1] && column[cell] != 0) {
                    column[cell] += column[cell+1];
                    column[cell+1] = 0;
                    cell++;
                }
            }

            column = column.filter(num => num !== 0);
            while (column.length < 4) column.push(0);

            for (let row = 0; row < 4; row++) {
                newMatrix[row][col] = column[row];
            }

        }

        changeMatrix(newMatrix)
        winFunc(newMatrix)
        if(gameOverFunc(newMatrix)) {
            setGameOver(true)
        }
    }

    const movDown = () => {
        const newMatrix = Array(4).fill(0).map(() => Array(4).fill(0));


        for (let col = 0; col < 4; col++) {
            let column = [];
            for (let row = 0; row < 4; row++) {
                if(matrix[row][col] != 0) {
                    column.push(matrix[row][col]);
                }
            }

            for (let cell = 0; cell < column.length - 1; cell++) {
                if(column[cell] === column[cell + 1] && column[cell] != 0) {
                    column[cell] += column[cell+1];
                    column[cell+1] = 0;
                    cell++;
                }
            }

            column = column.filter(num => num !== 0);
            while (column.length < 4) column.unshift(0);

            for (let row = 0; row < 4; row++) {
                newMatrix[row][col] = column[row];
            }

        }

        changeMatrix(newMatrix)
        winFunc(newMatrix)
        if(gameOverFunc(newMatrix)) {
            setGameOver(true)
        }
    }


    let winFunc = (newMatrix) => {
        for(let row = 0; row < 4; row++) {
            for (let cell = 0; cell < 4; cell++) {
                if(newMatrix[row][cell] === 2048) {
                    setWin(true)
                }
            }
        }
    }

    let gameOverFunc = (newMatrix) => {
        for(let row = 0; row < 4; row++) {
            for (let cell = 0; cell < 4; cell++) {
                if(newMatrix[row][cell] === 0) {
                    return false;
                }
            }}

        for(let row = 0; row < 4; row++) {
            for (let cell = 0; cell < 3; cell++) {
                if(newMatrix[row][cell] === newMatrix[row][cell+1]){
                    return false;
                }
            }
        }

        for(let cell = 0; cell < 4; cell++) {
            for(let row = 0; row < 3; row++) {
                if (newMatrix[row][cell] === newMatrix[row + 1][cell]) {
                    return false;
                }
            }
        }

        return true;
    }


    return (
        <div>
            <div className="background">
                {matrix.map((row, indexRow) => (
                    <div key={indexRow}>
                        {row.map((cell, indexCell) => (
                            <span className="cell" key={indexCell}>
                            {cell !== 0 ? cell : ""}
                        </span>
                        ))}
                    </div>
                ))}
            </div>


            {win && <h3 className="win-card">YOU WIN 🎉</h3>}
            {gameOver && <h3 className="gameover-card">GAME OVER</h3>}


            <button onClick={movLeft}>Left</button>
            <button onClick={movRight}>Right</button>
            <button onClick={movUp}>Up</button>
            <button onClick={movDown}>Down</button>
        </div>
    );

}

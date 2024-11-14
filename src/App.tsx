import React, { useState } from 'react';
import './App.css';
import ArrayBars from './utils/ArrayBars'

const generateArray = (arrSize: number) => Array.from({ length: arrSize }, () => Math.floor(Math.random() * (100 - 5 + 1) * 5));

const App = () => {
    const [arr, setArr] = useState<Array<number>>(generateArray(20));
    const [arrSize, setArrSize] = useState<number>(20);
    const [isSorting, setIsSorting] = useState(false);
    const [highlighted, setHighlighted] = useState<Array<number>>([]);

    const newArray = () => {
        if (isSorting) return;
        setArr(generateArray(arrSize));
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isSorting) return;
        const newSize = parseInt(e.target.value, 10);
        setArrSize(newSize);
        setArr(generateArray(newSize));
    };

    const bubbleSort = async () => {
        setIsSorting(true);
        let array = [...arr];

        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - 1; j++) {
                setHighlighted([j, j + 1]);
                if (array[j] > array[j + 1]) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    setArr([...array]);
                }
                await new Promise((resolve) => setTimeout(resolve, 100));
                setHighlighted([]);
                }
            }
            setIsSorting(false);
        };
    

    return (
        <div>
            <ArrayBars arr={arr} arrSize={arrSize} highlighted={highlighted}/>
            <button onClick={newArray}>Generate New Array</button>
            <button onClick={bubbleSort}>Bubble Sort</button>
            <div>
                <label>Array Size: {arrSize}</label>
                <input
                    type="range"
                    min="10"
                    max="90"
                    value={arrSize}
                    onChange={handleSliderChange}
                    disabled={isSorting}
                />
            </div>
        </div>
    )
};

export default App;
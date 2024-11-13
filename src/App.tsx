import React, { useState } from 'react';
import './App.css';
import ArrayBars from './utils/ArrayBars'

const generateArray = (arrSize: number) => Array.from({ length: arrSize }, () => Math.floor(Math.random() * (100 - 5 + 1) * 5));

const App = () => {
    const [arr, setArr] = useState<Array<number>>(generateArray(20));
    const [arrSize, setArrSize] = useState<number>(20);

    const newArray = () => setArr(generateArray(arrSize));

    const toggleSize = () => {
        setArrSize(arrSize === 20 ? 120 : 20 );
        setArr(generateArray(arrSize === 20 ? 120 : 20));
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = parseInt(e.target.value, 10);
        setArrSize(newSize);
        setArr(generateArray(newSize));
    };

    return (
        <div>
            <ArrayBars arr={arr} arrSize={arrSize} />
            <button onClick={newArray}>Generate New Array</button>
            <button>Bubble Sort</button>
            <div>
                <label>Array Size: {arrSize}</label>
                <input
                    type="range"
                    min="10"
                    max="90"
                    value={arrSize}
                    onChange={handleSliderChange}
                />
            </div>
        </div>
    )
};

export default App;
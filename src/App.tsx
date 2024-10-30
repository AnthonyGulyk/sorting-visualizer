import React, { useState } from 'react';
import './App.css';
import AllButtons from './buttons/AllButtons'
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

    return (
        <div>
            <ArrayBars arr={arr} arrSize={arrSize} />
            <button onClick={newArray}>Generate New Array</button>
            <button onClick={toggleSize}>Toggle Array Size</button>
        </div>
    )
};

export default App;

import React, { useState, useRef } from 'react';
import './App.css';
import ArrayBars from './utils/ArrayBars'

const generateArray = (arrSize: number) => Array.from({ length: arrSize }, () => Math.floor(Math.random() * (100 - 5 + 1) * 5));

const App = () => {
    const [arr, setArr] = useState<Array<number>>(generateArray(20));
    const [arrSize, setArrSize] = useState<number>(20);
    const [isSorting, setIsSorting] = useState(false);
    const [highlighted, setHighlighted] = useState<Array<number>>([]);
    const [sorted, setSorted] = useState<Array<number>>([]);
    const maxSpeedSlider = 1000;
    const [speed, setSpeed] = useState<number>((maxSpeedSlider/2) + 5);
    const speedRef = useRef(speed);
    speedRef.current = speed;
    const abortSortingRef = useRef(false)

    const newArray = () => {
        if (isSorting) return;        
        setHighlighted([]);
        setSorted([]);
        setArr(generateArray(arrSize));
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isSorting) return;
        const newSize = parseInt(e.target.value, 10);
        setArrSize(newSize);
        setArr(generateArray(newSize));
        setHighlighted([]);
        setSorted([]);
    };

    const bubbleSort = async () => {
        if (isSorting) return;
        setIsSorting(true);
        setHighlighted([]);
        setSorted([]);
        abortSortingRef.current = false;

        let array = [...arr];
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                if (abortSortingRef.current) {
                    setIsSorting(false);
                    return;
                } 
                setHighlighted([j, j + 1]);
                if (array[j] > array[j + 1]) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    setArr([...array]);
                }
                await new Promise((resolve) => setTimeout(resolve, maxSpeedSlider - speedRef.current));
                setHighlighted([]);
                }
                setSorted((prev) => [...prev, array.length - i - 1]);
            }
            setSorted(Array.from({ length: array.length }, (_, index) => index));
            setIsSorting(false);
        };

    const selectionSort = async () => {
        if (isSorting) return;
        setIsSorting(true);
        setHighlighted([]);
        setSorted([]);
        abortSortingRef.current = false;

        let array = [...arr];
        for (let i = 0; i < array.length; i++) {
            if (abortSortingRef.current) {
                setIsSorting(false);
                return;
            }

            let minIndex = i;
            setHighlighted([i]);

            for (let j = i + 1; j < array.length; j++) {
                if (abortSortingRef.current) {
                    setIsSorting(false);
                    return;
                }

                setHighlighted([minIndex, j]);

                if (array[j] < array[minIndex]) {
                    minIndex = j;
                }

                await new Promise((resolve) => setTimeout(resolve, maxSpeedSlider - speedRef.current));
            }

            if (minIndex !== i) {
                [array[i], array[minIndex]] = [array[minIndex], array[i]];
                setArr([...array]);
            }

            setSorted((prev) => [...prev, i]);
            setHighlighted([]);
        }

        setSorted(Array.from({ length: array.length }, (_, index) => index));
        setIsSorting(false);

    };

    const insertionSort = async () => {
        if (isSorting) return;
        setIsSorting(true);
        setHighlighted([]);
        setSorted([]);
        abortSortingRef.current = false;

        let array = [...arr];
        for (let i = 0; i < array.length; i++) {
            if (abortSortingRef.current) {
                setIsSorting(false);
                return;
            }

            let j = i - 1;
            setHighlighted([i])
            await new Promise((resolve) => setTimeout(resolve, maxSpeedSlider - speedRef.current));
            while (array[j] > array[j+1] && j >= 0) {
                if (isSorting) return;
                [array[j+1], array[j]] = [array[j], array[j+1]];
                j = j - 1;
                setHighlighted([i,j])
                setArr([...array]);
                await new Promise((resolve) => setTimeout(resolve, maxSpeedSlider - speedRef.current));
            }
            setSorted((prev) => [...prev, i]);
            await new Promise((resolve) => setTimeout(resolve, maxSpeedSlider - speedRef.current));

        }

        setSorted(Array.from({ length: array.length }, (_, index) => index));
        setIsSorting(false);
    }


    const stopSorting = () => {
        abortSortingRef.current = true;
    };
    

    return (
        <div>
            <ArrayBars arr={arr} arrSize={arrSize} highlighted={highlighted} sorted={sorted}/>
            <div className="btns">
                <button onClick={newArray} className="new-array-button">Generate New Array</button>
                <button onClick={bubbleSort}>Bubble Sort</button>
                <button onClick={selectionSort}>Selection Sort</button>
                <button onClick={insertionSort}>Insertion Sort</button>
                <button onClick={stopSorting} className="stop-button">Stop</button>
            </div>
            <div className="sliders">
                <div className="slider-group">
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
                <div className="slider-group">
                    <label>Speed: {maxSpeedSlider - speed + 5}ms</label>
                    <input
                        type="range"
                        min="5"
                        max={maxSpeedSlider}
                        step="5"
                        value={speed}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                    />
                </div>
            </div>
        </div>
    )
};

export default App;
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
            setSorted((prev) => [...prev, i]);
            while (array[j] > array[j+1] && j >= 0) {
                if (abortSortingRef.current) {
                    setIsSorting(false);
                    return;
                }
                
                [array[j+1], array[j]] = [array[j], array[j+1]];
                j = j - 1;
                setHighlighted([j+1])
                setArr([...array]);
                await new Promise((resolve) => setTimeout(resolve, maxSpeedSlider - speedRef.current));
            }
        }
        setSorted(Array.from({ length: array.length }, (_, index) => index));
        setHighlighted([])
        setIsSorting(false);
    }

    const mergeSort = async () => { 
        if (isSorting) return;
        setIsSorting(true);
        setHighlighted([]);
        setSorted([]);
        abortSortingRef.current = false; 

        let array = [...arr];
        await divideAndMerge(array, 0, array.length - 1);
        if (abortSortingRef.current = false) {
            setSorted(Array.from({ length: array.length }, (_, index) => index));
        }
        setIsSorting(false);
    };

    const divideAndMerge = async (array: number[], start: number, end: number) => {
        if (abortSortingRef.current) {
            setIsSorting(false);
            return;
        }
        if (start >= end) return;

        const mid = Math.floor((start + end) / 2);

        await divideAndMerge(array, start, mid);
        await divideAndMerge(array, mid+1, end);

        await merge(array, start, mid, end);
    };

    const merge = async (array: number[], start: number, mid: number, end: number) => {
        if (abortSortingRef.current) {
            setIsSorting(false);
            return;
        }
        const left = array.slice(start, mid + 1);
        const right = array.slice(mid + 1, end + 1);

        let i = 0, j = 0, k = start;

        while (i < left.length && j < right.length) {
            setHighlighted([start + i, mid + 1 + j]);
            await new Promise((resolve) => setTimeout(resolve, maxSpeedSlider - speedRef.current));

            if (left[i] <= right [j]) {
                array[k] = left[i];
                i++;
            } else {
                array[k] = right[j];
                j++;
            }
            k++;
            setArr([...array]);
        }

        while (i < left.length) {
            array[k] = left[i];
            i++;
            k++;
            setArr([...array]);
            await new Promise((resolve) => setTimeout(resolve, maxSpeedSlider - speedRef.current));
        }

        while (j < right.length) {
            array[k] = right[j];
            j++;
            k++;
            setArr([...array]);
            await new Promise((resolve) => setTimeout(resolve, maxSpeedSlider - speedRef.current));
        }
        setHighlighted([]);
    }

    const quickSort = async () => {
        if (isSorting) return;
        setIsSorting(true);
        setHighlighted([]);
        setSorted([]);
        abortSortingRef.current = false;

        let array = [...arr];
        await quickSortHelper(array, 0, array.length - 1);

        if (!abortSortingRef.current) {
            setSorted(Array.from({ length: array.length }, (_, index) => index));
        }

        setHighlighted([]);
        setIsSorting(false);
    };

    const quickSortHelper = async (array: number[], low: number, high: number) => {
        if (low >= high || abortSortingRef.current) return;

        const pivotIndex = await partition(array, low, high);
        
        setSorted((prev) => [...prev, pivotIndex]);

        await quickSortHelper(array, low, pivotIndex - 1);
        await quickSortHelper(array, pivotIndex + 1, high);
    };

    const partition = async (array: number[], low: number, high: number): Promise<number> => {
        const pivot = array[high];
        let i = low - 1;

        setHighlighted([high]);  
        await sleep();

        for (let j = low; j < high; j++) {
            if (abortSortingRef.current) return high;

            setHighlighted([i + 1, j, high]);
            await sleep();

            if (array[j] < pivot) {
                i++;
                [array[i], array[j]] = [array[j], array[i]];
                setArr([...array]);
                await sleep();
            }
        }

        [array[i + 1], array[high]] = [array[high], array[i + 1]];
        setArr([...array]);
        setHighlighted([]);
        await sleep();
        return i + 1;
    };

    const sleep = (ms = maxSpeedSlider - speedRef.current) => 
        new Promise((resolve) => setTimeout(resolve, ms));


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
                <button onClick={mergeSort}>Merge Sort</button>
                <button onClick={quickSort}>Quick Sort</button>
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

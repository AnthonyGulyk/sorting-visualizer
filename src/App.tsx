import { Button } from '@mui/material'
import React, { useState } from 'react';
import './App.css';

interface Props {
    arr: Array<number>;
    arrSize: number;
};

interface buttonProps {
    isSorting: boolean;
    newArray: any;
};

const NewArrayButton: React.FC<buttonProps> = ({ isSorting, newArray }) => (
    <Button
        variant='contained'
        color='secondary'
        disabled={isSorting}
        onClick={newArray}
    >
        New Array
    </Button>
);


const ArrayBars: React.FC<Props> =({arr, arrSize}) => (
    <div className='bars'>
        {arr.map((value: number, idx: number) => (
            <div
                className='array-bar'
                key={idx}
                style={{ backgroundColor: 'navy', height: `${value}px`, width: arrSize === 20 ? '2%' : '.5%' }}
                >
                </div>
        ))}
        </div>
);

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
        </div>
    )

};


export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';

interface Props {
    arr: Array<number>;
    arrSize: number;
};

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
        setSpeeds(arrSize === 20 ? speedsFast : speedsSlow);
        setArr(generateArray(arrSize === 20 ? 120 : 20));
    };

};


export default App;

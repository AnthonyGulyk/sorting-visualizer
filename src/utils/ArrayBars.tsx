import React from 'react';

interface Props {
    arr: Array<number>;
    arrSize: number;
    highlighted: number[];
    sorted: number[];
};

const ArrayBars: React.FC<Props> =({arr, arrSize, highlighted, sorted}) => (
    <div className='bars'>
        {arr.map((value: number, idx: number) => (
            <div
                className='array-bar'
                key={idx}
                style={{ 
                    height: `${value}px`,
                    width: `${60 / arrSize}%`,
                    backgroundColor: sorted.includes(idx) ? 'green' : highlighted.includes(idx) ? 'red' : 'navy'
                }}
                >
                </div>
        ))}
        </div>
);

export default ArrayBars;

import React from 'react';

interface Props {
    arr: Array<number>;
    arrSize: number;
    highlighted: number[];
};

const ArrayBars: React.FC<Props> =({arr, arrSize, highlighted}) => (
    <div className='bars'>
        {arr.map((value: number, idx: number) => (
            <div
                className='array-bar'
                key={idx}
                style={{ 
                    backgroundColor: highlighted.includes(idx) ? 'red' : 'navy',
                    height: `${value}px`,
                    width: `${60 / arrSize}%`
                }}
                >
                </div>
        ))}
        </div>
);

export default ArrayBars;

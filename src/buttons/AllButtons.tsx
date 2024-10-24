import { ButtonGroup } from '@mui/material'
import React, { useState } from 'react';
import NewArrayButton from './NewArrayButton';


interface Props {
    arr: Array<number>;
    newArray: () => void;
    toggleSize: () => void;
};

const AllButtons: React.FC<Props> = ({ arr, newArray, toggleSize }) => {
    const [selectedAlgo, setSelectedAlgo] = useState<string>('');
    const [isSorting, setIsSorting] = useState<boolean>(false);

    const isSelected = (algo: string) => {
        if (algo === selectedAlgo) return 'outlined';
        return 'contained';
    };

    return (
        <div className='btns'>
            <ButtonGroup>
                <NewArrayButton isSorting={isSorting} newArray={newArray} />
            </ButtonGroup>
        </div>
    );
};

export default AllButtons

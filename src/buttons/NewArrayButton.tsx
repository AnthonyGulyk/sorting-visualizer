import { Button } from '@mui/material'
import React from 'react';

interface Props {
    isSorting: boolean;
    newArray: any;
};

const NewArrayButton: React.FC<Props> = ({ isSorting, newArray }) => (
    <Button
        variant='contained'
        color='secondary'
        disabled={isSorting}
        onClick={newArray}
    >
        New Array
    </Button>
);

export default NewArrayButton

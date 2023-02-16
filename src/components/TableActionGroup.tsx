import {ButtonGroup, IconButton} from '@chakra-ui/react';
import {DeleteIcon, EditIcon} from '@chakra-ui/icons';

export default function TableActionGroup(props: { onClick: () => void }) {
    return (
        <ButtonGroup justifyContent="center" padding="5px">
            <IconButton aria-label="Edit" icon={<EditIcon/>} onClick={props.onClick}/>
            <IconButton aria-label="Delete" icon={<DeleteIcon/>}/>
        </ButtonGroup>
    )
}
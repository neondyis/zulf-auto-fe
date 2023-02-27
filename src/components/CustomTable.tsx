import {ChangeEvent, useEffect, useRef, useState} from "react";
import {
    Box, Button,
    Card,
    CardBody,
    CardHeader,
    Flex, FormControl, FormErrorMessage, FormLabel, Text,
    IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import {AddIcon, EditIcon} from "@chakra-ui/icons";
import {ReactTabulator} from 'react-tabulator';
import {Tabulator} from 'react-tabulator/lib/types/TabulatorTypes';
import ColumnDefinition = Tabulator.ColumnDefinition;
import "react-tabulator/lib/styles.css";
import "react-tabulator/css/tabulator_midnight.min.css";
import CellComponent = Tabulator.CellComponent;
import axios from 'axios';

type TableProps<T> = {
    tableType: string;
    list: T[]
}

export const CustomTable = ({...props}: TableProps<Object>) => {
    const {tableType, list} = props;
    const [data, setData] = useState([]); // initial data for the table
    const [editData, setEditData] = useState<Map<number, Object>>(new Map);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [columns, setColumns] = useState<ColumnDefinition[]>([]);
    const toast = useToast();
    let tableRef = useRef<any>();

    const closeModal = () => {
        // tableRef.current.clearCellEdited();
        onClose();
    };

    const copyKeys = async (obj: Object, newObj: Object) => {
        const tempColumns: ColumnDefinition[] = [];
        Object.assign(newObj, Object.keys(obj).reduce((result: Object, key) => {
            if (key !== '__typename') {
                // @ts-ignore
                result[key] = "";
                tempColumns.push({
                    title: key, field: key, hozAlign: "center", headerHozAlign: "center",
                    headerFilter: "input", resizable: false, minWidth: 200,
                    editor: "input", editable: editCheck
                    // Adding cell on click function action
                    // cellClick:function (e,cell){editRow(cell.getData())}
                });
                return result;
            } else {
                return result;
            }
        }, {}));
        setColumns(tempColumns);
    };

    const editCheck = (cell: CellComponent): boolean => {
        return cell.getField() !== 'id';
    };

    const update = () => {
        toast({
            title: 'Client updated.',
            description: "Client data updated successfully.",
            status: 'success',
            duration: 2000,
            isClosable: true,
        });
        // updateHandler({
        //     variables: {
        //         _eq: editData.id,
        //         current_living_address: editData.current_living_address,
        //         date_of_birth: editData.date_of_birth,
        //         fathers_name: editData.fathers_name,
        //         first_name: editData.first_name,
        //         id_number: editData.id_number,
        //         last_name: editData.last_name,
        //         last_updated_by: editData.last_updated_by,
        //         occupation: editData.occupation,
        //         personal_phone_number: editData.personal_phone_number,
        //         other_phone_number: editData.other_phone_number,
        //         salary: editData.salary,
        //         work_address: editData.work_address
        //     }}).then(e => {
        //     setData(e.data.update_clients.returning)

        // })
    };

    useEffect(() => {
        const filterKeys = {};
        if (data.length > 0 && columns.length == 0) {
            copyKeys(data[0], filterKeys).then(() => {
                console.log("Copied dynamic keys for table");
            });
        }
        if (list.length > 0 && data.length === 0) {
            // @ts-ignore
            setData([...list]);
        }
    }, [data, list]);

    const tableOptions = {
        height: "100%",
        pagination: "local",
        paginationSize: 10,
        movableColumns: true,
        resizableRows: false,
        renderHorizontal: "virtual",
        maxHeight: '100%',
        placeholder: "No Data Available",
    };
    const getEditedCells = async (cell: CellComponent) => {
        const id = cell.getRow().getCell('id').getValue();
        const editedObjects: {} = {...editData.get(id), [`${cell.getField()}`]: cell.getValue()};
        setEditData((prevState: Map<number, Object>) => {
            return prevState.set(id, editedObjects);
        });
    };

    const confirmEditing = () => {
        onOpen();
    };

    const handleEditSubmit = async () => {
        let updateData = [];
        // @ts-ignore
        for(let [key,value] of editData.entries()){
            updateData.push({id:key, ...value});
        }
        
        console.log(updateData);
        await axios.put('http://localhost:8080/api/cars/update/bulk', updateData).then(res => {
            console.log(res);
        });
    };

    const handleChange = (key: string, e: ChangeEvent<HTMLInputElement>) => {
        // setEditData({[key]: e.target.value})
    };

    return (
        <Card bg='#666666' marginTop={'50px'}  marginLeft={'50px'} marginRight={'50px'} maxH={'750px'}>
            <CardHeader>
                <Flex justify={'end'} gap={2}>
                    <IconButton icon={<AddIcon/>} aria-label={'Add Button'}/>
                    <Button leftIcon={<EditIcon/>} aria-label={'Confirm Edit Button'} onClick={confirmEditing} >Confirm Edit</Button>
                </Flex>
            </CardHeader>
            <CardBody>
                {data.length &&
                    <Box height={'100%'}>
                        {columns.length > 0 &&
                            <ReactTabulator
                                data={data}
                                columns={columns}
                                renderHorizontal={'virtual'}
                                reactiveData={true}
                                options={tableOptions}
                                layout={"fitData"}
                                events={{cellEdited: getEditedCells}}
                                onRef={ref => {tableRef = ref;}}
                            />
                        }
                    </Box>
                }
            </CardBody>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={closeModal} scrollBehavior={'inside'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody pb={6}>
                        <form id='edit-row-form'>
                            {editData &&
                                Array.from(editData).map(([key,data]) => (
                                    <div key={key}>
                                        <Text>{tableType} - {key}</Text>
                                        {Object.entries(data).map(([dataKey, dataValue]:[string,any]) => (
                                            <FormControl  key={dataKey} variant="floating">
                                                <FormLabel htmlFor={dataKey}>
                                                    {dataKey.replaceAll('_', ' ')}
                                                </FormLabel>
                                                <Input
                                                    id={dataKey}
                                                    name={dataKey}
                                                    placeholder={dataKey}
                                                    value={dataValue}
                                                    readOnly={true}
                                                    // onChange={e => handleChange(key,e)}
                                                />
                                                <FormErrorMessage>Your input is invalid</FormErrorMessage>
                                            </FormControl>
                                        ))}
                                    </div>
                                ))
                            }
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleEditSubmit}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Card>
    );
};
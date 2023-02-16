import {SetStateAction, useEffect, useState} from "react";
import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import {AddIcon, DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {ReactTabulator} from 'react-tabulator';
import {Tabulator} from 'react-tabulator/lib/types/TabulatorTypes';
import ColumnDefinition = Tabulator.ColumnDefinition;
import "react-tabulator/lib/styles.css";
import "react-tabulator/css/tabulator_midnight.min.css";

type TableProps<T> = {
    message: string;
    caption: string;
    list: T[]
}

export const CustomTable = ({...props}: TableProps<Object>) => {
    const {caption, message, list} = props;
    const [data, setData] = useState([]); // initial data for the table
    const [editData, setEditData] = useState({});
    const [filteredData, setFilteredData] = useState([...data]); // filtered data for the table
    const [filterValues, setFilterValues] = useState({});
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [columns, setColumns] = useState<ColumnDefinition[]>([])
    const toast = useToast();

    const closeModal = () => {
        setEditData({});
        onClose();
    };

    const copyKeys = async (obj: Object, newObj: Object) => {
        const tempColumns: ColumnDefinition[] = [];
        Object.assign(newObj, Object.keys(obj).reduce((result:Object, key) => {
            if(key !=='__typename'){
                // @ts-ignore
                result[key] = "";
                tempColumns.push({
                    title: key, field: key, hozAlign: "center",
                    headerFilter: "input", resizable:false, minWidth:200,
                    cellClick:function (e,cell){editRow(cell.getData())}})
                console.log(key)
                return result;
            }else{
                return result;
            }
        }, {}));
        setColumns(tempColumns);
    }
    const handleFilterChange = (event:any) => {
        const { name, value } = event.target;

        setFilterValues({
            ...filterValues,
            [name]: value,
        });
        // // Filter the data based on the filter values
        if(value === ""){
            setFilteredData(data)
        }else {
            const newFilteredData = data.filter((item) =>
                Object.keys(filterValues).every((key) => {
                    // @ts-ignore
                    const filterValue = filterValues[key];
                    const itemValue = item[key];
                    // @ts-ignore
                    return filterValue === "" || itemValue.toString().toLowerCase().includes(filterValue.toString().toLowerCase());
                })
            );
            setFilteredData(newFilteredData);
        }
    };

    const handleSubmit = (event:any) => {
        event.preventDefault();
    };

    const handleChange = (event:any) => {
        const {name, value} = event.target;
        setEditData((prevState) => {
            return({
                ...prevState,
                [name]: value
            })
        });
    };

    const editRow = (rowData: any) => {
        console.log(rowData)
        setEditData({...rowData});
        onOpen();
    };

    const deleteRow = (id: number) => {
        console.log(id)
        // deleteHandler({
        //     variables: {
        //         id: id
        //     }
        // }).then(e => {
        //     setData(prevState => {
        //         prevState = prevState.filter((row) => {
        //             return row.id !== id;
        //         })
        //         return prevState;
        //     })
        //     toast({
        //         title: 'Client deleted.',
        //         description: "Client data successfully deleted.",
        //         status: 'success',
        //         duration: 2000,
        //         isClosable: true,
        //     })
        // })
    };

    const update = () => {
            toast({
                title: 'Client updated.',
                description: "Client data updated successfully.",
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
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
    }

    useEffect(() => {
        const filterKeys = {};
        if(data.length > 0){
            copyKeys(data[0],filterKeys).then(() => {
                setFilterValues(filterKeys);
            });
        }
        if(list.length > 0 && data.length === 0){
            // @ts-ignore
            setData([...list]);
        }
    },[data, list, editData])

    const tableOptions = {
        height: "100%",
        pagination: "local",
        paginationSize: 10,
        movableColumns: false,
        resizableRows:false,
        renderHorizontal:"virtual",
        maxHeight: '100%',
        maxWidth: '100%',
        placeholder:"No Data Available",
    };

    return (
        <Card bg='#666666' marginTop={'50px'}  marginLeft={'50px'} marginRight={'50px'} maxH={'750px'}>
            <CardHeader>
                <Flex justify={'end'}>
                    <IconButton icon={<AddIcon/>} aria-label={'Add Button'}/>
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
                                options={tableOptions}
                                layout={"fitData"}
                            />
                        }
                    </Box>
                }
            </CardBody>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <form onSubmit={handleSubmit} id='edit-row-form'>
                            {editData &&
                                data.map((bodyContent:any) => (
                                    <div key={bodyContent.id}>
                                        {Object.entries(bodyContent).map(([key, value]:[any,any]) => (
                                            ((key !== 'id' && key !== '__typename')  &&
                                                <FormControl key={key} variant="floating" isRequired>
                                                    <FormLabel htmlFor={key}>
                                                        {key.replaceAll('_', ' ')}
                                                    </FormLabel>
                                                    <Input
                                                        id={key}
                                                        name={key}
                                                        placeholder={key}
                                                        value={editData[key]}
                                                        onChange={handleChange}
                                                    />
                                                    <FormErrorMessage>Your input is invalid</FormErrorMessage>
                                                </FormControl>
                                            )
                                        ))}
                                    </div>
                                ))
                            }
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={update}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Card>
    )
}
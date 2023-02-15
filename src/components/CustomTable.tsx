import {useEffect, useState} from "react";
import {
    Card,
    Input,
    TableCaption,
    TableContainer,
    Th,
    Table,
    Thead,
    Tr,
    Text,
    useDisclosure,
    useToast,
    Tbody,
    Td,
    ButtonGroup,
    IconButton,
    Tfoot,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody, FormControl, FormLabel, FormErrorMessage, ModalFooter, Button, CardBody, Skeleton, CardHeader, Flex
} from "@chakra-ui/react";
import {AddIcon, DeleteIcon, EditIcon} from "@chakra-ui/icons";


type TableProps<T> = {
    message: string;
    caption: string;
    list: T[]
}

export const CustomTable = ({...props}: TableProps<Object>) => {
    const noDataMessage = props.message;
    const caption = props.caption;
    const [data, setData] = useState([]); // initial data for the table
    const [editData, setEditData] = useState({});
    const [filteredData, setFilteredData] = useState([...data]); // filtered data for the table
    const [filterValues, setFilterValues] = useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const closeModal = () => {
        setEditData({});
        onClose();
    };

    const copyKeys = async (obj: Object, newObj:Object) => {
        Object.assign(newObj, Object.keys(obj).reduce((result:Object, key) => {
            if(key !=='__typename'){
                // @ts-ignore
                result[key] = "";
                return result;
            }else{
                return result;
            }
        }, {}));
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
        if(props.list.length > 0 && data.length === 0){
            // @ts-ignore
            setData([...props.list]);
        }
        if(props.list.length > data.length){
            // @ts-ignore
            setData([...props.list]);
        }
        console.log(editData)
    },[data, props.list,editData])



    return (
        <Card bg='white' marginTop={'50px'}  marginLeft={'50px'} marginRight={'50px'} maxH={'750px'}>
            <CardBody>
                <CardHeader>
                    <Flex justify={'end'}>
                        <IconButton icon={<AddIcon/>} aria-label={'Add Button'}/>
                    </Flex>
                </CardHeader>
                <Skeleton isLoaded={data !== null}>
                    <TableContainer overflow={'auto'} scrollBehavior='smooth'>
                        <Table variant='simple' size={'sm'}>
                            <TableCaption>{caption}</TableCaption>
                            <Thead>
                                <Tr>
                                    {(Object.keys(filterValues).length > 0) && (
                                        (Object.entries(data[0]).map(([key]) => (
                                            ((key !== 'id' && key !== '__typename') &&
                                                <Th key={key}>
                                                    <Text>
                                                        {key}
                                                    </Text>

                                                    <Input
                                                        name={key}
                                                        value={filterValues[`${key}`]}
                                                        onChange={handleFilterChange}
                                                    />
                                                </Th>
                                            )
                                        )))
                                    )}
                                    <Th  key={'action'}>
                                        Actions
                                    </Th>
                                </Tr>
                            </Thead>
                            {(data.length === 0) ? (
                                    <Tbody>
                                        <Tr>
                                            <Td style={{textAlign: 'center'}} colSpan={Object.keys(filterValues).length}>{noDataMessage}</Td>
                                        </Tr>
                                    </Tbody>
                                )
                                :
                                (filteredData.length > 0 ? (
                                        <Tbody>
                                            {filteredData.map((bodyContent: any) => (
                                                <Tr key={bodyContent.id}>
                                                    {Object.entries(bodyContent).map(([key, value]: [any,any]) => (
                                                        ((key !== 'id' && key !== '__typename')  && <Td style={{textAlign: 'center'}} key={key}>{value.toString().trim()}</Td>)
                                                    ))}
                                                    <Td key={'actions'}>
                                                        <ButtonGroup justifyContent='center' padding='5px'>
                                                            <IconButton aria-label='Edit' icon={<EditIcon />}  onClick={() => editRow(bodyContent)}/>
                                                            <IconButton aria-label='Delete' icon={<DeleteIcon />} />
                                                        </ButtonGroup>
                                                    </Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    )
                                    :
                                    ((filteredData.length === 0 && Object.values(filterValues).some(v => v !== "")) ? (
                                                <Tbody>
                                                    <Tr>
                                                        <Td style={{textAlign: 'center'}} colSpan={Object.keys(filterValues).length}>{'No valid data matching query'}</Td>
                                                    </Tr>
                                                </Tbody>
                                            ):
                                            (
                                                <Tbody>
                                                    {data.map((bodyContent:any) => (
                                                        <Tr key={bodyContent.id}>
                                                            {Object.entries(bodyContent).map(([key, value]: [any,any]) => (
                                                                ((key !== 'id' && key !== '__typename') && <Td style={{textAlign: 'center'}} key={key}>{value.toString().trim()}</Td>)
                                                            ))}
                                                            <Td key={'actions'}>
                                                                <ButtonGroup justifyContent='center' padding='5px'>
                                                                    <IconButton aria-label='Edit' icon={<EditIcon />}  onClick={() => editRow(bodyContent)}/>
                                                                    <IconButton aria-label='Delete' icon={<DeleteIcon />} />
                                                                </ButtonGroup>
                                                            </Td>
                                                        </Tr>
                                                    ))}
                                                </Tbody>
                                            )
                                    ))}
                            <Tfoot>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                </Skeleton>
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
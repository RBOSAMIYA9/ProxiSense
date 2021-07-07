import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
    Button,
    useColorMode,
    Box,
    Text,
    Center,
    Image,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    useDisclosure,
    Modal, ModalOverlay, ModalHeader, ModalCloseButton,
    ModalBody, ModalFooter, ModalContent,
    Spinner,
    Select,
    Input, FormControl,
} from '@chakra-ui/react';
import { decodedImageData } from '../Images/userBase64'
import { getEmployeeById } from '../firebase/dbOperations'
import { useForm } from 'react-hook-form';
import { MdAddAPhoto } from "react-icons/md"

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { updateById, deleteEmployeeById } from '../firebase/dbOperations'

function EmployeeCard({ data }) {
    
    // eslint-disable-next-line 
    const { colorMode, toggleColorMode } = useColorMode()
    const types = ['image/png', 'image/jpeg'];
    const preLoadedValues = {
        bleData: data.data.bleData,
        department: data.data.department,
        dp: data.data.dp,
        email: data.data.email,
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        mobileNo: data.data.mobileNo,
        updatedAt: data.data.updatedAt,
    }

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [deleteData, setDeleteData] = useState(false);
    const [viewData, setViewData] = useState(false);
    const [employeeData, setEmployeeData] = useState()
    const [loading, setLoading] = useState(false);


    const uploadedImage = useRef(null);
    const imageUploader = useRef(null);

    const [showPhoto, setShowPhoto] = useState(false);


    const [upImg, setUpImg] = useState();
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 9 / 9 });
    const [completedCrop, setCompletedCrop] = useState(null);

    const [imgSrc, setimgSrc] = useState(decodedImageData)
    const [otherImage, setotherImage] = useState(false);
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const [showEditBox, setshowEditBox] = useState(false);
    const [dpChanged, setDpChanged] = useState(false);



    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: preLoadedValues
    });


    const onSubmit = (formData) => {

        // setLoading(true);
        console.log("formDatadata", formData);
        // if (uploadedImage.current)

        if (dpChanged) {
            getBase64Data(formData).then(() => {

                // console.log("dp changed ");
                // console.log("data ", formData);
                //update data by Id
                updateById(data.id, formData).then((promiseData) => {
                    setLoading(false)

                }).catch((e) => console.log("error : ", e))
                // addEmployee(data).then((data) => {
                //     // console.log("data:", data);
                //     setLoading(false)
                //     setformFilled(true)


                // }).catch((e) => console.log("error : ", e))
            })
        }
        else {
            //update data
            console.log("dp not changed ", formData);
            console.log("data ", formData);
            updateById(data.id, formData).then((promiseData) => {
                setLoading(false)

            }).catch((e) => console.log("error : ", e))

        }


    };
    console.log(errors);
    // console.log("data in employee card", data);


    const getBase64Data = (formDataValues) => {

        return new Promise((resolve, reject) => {

            if (otherImage) {

                var blobReader = new FileReader();
                blobReader.readAsDataURL(imgSrc);
                blobReader.onloadend = function () {
                    var base64data = blobReader.result;
                    // console.log(" other image base64Data : ", base64data);
                    // data["dp"] = "base64data";
                    formDataValues["dp"] = base64data
                    resolve("data loaded ")
                }





            }
            else {
                formDataValues["dp"] = "default"
                console.log("image data defalut base64", imgSrc);
                resolve("default data  ")
            }



        })


    }
    const handleImageUpload = e => {

        const [file] = e.target.files;

        let selected = e.target.files[0];

        if (selected && types.includes(selected.type)) {
            if (file) {
                setDpChanged(true);
                setotherImage(true);
                setimgSrc(file);
                console.log("file size", file.size);
                if (!(file.size > 2000000)) {
                    setShowError(false);

                    const reader = new FileReader();
                    reader.addEventListener('load', () => setUpImg(reader.result));
                    // reader.readAsDataURL(e.target.files[0]);
                    // console.log("uploadImage ref", uploadedImage)
                    const { current } = uploadedImage;
                    current.file = file;
                    reader.onload = e => {
                        current.src = e.target.result;

                    };
                    reader.readAsDataURL(file);
                    setShowPhoto(true);
                }
                else {
                    console.log("file size is  not ok", file.size);
                    setShowError(true);
                    setError('Image size should be lesser than 2MB');
                }


            }

        } else {
            setShowError(true);
            setError('Please select an image file (png or jpg)');
        }



    };




    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }

        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
        const pixelRatio = window.devicePixelRatio;

        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
    }, [completedCrop]);


    const onLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);

    function renderCroppedImage(canvas, crop) {
        if (!crop || !canvas) {
            return;
        }

        canvas.toBlob(

            (blob) => {
                // console.log("blob", blob)
                setotherImage(true);
                setimgSrc(blob);
                const previewUrl = window.URL.createObjectURL(blob);
                uploadedImage.current.src = previewUrl;

                // for downloading  cropped image

                // const anchor = document.createElement('a');
                // anchor.download = 'cropPreview.png';
                // anchor.href = URL.createObjectURL(blob);
                // console.log("url: ", anchor.href);
                // console.log("preview url: ", previewUrl);

                // anchor.click();

                // window.URL.revokeObjectURL(previewUrl);
            },
            'image/png',
            1
        );
    }



    return (
        <>
            <Center>
                <Box d={["none", "none", "block", "block"]} >
                    <Box width="80vw" bg={colorMode === "light" ? "white" : "gray.600"} borderRadius="25px" d="flex" p="5" mt="2" alignItems="center" >
                        <Box d="flex" alignItems="center" flexGrow="2" >
                            <Box bg="gray.200" borderRadius="50%" p="2" w="45px" h="45px" >
                                {data.data.dp === "default" ? <>
                                    <Image src={decodedImageData} borderRadius="50%" />
                                </> : <>
                                    <Image src={data.data.dp} borderRadius="50%" />
                                </>}
                            </Box>
                            <Text ml="2">{data.data.firstName} {data.data.lastName}</Text>

                        </Box>
                        <Box d="flex" flexGrow="1" justifyContent="space-around" >

                            <Button colorScheme="teal"
                                onClick={() => {
                                    setDeleteData(false);
                                    setViewData(true);
                                    setLoading(true);
                                    getEmployeeById(data.id).then((data) => {

                                        console.log("data in main page", data)
                                        setEmployeeData(data);
                                        setLoading(false);
                                    }).catch((otherData) => console.log("other", otherData))

                                    onOpen();
                                }}
                            >View Details</Button>
                            <Button colorScheme="red"
                                onClick={() => {
                                    setDeleteData(true);
                                    setViewData(false);
                                    onOpen();
                                }}
                            >Delete</Button>
                            <Button colorScheme="gray"
                                onClick={() => {
                                    setDeleteData(false);
                                    setViewData(false);
                                    onOpen();
                                }}
                            >Update Details</Button>

                        </Box>
                    </Box>
                </Box>

                {/* for mobile */}
                <Box d={["block", "block", "none", "none"]} bg={colorMode === "light" ? "gray.200" : "gray.600"} borderRadius="25px"
                    mt="2" border="none">
                    <Accordion allowMultiple >
                        <AccordionItem w="80vw" >
                            <h2>
                                <AccordionButton _focus={{
                                    outline: "none"
                                }}
                                    border="none"
                                >
                                    <Box flex="1" d="flex" textAlign="left" alignItems="center">
                                        <Box bg="white" borderRadius="50%" p="2" w="45px" h="45px" >
                                            {data.dp === "default" ? <>
                                                <Image src={decodedImageData} borderRadius="50%" />
                                            </> : <>
                                                <Image src={data.data.dp} borderRadius="50%" />
                                            </>}
                                        </Box>
                                        <Text ml="2">{data.data.firstName} {data.data.lastName}</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Box d="flex" flexDirection="column" >

                                    <Button
                                        colorScheme="teal" mt="2"
                                        onClick={() => {
                                            setDeleteData(false);
                                            setViewData(true);
                                            setLoading(true);
                                            getEmployeeById(data.id).then((data) => {

                                                console.log("data in main page", data)
                                                setEmployeeData(data);
                                                setLoading(false);
                                            }).catch((otherData) => console.log("other", otherData))
                                            onOpen();
                                        }}
                                    >View Details</Button>
                                    <Button
                                        colorScheme="red"
                                        mt="2"
                                        onClick={() => {
                                            setDeleteData(true);
                                            setViewData(false);
                                            onOpen();
                                        }}
                                    >Delete</Button>
                                    <Button colorScheme="blackAlpha" mt="2"
                                        onClick={() => {
                                            setDeleteData(false);
                                            setViewData(false);
                                            onOpen();
                                        }}
                                    >Update Details</Button>
                                </Box>
                            </AccordionPanel>
                        </AccordionItem>


                    </Accordion>
                </Box>

                <Modal isOpen={isOpen} onClose={onClose} >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>{deleteData ? "Delete hospital" : viewData ? "View Employee Details" : "Update Details"}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>


                            {deleteData ? (
                                <>
                                    <Text>Are you sure you want to delete <b>{data.data.firstName} {data.data.lastName} </b> ?</Text>
                                    <Center mt={6}>
                                        <Button colorScheme="red" onClick={() => {
                                            deleteEmployeeById(data.id)
                                            onClose()
                                        }
                                        }>Delete</Button>
                                    </Center>
                                </>
                            ) : viewData ? (<>
                                <Center>
                                    {loading ?
                                        <Spinner
                                            thickness="4px"
                                            speed="0.65s"
                                            emptyColor="gray.200"
                                            color="blue.500"
                                            size="xl"
                                        />
                                        : (
                                            <>
                                                <Box>
                                                    {employeeData &&
                                                        (<>
                                                            <Box w="100%" d="flex" justifyContent="center">
                                                                <Box bg="gray.200" borderRadius="50%" p="2" w="45px" h="45px" >
                                                                    {data.data.dp === "default" ? <>
                                                                        <Image src={decodedImageData} borderRadius="50%" />
                                                                    </> : <>
                                                                        <Image src={data.data.dp} borderRadius="50%" />
                                                                    </>}
                                                                </Box>
                                                            </Box>
                                                            <Text fontWeight="bold" mt="3">FirstName:<Text as="span" fontWeight="normal"> {employeeData.data.firstName}</Text></Text>
                                                            <Text fontWeight="bold" mt="3">LastName :<Text as="span" fontWeight="normal"> {employeeData.data.lastName}</Text></Text>
                                                            <Text fontWeight="bold" mt="3">Name :<Text as="span" fontWeight="normal"> {employeeData.data.department}</Text></Text>
                                                            <Text fontWeight="bold" mt="3">Name :<Text as="span" fontWeight="normal"> {employeeData.data.email}</Text></Text>
                                                            <Text fontWeight="bold" mt="3">Name :<Text as="span" fontWeight="normal"> {employeeData.data.mobileNo}</Text></Text>
                                                        </>
                                                        )

                                                    }
                                                </Box>
                                            </>
                                        )
                                    }

                                </Center>
                            </>) : (<>
                                <Box>
                                    <Center d="flex" flexDirection="column" mb="6">
                                        <Box position="relative" >
                                            {data.data.dp === "default" ?
                                                (<Image src={decodedImageData} backgroundColor="gray.200" borderRadius="50%" p="2" w="100px" h="100px" display={showPhoto ? "none" : "block"} />)
                                                : (<Image src={data.data.dp} backgroundColor="gray.200" borderRadius="50%" p="2" w="100px" h="100px" display={showPhoto ? "none" : "block"} />)
                                            }


                                            <Image ref={uploadedImage} alt="selectedImage" w="100px" h="100px" borderRadius="50%" display={showPhoto ? "block" : "none"} />

                                            <Input type="file" onChange={handleImageUpload}
                                                ref={imageUploader} d="none" />
                                            <Button onClick={() => imageUploader.current.click()}
                                                borderRadius="50%"
                                                size="sm"
                                                position="absolute"
                                                right="0"
                                                bottom="0"
                                                backgroundColor="teal.300"
                                                color="white"
                                            ><MdAddAPhoto /></Button>

                                        </Box>
                                        {/* <Text> dp changed {dpChanged.toString()}</Text> */}
                                        {showError && <Text color="red">{error}</Text>}
                                        {showPhoto && <Button onClick={() => {
                                            setshowEditBox(!showEditBox)
                                        }} mt="2">Edit Photo</Button>}
                                    </Center >
                                    {
                                        showEditBox &&
                                        (
                                            <Box>
                                                <Box d="flex" p="2" justifyContent="space-evenly">
                                                    <ReactCrop
                                                        src={upImg}
                                                        onImageLoaded={onLoad}
                                                        crop={crop}
                                                        onChange={(c) => setCrop(c)}
                                                        onComplete={(c) => setCompletedCrop(c)}
                                                    />
                                                    <Box>
                                                        <Text textAlign="center">Preview</Text>
                                                        <canvas
                                                            ref={previewCanvasRef}
                                                            // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                                                            style={{
                                                                width: Math.round(completedCrop?.width ?? 0),
                                                                height: Math.round(completedCrop?.height ?? 0)
                                                            }}
                                                        />
                                                    </Box>
                                                </Box>
                                                <Center>
                                                    <Button
                                                        mt="2"
                                                        type="button"
                                                        colorScheme="teal"
                                                        disabled={!completedCrop?.width || !completedCrop?.height}
                                                        onClick={() => {
                                                            renderCroppedImage(previewCanvasRef.current, completedCrop)
                                                            setshowEditBox(!showEditBox)
                                                        }}
                                                    >
                                                        Save selection
                                                    </Button>

                                                </Center>
                                            </Box>
                                        )
                                    }

                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <FormControl >

                                            <Input type="text" placeholder="First Name" {...register("firstName", { required: true })} />
                                            {errors.firstName && <Text color="red">Please enter First name!</Text>}
                                        </FormControl>

                                        <FormControl mt={6} >

                                            <Input type="text" placeholder="LastName Name" {...register("lastName", { required: true })} />
                                            {errors.lastName && <Text color="red">Please LastName enter name!</Text>}
                                        </FormControl>

                                        <FormControl mt={6}>

                                            <Input type="number" placeholder="mobileNo" {...register("mobileNo", { required: true })} />
                                            {errors.mobileNo && <Text color="red">Please enter mobileNo!</Text>}
                                        </FormControl>
                                        <FormControl mt={6}>

                                            <Input type="email" placeholder="Email" {...register("email", { required: true })} />
                                            {errors.email && <Text color="red">Please enter Email!</Text>}
                                        </FormControl>


                                        <FormControl mt={6}>

                                            <Input type="text" placeholder="Ble data" {...register("bleData", { required: true })} />
                                            {errors.bleData && <Text color="red">Please enter Ble data!</Text>}
                                        </FormControl>

                                        <FormControl mt={6}>
                                            <Select placeholder="Select option" {...register("department", { required: true })}>
                                                <option value="admin" >Admin department </option>
                                                <option value="development" >Development department </option>
                                                <option value="sales">Sales department </option>
                                                <option value="marketing">Marketing department </option>
                                            </Select>
                                            {errors.department && <Text color="red">Please enter Ble data!</Text>}
                                        </FormControl>

                                        <Box textAlign="center">
                                            <Button type="submit" mt={6} colorScheme="teal" onClick={onClose}>submit</Button>
                                        </Box>

                                    </form>
                                </Box>
                            </>)}
                        </ModalBody>

                        <ModalFooter>
                            <Button mr={3} onClick={onClose}>
                                Cancel
                            </Button>

                        </ModalFooter>
                    </ModalContent>
                </Modal>

            </Center>
        </>
    )
}

export default EmployeeCard

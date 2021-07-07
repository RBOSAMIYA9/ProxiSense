import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form';
import { addEmployee } from '../firebase/dbOperations'
import { decodedImageData } from '../Images/userBase64'
import {
    Spinner,
    Box,
    Text,
    Button,
    Center,
    Select,
    Image,
    Input, Alert, AlertIcon, AlertTitle,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useColorMode

} from '@chakra-ui/react';
// import DefaultUserImage from '../Images/user.png'
// import { BiUserCircle } from "react-icons/bi"
import { MdAddAPhoto } from "react-icons/md"

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';


function Registration() {
    
    // eslint-disable-next-line 
    const { colorMode, toggleColorMode } = useColorMode()
    const types = ['image/png', 'image/jpeg'];

    const uploadedImage = useRef(null);
    const imageUploader = useRef(null);

    const [formFilled, setformFilled] = useState(false);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPhoto, setShowPhoto] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()


    const [upImg, setUpImg] = useState();
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 9 / 9 });
    const [completedCrop, setCompletedCrop] = useState(null);

    const [imgSrc, setimgSrc] = useState(decodedImageData)
    const [otherImage, setotherImage] = useState(false);
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);


    const getBase64Data = (data) => {

        return new Promise((resolve, reject) => {

            if (otherImage) {

                var blobReader = new FileReader();
                blobReader.readAsDataURL(imgSrc);
                blobReader.onloadend = function () {
                    var base64data = blobReader.result;
                    // console.log(" other image base64Data : ", base64data);
                    // data["dp"] = "base64data";
                    data["dp"] = base64data
                    resolve("data loaded ")
                }





            }
            else {
                data["dp"] = "default"
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

    const onSubmit = data => {
        setLoading(true);
        // console.log(data);
        // if (uploadedImage.current)

        getBase64Data(data).then(() => {
            // console.log("data ", data);
            addEmployee(data).then((data) => {
                // console.log("data:", data);
                setLoading(false)
                setformFilled(true)


            }).catch((e) => console.log("error : ", e))
        })




    }

    console.log(errors);


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
                {loading ?
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    />
                    : formFilled ?
                        (<>
                            <Alert
                                status="success"
                                variant="subtle"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                textAlign="center"
                                height="150px"
                                width="60%"

                            >
                                <AlertIcon boxSize="40px" mr={0} />
                                <AlertTitle mt={4} mb={1} fontSize="lg">
                                    Employee added successfully!
                                </AlertTitle>

                            </Alert>
                        </>) :
                        (
                            <>
                                <Box w={["80vw", "60vw"]} mt="12" mb="12" height="auto" boxShadow="lg" borderRadius="25px" p="5" bg={colorMode === "light" ? "white" : "gray.700"} textAlign="center">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <Center d="flex" flexDirection="column" >
                                            <Box position="relative" >
                                                <Image src={decodedImageData} backgroundColor="gray.200" borderRadius="50%" p="2" w="100px" h="100px" display={showPhoto ? "none" : "block"} />

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
                                            {showError && <Text color="red">{error}</Text>}
                                            {showPhoto && <Button onClick={onOpen} mt="2">Edit Photo</Button>}

                                        </Center>

                                        <Modal isOpen={isOpen} onClose={onClose} >
                                            <ModalOverlay />
                                            <ModalContent>
                                                <ModalHeader>Modal Title</ModalHeader>
                                                <ModalCloseButton />
                                                <ModalBody>
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
                                                                onClose()
                                                            }}
                                                        >
                                                            Save selection
                                                        </Button>

                                                    </Center>
                                                </ModalBody>

                                                <ModalFooter>
                                                    <Button onClick={onClose}>
                                                        Close
                                                    </Button>

                                                </ModalFooter>
                                            </ModalContent>
                                        </Modal>

                                        <Input type="text" required mt="2" placeholder="First name" {...register("firstName", { required: true, maxLength: 80 })} />
                                        <Input type="text" required mt="2" placeholder="Last name" {...register("lastName", { required: true, maxLength: 100 })} />
                                        <Input type="text" required mt="2" placeholder="Email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                                        <Input type="tel" required mt="2" placeholder="Mobile number" {...register("mobileNo", { required: true, minLength: 6, maxLength: 12 })} />
                                        <Input type="text" required mt="2" placeholder="bleData" {...register("bleData", { required: true })} />
                                        <Select placeholder="Select department" mt="2" {...register("department", { required: true })}>
                                            <option value="admin" >Admin department </option>
                                            <option value="development" >Development department </option>
                                            <option value="sales">Sales department </option>
                                            <option value="marketing">Marketing department </option>
                                        </Select>
                                        <Button type="submit" mt="2" colorScheme="teal" > Register</Button>

                                    </form>
                                </Box>
                            </>
                        )
                }


            </Center>
        </>
    )
}

export default Registration

import React, { useEffect, useState } from 'react';
import './Moda1.css';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import CloseIcon from '@mui/icons-material/Close';
import imageCompression from 'browser-image-compression';
import { Box } from '@mui/system';
import {
    Button,
    Chip,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    LinearProgress,
    Modal,
    NativeSelect,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { v4 as uuid } from 'uuid';
import DashboardLayout from 'Admin/examples/LayoutContainers/DashboardLayout';
import { db } from "data/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";


function AddPost(props) {
    const { activeButton, setActiveButton } = props;
    //set show/hide form
    const [open, setOpen] = React.useState(true);
    // const [post, setPost] = useState();
    const handleOpen = () => {
        

        // console.log("da click vao add post");
    };
    // const addPost = () => {};
    const handleClose = () => {
       
        setActiveButton(false)
    };
    //implement add image and video
    const [uploadData, setUploadData] = useState({
        description: "",
        file: {
            type: "",
            name: "",
            data: "",
        },
    });

    const [progress, setProgress] = useState("");

    const uploadToFirebaseDB = (fileData) => {
        // uploading to collection called posts
        db.collection("posts")
            .add({
                profile: photoURL,
                username: displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                description: uploadData.description,
                fileType: uploadData.file.type,
                fileName: uploadData.file.name,
                fileData: fileData,
            })
            .then(() => resetState());
    };

    const handleSubmitButton = (e) => {
        e.preventDefault();

        // verify atleast one of the input fields are not empyt
        if (uploadData.description || uploadData.file.data) {
            // if file input is true...upload the file to Fire-Store
            if (uploadData.file.data) {
                const id = uuid();
                const uploadTask = storage.ref(`posts/${id}`).putString(uploadData.file.data, "data_url");
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const value = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        setProgress(value);
                    },

                    (error) => {
                        alert(error);
                    },

                    () => {
                        storage
                            .ref("posts")
                            .child(id)
                            .getDownloadURL()
                            .then((url) => uploadToFirebaseDB(url));
                    }
                );

                // do not go further..
                return;
            }
            // if not file input provided
            uploadToFirebaseDB(uploadData.file.data);
        } else {
            swal("😕 Input field can not be empty");
        }
    };

    // if file name is too long.. compress it
    const fileNameCompressor = (str, limit) => {
        let fileName = str;
        const arr = str.split(".");
        const name = arr[0];
        const ext = arr[arr.length - 1];

        if (name.length > limit) {
            fileName = name.substring(0, limit).trim() + "... ." + ext;
        }
        return fileName;
    };

    const imageUploadHandler = async (e, type) => {
        const inputFile = e.target.files[0];
        const _inputFile = inputFile.type.split("/");
        const inputFileType = _inputFile[0];
        const inputFileExec = _inputFile[1];
        const inputFileName = fileNameCompressor(inputFile.name, 20);

        const fileSize = inputFile.size / (1024 * 1024);

        const acceptedImageFormats = ["png", "jpg", "jpeg", "gif"];
        const acceptedVideoFormats = ["mp4", "mkv", "3gp", "avi", "webm"];

        switch (type) {
            case "image":
                if (!acceptedImageFormats.some((format) => format.includes(inputFileExec))) {
                    swal("🔴 Please select image format of png , jpg , jpeg , gif ");
                    e.target.value = "";
                    return;
                }
                if (fileSize > 2) {
                    swal("🔴 Please select an image less than 2MB file size");
                    e.target.value = "";
                    return;
                }
                break;
            default:
                swal("😮 OOPS...!!! Invalid file format");
                e.target.value = "";
                return;
        }

        let compressedInputFile = inputFile;
        if (inputFileType === "image") {
            //compression algorithm
            const compressionOptions = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            };

            try {
                compressedInputFile = await imageCompression(inputFile, compressionOptions);
            } catch (error) {
                alert(error);
            }
        }

        let inputFileDataBase64;
        const file = new FileReader();
        if (compressedInputFile) {
            file.onloadend = (fileLoadedEvent) => {
                inputFileDataBase64 = fileLoadedEvent.target.result;
                setUploadData({
                    ...uploadData,
                    file: {
                        type: inputFileType,
                        name: inputFileName,
                        data: inputFileDataBase64,
                    },
                });
            };
            file.readAsDataURL(compressedInputFile);
        }

        // clear the file input event value
        e.target.value = "";
    };

    const resetState = () => {
        setUploadData({
            description: "",
            file: {
                type: "",
                name: "",
                data: "",
            },
        });
        setProgress("");
    };
    //TODO : CUSTOM FIELD THÊM NHÀ XE
    const [state, setstate] = useState([])
    const [seat, setSeat] = useState(0)
    const [formData, setFormData] = useState({});
    const [type, settype] = useState(['Giường nằm', 'Xe ghế'])
    // const [nameGarage, d] = useState(['Phương Trang', 'Thành Bười', 'Hoàng trung'])
    const [noidi, setNoidi] = useState(['Hà nội', 'Quảng Bình']);

    useEffect(() => {
        let id = 0;
        let name = "A";
        let newState = [];
        for (var i = 1; i <= seat; i++) {
            id++;
            newState.push({
                id: id,
                name: name + i,
                status: "empty",
                ui: "",
            });

        }
        setstate(newState);
        console.log(state);
    }, [seat])

    const handleChangeValue = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        console.log(state);
        try {
            const docRef = await addDoc(collection(db, 'Trips'), {
                // ...formData,
                seat:
                    state.map((seat) => {
                        return {
                            id: seat.id,
                            name: seat.name,
                            status: "empty",
                            ui: ""
                        }
                    })
            });
            console.log('Document written with ID: ', docRef.id);
        } catch (e) {

        }

    }
    //TODO: LẤY DANH SÁCH TÊN NHÀ XE HIỆN CÓ 
    const [garage, setGarage] = useState([]);
    const [nameGarage, setNameGarage] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const accountsCol = collection(db, 'Garage');
            const accountsSnapshot = await getDocs(accountsCol);
            const accountsList = accountsSnapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });
            setGarage(accountsList);
            const mapData=accountsList.map((item)=>{
                setGarage(item.Name);
            })
            setNameGarage(mapData)

        }
        fetchData();
        console.log(garage);
    }, []);
   
    console.log(nameGarage);

   

    return (
        <DashboardLayout>
            <div className="addpost">
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box>
                        <Paper className="paper" elevation={4}>
                            <div>
                                <div className="modalHeading">
                                    <Typography>Thêm xe </Typography>
                                    <IconButton>
                                        <CloseIcon onClick={handleClose} />
                                    </IconButton>
                                </div>
                                <div>
                                    <form className="form-horizontal" onSubmit={handleSubmit}>
                                        <fieldset>

                                            <TextField
                                                id="outlined-basic" label="Điểm kết thúc" variant="outlined"
                                                name='EndPoint'
                                                value={formData.EndPoint}
                                                onChange={handleChangeValue}
                                                placeholder="EndPoint"
                                            />
                                            <TextField
                                                id="outlined-basic" label="Thời gian kết thúc chuyến đi" variant="outlined"
                                                name='EndTime'
                                                value={formData.EndTime}
                                                onChange={handleChangeValue}
                                                placeholder="EndTime"
                                            />
                                            <TextField
                                                name='ID_Car'
                                                value={formData.ID_Car}
                                                onChange={handleChangeValue}
                                                placeholder="ID_Car"
                                            />
                                            <TextField
                                                name='ID_Garage'
                                                value={formData.ID_Garage}
                                                onChange={handleChangeValue}
                                                placeholder="ID_Garage"
                                            />
                                            {/* select */}
                                            <TextField
                                                name='NameGarage'
                                                value={formData.NameGarage}
                                                onChange={handleChangeValue}
                                                placeholder="NameGarage"
                                            />
                                            <TextField
                                                name='ID_Trip'
                                                value={formData.ID_Trip}
                                                onChange={handleChangeValue}
                                                placeholder="ID_Trip"
                                            />


                                            <TextField
                                                id="outlined-basic" label="Giá vé" variant="outlined"
                                                name='Price'
                                                value={formData.Price}
                                                onChange={handleChangeValue}
                                                placeholder="Price"
                                            />
                                            <TextField
                                                id="outlined-basic" label="Điểm bắt đầu" variant="outlined"
                                                name='StartPoint'
                                                value={formData.StartPoint}
                                                onChange={handleChangeValue}
                                                placeholder="StartPoint"
                                            />
                                            <TextField
                                                id="outlined-basic" label="Thời gian khởi hành" variant="outlined"
                                                name='StartTime'
                                                value={formData.StartTime}
                                                onChange={handleChangeValue}
                                                placeholder="StartTime"
                                            />
                                            <TextField
                                                id="outlined-basic" label="Loại xe" variant="outlined"
                                                name='TypeVehicle'
                                                value={formData.TypeVehicle}
                                                onChange={handleChangeValue}
                                                placeholder="TypeVehicle"
                                            />

                                            <TextField
                                                id="outlined-basic" label="Số ghế" variant="outlined"
                                                onChange={(e) => setSeat(e.target.value)} placeholder="number seat"
                                            />
                                            <FormControl fullWidth>
                                                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                                    Loại xe
                                                </InputLabel>
                                                <NativeSelect
                                                    defaultValue={30}
                                                    inputProps={{
                                                        name: 'NameGarage',
                                                        id: 'uncontrolled-native',
                                                    }}
                                                    onChange={handleChangeValue}
                                                    value={formData.NameGarage}
                                                >
                                                    {type.map((item) => {
                                                        return (<option value={item}>{item}</option>)

                                                    })}




                                                </NativeSelect>
                                            </FormControl>
                                            <FormControl fullWidth>
                                                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                                    Nơi đi
                                                </InputLabel>
                                                <NativeSelect
                                                    defaultValue={30}
                                                    inputProps={{
                                                        name: 'NameGarage',
                                                        id: 'uncontrolled-native',
                                                    }}
                                                    onChange={handleChangeValue}
                                                    value={formData.NameGarage}
                                                >
                                                    {type.map((item) => {
                                                        return (<option value={item}>{item}</option>)

                                                    })}




                                                </NativeSelect>
                                            </FormControl>
                                            <FormControl fullWidth>
                                                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                                    Nơi đến
                                                </InputLabel>
                                                <NativeSelect
                                                    defaultValue={30}
                                                    inputProps={{
                                                        name: 'NameGarage',
                                                        id: 'uncontrolled-native',
                                                    }}
                                                    onChange={handleChangeValue}
                                                    value={formData.noidi}
                                                >
                                                    {noidi.map((item) => {
                                                        return (<option value={item}>{item}</option>)

                                                    })}




                                                </NativeSelect>
                                            </FormControl>
                                            <input type="submit" className="btn btn-success" defaultValue="Thêm vào" />
                                        </fieldset>
                                    </form>
                                </div>
                                <div className="modal__body">
                                    <form onSubmit={handleSubmitButton}>

                                        {/*input save name image-video */}
                                        <input
                                            id="upload-image"
                                            type="file"
                                            accept="image/*"
                                            hidden
                                            onChange={(e) => imageUploadHandler(e, 'image')}
                                        />
                                        {uploadData.file.name && !progress && (
                                            <div>
                                                <Chip
                                                    color="primary"
                                                    size="small"
                                                    onDelete={resetState}
                                                    icon={
                                                        uploadData.file.type === 'image' ? (
                                                            <PhotoLibraryIcon />
                                                        ) : (
                                                            <></>
                                                        )
                                                    }
                                                    label={uploadData.file.name}
                                                />
                                            </div>
                                        )}
                                        {progress ? (
                                            <div>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={progress}
                                                />
                                                <p>{progress} %</p>
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                        <Divider />
                                        <div className="modal__footer">
                                            <Grid container xs={7} className="modal__footer__left ">
                                                <p>Thêm hình ảnh nhà xe</p>
                                            </Grid>
                                            <Grid container xs={5} className="modal__footer__rigth">

                                                <IconButton>
                                                    <label htmlFor="upload-image">
                                                        <PhotoLibraryIcon style={{ color: 'green' }} />
                                                    </label>
                                                </IconButton>

                                            </Grid>
                                        </div>

                                        <Button
                                            variant="contained"
                                            className="modal__footer11"
                                            color="primary"
                                            type="submit"
                                        >
                                            Thêm mới nhà xe
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </Paper>
                    </Box>
                </Modal>
               

            </div>
        </DashboardLayout>
    );
}

export default AddPost;

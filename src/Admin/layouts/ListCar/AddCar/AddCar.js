import React, { useEffect, useState } from 'react';
import './AddCar.css';
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
    MenuItem,
    Modal,
    NativeSelect,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { v4 as uuid } from 'uuid';
import DashboardLayout from 'Admin/examples/LayoutContainers/DashboardLayout';
import { db } from "data/firebase";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore";



function AddCar(props) {
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
    const [formData, setFormData] = useState({});
    const handleChangeValue = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const docRef = await addDoc(collection(db, 'a'), {
                ...formData,

            });
            console.log('Document written with ID: ', docRef.id);
        } catch (e) {

        }



    }
    const [garages, setGarages] = useState([]);
    const [selectedGarage, setSelectedGarage] = useState("");
    const [garageInfo, setGarageInfo] = useState([]);
    const [carInfo, setCarInfo] = useState({});

    // Lấy danh sách ID từ bảng Garage
    useEffect(() => {
        const garagesCol = collection(db, "Garage");
        const unsubscribe = onSnapshot(garagesCol, (snapshot) => {
            const data = [];
            snapshot.forEach((doc) => {
                const { Name } = doc.data();
                data.push({
                    value: doc.id,
                    label: Name,
                });
            });
            setGarages(data);
        });
        return unsubscribe;
    }, []);
    //get Data từ Db dựa vào ID vừa lấy được ở phía select nhà xe
    useEffect(() => {
        const unsub = async () => {
            if (selectedGarage !== "") {
                const docRef = doc(db, "Garage", selectedGarage);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setGarageInfo(docSnap.data());
                } else {
                    console.log("No such document!");

                };
            } else {
                console.log("Error getting document:", error);
            }
        }
        unsub();
    }, [selectedGarage]);
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
                                    <Typography>Thêm xe  </Typography>
                                    <IconButton>
                                        <CloseIcon onClick={handleClose} />
                                    </IconButton>
                                </div>
                                <div>
                                    <form className="form-horizontal" onSubmit={handleSubmit}>
                                        <fieldset>
                                            <FormControl className='Garage' >

                                                <NativeSelect
                                                    defaultValue={30}
                                                    inputProps={{
                                                        name: 'NameGarage',
                                                        id: 'uncontrolled-native',
                                                    }}
                                                    onChange={(e) => setSelectedGarage(e.target.value)}
                                                    value={selectedGarage}

                                                >
                                                    {garages.map((item) => {
                                                        return (<option value={item.value
                                                        }>{item.label
                                                            }</option>)

                                                    })}




                                                </NativeSelect>
                                            </FormControl>
                                            <TextField
                                                //   id="outlined-basic" label="ID nhà xe" variant="outlined"
                                                name='IdGarage'
                                                value={garageInfo.Name}
                                                onChange={handleChangeValue}
                                                disabled='true'
                                                placeholder="Nhà xe"
                                                className='Garage'
                                            />
                                            <TextField
                                                id="outlined-basic" label="ID nhà xe" variant="outlined"
                                                name='IdGarage'
                                                value={formData.IdGarage}
                                                onChange={handleChangeValue}
                                                placeholder="ID nhà xe"
                                                className='Garage'
                                            />
                                            <TextField
                                                id="outlined-basic" label="Tên nhà xe" variant="outlined"
                                                name='NameGarage'
                                                value={formData.NameGarage}
                                                onChange={handleChangeValue}
                                                placeholder="Tên nhà xe"
                                                className='Garage'
                                            />
                                            <TextField
                                                id="outlined-basic" label="Chủ sở hữu" variant="outlined"
                                                name='Owner'
                                                value={formData.Owner}
                                                onChange={handleChangeValue}
                                                placeholder="Chủ sở hữu nhà xe"
                                                className='Garage'
                                            />
                                            <TextField
                                                id="outlined-basic" label="Địa chỉ nhà xe" variant="outlined"
                                                name='Address'
                                                value={formData.Address}
                                                onChange={handleChangeValue}
                                                placeholder="Địa chỉ nhà xe"
                                                className='Garage'
                                            />
                                            <TextField
                                                id="outlined-basic" label="Hotline" variant="outlined"
                                                name='Hotline'
                                                value={formData.Hotline}
                                                onChange={handleChangeValue}
                                                placeholder="Hotline"
                                                className='Garage'
                                            />

                                            <div className="modal__body">
                                                <form onSubmit={handleSubmitButton}>
                                                    <div className="modal__footer">
                                                        <Grid container xs={10} className="modal__footer__left ">
                                                            <p>Thêm hình ảnh minh hoạ cho nhà xe</p>
                                                        </Grid>
                                                        <Grid container xs={2} className="">

                                                            <IconButton>
                                                                <label htmlFor="upload-image">
                                                                    <PhotoLibraryIcon className='modal__footer__rigth' style={{ color: 'green', textAlign: 'center' }} />
                                                                </label>
                                                            </IconButton>

                                                        </Grid>
                                                    </div>
                                                </form>
                                            </div>
                                            <Button
                                                variant="contained"
                                                className="modal__footer11"
                                                color="primary"
                                                type="submit"
                                            >
                                                Thêm mới nhà xe
                                            </Button>

                                        </fieldset>
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

export default AddCar;

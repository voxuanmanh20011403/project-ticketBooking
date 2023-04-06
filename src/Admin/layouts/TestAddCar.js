import { Button, TextField } from '@mui/material';
import { db } from 'data/firebase';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';

export default function TestAddCar() {
    const [state, setstate] = useState([])
    const [seat, setSeat] = useState(0)
    const [formData, setFormData] = useState({});
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
                ...formData,
                seat:
                    state.map((seat) => {
                        return {
                            Id: seat.id,
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
    return (
        <div>
            <form className="form-horizontal" onSubmit={handleSubmit}>
                <fieldset>
                    <TextField
                        name='NameGarage'
                        value={formData.NameGarage}
                        onChange={handleChangeValue}
                    />
                    <TextField
                        name='duration'
                        value={formData.duration}
                        onChange={handleChangeValue}
                    />
                    <TextField
                        onChange={(e) => setSeat(e.target.value)} placeholder="care" />
                    <input type="submit" className="btn btn-success" defaultValue="Thêm vào" />
                </fieldset>
            </form>
        </div>
    )
}

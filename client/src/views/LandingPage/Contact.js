import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography';
import * as api from '../../api/index';
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "../../components/Snackbar/Snackbar.js";

const Contact = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [message, setMessage] = useState();
    const [notif, setNotif] = useState({ open: false, message: "", color: "info" });

    const errorNotification = (error) => {
        var response = error.response?.data;
        setNotif({ open: true, color: "danger", message: response?.message ? response.message : "Something went wrong!" });
        setTimeout(function () {
            setNotif({ open: false, message: "" });
        }, 5000);
    }

    const successNotification = (response) => {
        var data = response?.data;
        if (response.data.success) {
            setNotif({ open: true, color: "success", message: data.message });
            setTimeout(function () {
                setNotif({ open: false, message: "" });
            }, 5000);
        } else {
            setNotif({ open: true, color: "danger", message: data.message ? data.message : "Something went wrong! Refresh the page and try again." });
            setTimeout(function () {
                setNotif({ open: false, message: "" });
            }, 5000);
        }
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        api.contactForm({
            name: name,
            email: email,
            message: message,
        }).then((response) => {
            successNotification(response);
        }).catch((error) => {
            errorNotification(error);
        });

    }

    return (
        <div class="contact">
            <Snackbar
                place="bl"
                color={notif.color}
                icon={AddAlert}
                message={notif.message}
                open={notif.open}
                closeNotification={() => setNotif({ open: false, message: "" })}
                close
            />
            <div style={{ padding: '2rem 1rem 1rem 1rem' }}>
                <Typography variant="h3" align="center">
                    Contact
                </Typography>
            </div>
            <div class="form-div">
                <form id="my-form"  onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <div>
                                <label>Name *</label>
                                <input type="text" className="w-input" onChange={handleNameChange} dataName="Name" id="Name" required />
                            </div>
                            <div>
                                <label>Email *</label>
                                <input type="email" className="w-input" onChange={handleEmailChange} dataName="Email" id="Email" required />
                            </div>
                        </div>
                        <div>
                            <label>Message *</label>
                            <textarea data-name="Message" id="Message" onChange={handleMessageChange} className="w-textarea" required></textarea>
                        </div>
                        <input type="submit" value="SUBMIT" data-wait="Please wait..." className="submit-button" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Contact

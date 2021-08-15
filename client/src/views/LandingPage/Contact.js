import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography';
import * as api from '../../api/index';
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "../../components/Snackbar/Snackbar.js";
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Chart from 'react-google-charts';

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
            <GridContainer>
                <GridItem xs={12} sm={6}>
                    <Chart
                        height={"400px"}
                        chartType="AreaChart"
                        loader={<div>Loading Chart...</div>}
                        data={[
                            ["Disease", "Cases", "Deaths"],
                            ["Ebola", 6325462, 2555444],
                            ["HIV/AIDS", 102742880.0, 2748730.0],
                            ["Malaria", 666438730.0, 2159768.0],
                            ["H1N1", 973183, 5289],
                            ["Cholera", 9180678, 897204],
                        ]}
                        options={{
                            title: "Epidemics' cases and deaths Column chart",
                            vAxis: { logScale: true }
                        }}
                        legendToggle
                    />
                </GridItem>
                <GridItem xs={12} sm={6}>
                    <Chart
                        height={"400px"}
                        width={"400px"}
                        chartType="ColumnChart"
                        loader={<div>Loading Chart...</div>}
                        data={[
                            ["Disease", "Cases", "Deaths"],
                            ["Ebola", 6325462, 2555444],
                            ["HIV/AIDS", 102742880.0, 2748730.0],
                            ["Malaria", 666438730.0, 2159768.0],
                            ["H1N1", 973183, 5289],
                            ["Cholera", 9180678, 897204],
                        ]}
                        options={{
                            title: "Epidemics' cases and deaths Pie chart",
                            vAxis: { logScale: true }
                        }}
                        legendToggle
                    />
                </GridItem>
            </GridContainer>
            {/* <div style={{ padding: '2rem 1rem 1rem 1rem' }}>
                <Typography variant="h3" align="center">
                    Contact
                </Typography>
            </div> */}
           

        </div>
    )
}

export default Contact

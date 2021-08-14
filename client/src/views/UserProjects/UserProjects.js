import React, { useState } from 'react';

// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";

import Snackbar from "../../components/Snackbar/Snackbar.js";

import NewProject from './NewProject';
import AllProjects from './AllProjects';


const UserProjects = () => {
    const [isNewProject, setIsNewProject] = useState(false);
    const [notif, setNotif] = useState({ open: false, message: "", color: "info" });

    // const profile = JSON.parse(localStorage.getItem('profile'));
    const user = null;


    const handleToggleState = () => {
        setIsNewProject(!isNewProject);
    };

    return (
        <>
            <Snackbar
                place="tr"
                color={notif.color}
                icon={AddAlert}
                message={notif.message}
                open={notif.open}
                closeNotification={() => setNotif({ open: false, message: "" })}
                close
            />
            {
                isNewProject ?
                    <NewProject user={user} setNotif={setNotif} handleToggleState={handleToggleState} />
                    : <AllProjects user={user} isNewProject={isNewProject} setNotif={setNotif} handleToggleState={handleToggleState} />
            }
        </>
    )
}
export default UserProjects;
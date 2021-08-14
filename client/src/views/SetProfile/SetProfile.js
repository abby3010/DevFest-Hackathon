import React, { useState } from 'react';

import AddAlert from "@material-ui/icons/AddAlert";
import Check from "@material-ui/icons/Check";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import LinearProgress from '@material-ui/core/LinearProgress';

import Snackbar from "../../components/Snackbar/Snackbar.js";
import Button from "../../components/CustomButtons/Button.js";
import CountryRegionCity from "../../components/CountryRegionCity/CountryRegionCity.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardHeader from "../../components/Card/CardHeader.js";
import Muted from "../../components/Typography/Muted.js";

import styles from "../../assets/jss/appstyles/views/setProfile.js";
import checkboxAndRadioStyles from "../../assets/jss/appstyles/checkboxAdnRadioStyle.js";
import default_profileImage from '../../assets/img/default_profile_image.png';

import * as api from '../../api/index';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(styles);
const checkboxStyles = makeStyles(checkboxAndRadioStyles);

const SetProfile = () => {
    const classes = useStyles();
    const checkboxClasses = checkboxStyles();
    const [notif, setNotif] = useState({ open: false, message: "", color: "info" });
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(false);
    const profile = JSON.parse(localStorage.getItem('profile')).result;
    const [imageUrl, setImageUrl] = useState(profile.imageUrl);
    const [image, setImage] = useState();
    const [country, setCountry] = useState();
    const [region, setRegion] = useState();
    const [conditions, setConditions] = useState(false);
    const [city, setCity] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        var localUser = JSON.parse(localStorage.getItem("profile"));

        var formData = new FormData();
        formData.append("country", country);
        formData.append("region", region);
        formData.append("city", city);
        formData.append("termsAgreed", conditions);
        formData.append("uid", localUser.result.uid);
        formData.append("privateKey", localUser.result.privateKey);
        formData.append("imageUrl", imageUrl);
        formData.append("image", image);

        await api.updateProfile(formData)
            .then((response) => {
                setLoading(false);
                if (response.data.success) {
                    var profile = JSON.parse(localStorage.getItem("profile"));
                    profile["result"].termsAgreed = true;
                    localStorage.setItem("profile", JSON.stringify(profile));
                    
                    setRedirect(true);
                }
                else {
                    setNotif({ open: true, color: "danger", message: response.data.message ? response.data.message : "Something went wrong!" });
                    setTimeout(function () {
                        setNotif({ open: false, message: "" });
                    }, 5000);
                }
            })
            .catch((error) => {
                setLoading(false);
                var response = error?.response;
                setNotif({ open: true, color: "danger", message: response ? response.data?.message : "Something went wrong!" });
                setTimeout(function () {
                    setNotif({ open: false, message: "" });
                }, 5000);
            });

    }

    return (
        <div className={classes.root}>

            {redirect ? <Redirect to="/app/user" /> : null}

            <Snackbar
                place="tr"
                color={notif.color}
                icon={AddAlert}
                message={notif.message}
                open={notif.open}
                closeNotification={() => setNotif({ open: false, message: "" })}
                close
            />
            <GridContainer >
                <GridItem xs={12} sm={2}></GridItem>

                <GridItem xs={12} sm={8}>
                    <form onSubmit={handleSubmit}>
                        {/* Profile Imgage setter card */}
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Profile Image</h4>
                                <p className={classes.cardCategoryWhite}> This image will be visible to others</p>
                            </CardHeader>
                            <CardBody profile>
                                <GridContainer>
                                    <GridItem xs={12} sm={4}>
                                        <div className={classes.image}>
                                            <h5>Image Preview</h5>
                                            {image ?
                                                <img
                                                    className={classes.profileImage}
                                                    src={imageUrl ? imageUrl : URL.createObjectURL(image)}
                                                    alt="Profile"
                                                /> :
                                                <img
                                                    className={classes.profileImage}
                                                    src={default_profileImage}
                                                    alt="Profile"
                                                />
                                            }
                                        </div>
                                    </GridItem>
                                    <GridItem xs={12} sm={8}>
                                        <div className={classes.selectImage}>
                                            <input
                                                type="file"
                                                id="projectImage"
                                                accept="image/*"
                                                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                                onChange={event => {
                                                    const file = event.target.files[0];
                                                    setImage(file);
                                                    setImageUrl(null);
                                                }} />
                                            {image ?
                                                <img src={imageUrl ? imageUrl : URL.createObjectURL(image)} className={classes.imagePreview} alt="project-logo" />
                                                : <img src={default_profileImage} className={classes.imagePreview} alt="project-logo" />
                                            }
                                            <Muted><i>Preferred: square dimensions - 400x400 or 512x512 (png, jpg, or jpeg)</i></Muted>
                                        </div>
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>

                        {/* Country-Region-City Card  */}
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Tell us about you!</h4>
                                <p className={classes.cardCategoryWhite}> This is to help others recognize you better</p>
                            </CardHeader>
                            <CardBody>
                                <CountryRegionCity
                                    country={country}
                                    region={region}
                                    setCountry={setCountry}
                                    setRegion={setRegion}
                                    setCity={setCity}
                                />
                            </CardBody>
                        </Card>

                        {/* Accept Policy Card  */}
                        <Card>
                            <CardBody>
                                {loading ? <LinearProgress /> : null}

                                <Checkbox
                                    checked={conditions}
                                    tabIndex={-1}
                                    onClick={() => setConditions(!conditions)}
                                    checkedIcon={<Check className={checkboxClasses.checkedIcon} />}
                                    icon={<Check className={checkboxClasses.uncheckedIcon} />}
                                    classes={{
                                        checked: checkboxClasses.checked,
                                        root: checkboxClasses.root
                                    }}
                                    name="conditions"
                                /> I AGREE
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Donec dignissim eu lectus sit amet fermentum. Vivamus eros orci,
                                laoreet in pharetra sed, tristique in lacus. Suspendisse justo libero,
                                euismod id neque a, commodo lobortis tortor. Vivamus ullamcorper, risus
                                at ultricies consequat, quam justo pulvinar massa, et sollicitudin quam
                                arcu eleifend metus. Quisque a dapibus ipsum, sit amet posuere felis. Curabitur blandit eu diam a porta.
                                Nulla pharetra vitae tortor vitae pharetra. Nullam imperdiet semper nulla, sit amet pulvinar arcu rutrum non.
                                </p>
                                <Button type="submit" color="primary" disabled={!conditions}>Submit</Button>
                            </CardBody>
                        </Card>
                    </form>
                </GridItem>
            </GridContainer>
        </div>
    )
}


export default SetProfile;
import React, { useState, useEffect } from 'react';

import AddAlert from "@material-ui/icons/AddAlert";
import Check from "@material-ui/icons/Check";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// import LinearProgress from '@material-ui/core/LinearProgress';
import { TextField, Switch } from '@material-ui/core';

import Snackbar from "../../components/Snackbar/Snackbar.js";
import Button from "../../components/CustomButtons/Button.js";
import CountryRegionCity from "../../components/CountryRegionCity/CountryRegionCity.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardHeader from "../../components/Card/CardHeader.js";
import Muted from "../../components/Typography/Muted.js";
import { useHistory } from 'react-router-dom';

import * as api from '../../api/index';

import styles from "../../assets/jss/appstyles/views/setProfile.js";
import checkboxAndRadioStyles from "../../assets/jss/appstyles/checkboxAdnRadioStyle.js";
import { fname, lname } from './RandomNameLists.js';

const useStyles = makeStyles(styles);
const checkboxStyles = makeStyles(checkboxAndRadioStyles);

function capFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateName() {

    var name = capFirst(fname[getRandomInt(0, fname.length + 1)]) + ' ' + capFirst(lname[getRandomInt(0, lname.length + 1)]);
    return name;

}

const CreateExperience = () => {
    const classes = useStyles();
    const history = useHistory();
    const checkboxClasses = checkboxStyles();
    const [notif, setNotif] = useState({ open: false, message: "", color: "info" });
    // const [loading, setLoading] = useState(false);

    const localUser = JSON.parse(localStorage.getItem("profile"));
    const [user, setUser] = useState({
        firstName: localUser.result.firstName,
        lastName: localUser.result.lastName,
    });

    useEffect(() => {
        api.fetchUserData({ uid: localUser.result.uid, privateKey: localUser.result.privateKey })
            .then((response) => {
                setUser(response.data.user);
            })
            .catch((error) => {
                var response = error.response?.data;
                setNotif({ open: true, color: "danger", message: response?.message });
                setTimeout(function () {
                    setNotif({ open: false, message: "" });
                }, 5000);
            });

    }, [localUser.result.uid, localUser.result.privateKey]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [country, setCountry] = useState(user.country);
    const [region, setRegion] = useState(user.region);
    const [city, setCity] = useState(user.city);
    const [category, setCategory] = useState('experience');
    const [conditions, setConditions] = useState(false);
    const [useLocation, setUseLocation] = useState(true);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const fullName = `${user.firstName} ${user.lastName}`

    const handleSubmit = async (e) => {
        e.preventDefault();
        var formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("country", country ? country : user.country);
        formData.append("region", region ? region : user.region);
        formData.append("city", city ? city : user.city);
        formData.append("category", category);
        formData.append("creator_id", localUser.result.uid);
        formData.append("creator_name", isAnonymous ? generateName() : fullName);

        api.createNewExperience(formData)
            .then(function (response) {
                setNotif({ open: true, color: "success", message: response.data.message + ' Redirecting you!' });
                setTimeout(function () {
                    setNotif({ open: false, message: "" });
                }, 5000);
                setTimeout(function(){
                    history.push("/app/forum");
               }, 2000);
            })
            .catch(function (error) {
                var response = error.response.data;
                setNotif({ open: true, color: "danger", message: "Post not created! " + response.message });
                setTimeout(function () {
                    setNotif({ open: false, message: "" });
                }, 5000);
            });

    }

    return (
        <div>
            <div className={classes.root}>

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
                    <GridItem xs={12} sm={1}></GridItem>
                    <GridItem xs={12} sm={10}>
                        <form onSubmit={handleSubmit}>

                            {/* Title and desciption card  */}
                            <Card>
                                <CardHeader color="primary">
                                    <h4 className={classes.cardTitleWhite}>What do you want to talk about?</h4>
                                    <p className={classes.cardCategoryWhite}>Share your experience/knowledge with other people!</p>
                                </CardHeader>
                                <CardBody>
                                    <TextField variant="outlined" value={title} label="Title of your Post" fullWidth className={classes.cardTextField} onChange={(e) => setTitle(e.target.value)} required />
                                    <TextField variant="outlined" value={description} label="Write your post here!" fullWidth className={classes.cardTextField} multiline rows={6} onChange={(e) => setDescription(e.target.value)} required />
                                    <br />

                                    <div style={{ margin: '1rem 0' }}>
                                        <div style={{ display: 'flex' }}>
                                            <label style={{ padding: '12px 0' }}>Use your profile location?</label>
                                            <Switch
                                                color="primary"
                                                checked={useLocation}
                                                onChange={() => { setUseLocation(!useLocation); setCountry(user.country); setRegion(user.region); setCity(user.city) }}
                                            />
                                        </div>
                                        {
                                            !useLocation ?
                                                <CountryRegionCity
                                                    country={country}
                                                    region={region}
                                                    city={city}
                                                    setCountry={setCountry}
                                                    setRegion={setRegion}
                                                    setCity={setCity}
                                                /> : <p><i>Currently using your profile location!</i></p>
                                        }
                                    </div>

                                    <label style={{ padding: '12px 0' }}>Category</label>
                                    <RadioGroup aria-label="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                        <FormControlLabel className={classes.cardRadioLabel} value="experience" control={<Radio />} label="Experience" />
                                        <FormControlLabel className={classes.cardRadioLabel} value="infopost" control={<Radio />} label="Information Post" />
                                    </RadioGroup>
                                </CardBody>
                            </Card>

                            {/* Post Issue Anonymously  */}
                            <Card>
                                <CardBody>
                                    <div style={{ display: 'flex' }}>
                                        <label style={{ padding: '12px 0' }}>Do you want to piece this issue anonymously?</label>
                                        <Switch
                                            color="primary"
                                            checked={isAnonymous}
                                            onChange={() => setIsAnonymous(!isAnonymous)}
                                        />
                                    </div>

                                </CardBody>
                            </Card>

                            {/* Accept Policy Card  */}
                            <Card>
                                <CardBody>
                                    {/* {loading ? <LinearProgress /> : null} */}

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
                                    <div>
                                        1. No Promotions or spam <br />
                                        <Muted>Give more than you take to the society. Self-promotion, spam, and irrelevant content are not acceptable.</Muted>
                                        <br />
                                        2. No Harmful Content <br />
                                        <Muted>Do not post any content that is harmful to the community or the users.</Muted>
                                        <br />
                                        3. Anonmity <br/>
                                        <Muted>If you chose to not disclose your identity with this post, your name will not be visible to the readers! </Muted>
                                    </div>
                                    <Button type="submit" color="primary" disabled={!conditions}>Submit</Button>
                                </CardBody>
                            </Card>
                        </form>
                    </GridItem>
                    <GridItem xs={12} sm={1}></GridItem>
                </GridContainer>
            </div>
        </div>
    )
}

export default CreateExperience
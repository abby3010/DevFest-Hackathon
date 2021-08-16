import React, { useState } from 'react'
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardHeader from "../../components/Card/CardHeader.js";
import GridItem from "../../components/Grid/GridItem.js";
import Divider from '@material-ui/core/Divider';
import CardFooter from '../../components/Card/CardFooter';
import PlaceIcon from '@material-ui/icons/Place';
import { Typography } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import Button from '../../components/CustomButtons/Button';
import { likeExp } from '../../redux/auth/actions/post';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const ExperienceCard = ({ exp }) => {
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem("profile"));

    const [isLiked, setIsLiked] = useState(exp.likes.find((like) => like === (user?.result?.privateKey)) ? true : false)

    function timeConverter(timestamp) {
        var a = new Date(timestamp);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var month = months[a.getMonth()];
        var date = a.getDate();
        var year = a.getUTCFullYear();
        var time = `${date} ${month}, ${year}`
        return time;
    }

    return (
        <GridItem xs={12} sm={6}>
            <Card>
                <CardHeader color={exp.category === 'infopost' ? "info" : 'warning'}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body1" gutterBottom>
                            {exp.title}
                        </Typography>
                        <Button size="sm" color="transparent" disabled={!user?.result} onClick={() => {dispatch(likeExp(exp._id)); setIsLiked(!isLiked)}}>
                            {
                                isLiked ? <ThumbUpIcon /> : <ThumbUpAltOutlinedIcon />
                            }
                        </Button>
                    </div>
                </CardHeader>
                <CardBody key={exp._id}>
                    <Typography variant="subtitle1" gutterBottom>
                        {exp.description}
                    </Typography>
                    <i><p style={{ marginTop: '10px', color: 'grey', textAlign: 'right' }}>{`- ${exp.creator_name}`}</p></i>
                    {/* <img src={exp.imageURL} alt={exp.title} className={classes.img}></img> */}
                    <Divider />
                </CardBody>
                <CardFooter>
                    <p style={{ color: 'grey' }}>{timeConverter(exp.createdAt)}</p>
                    <div style={{ display: 'flex' }}>
                        <PlaceIcon fontSize='small' color='disabled' />
                        <p style={{ marginLeft: '3px', color: 'grey' }}>{`${exp.country}, ${exp.region}`}</p>
                    </div>
                </CardFooter>
            </Card>
        </GridItem>
    )
}

export default ExperienceCard

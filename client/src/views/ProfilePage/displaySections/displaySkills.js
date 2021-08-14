import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";

const useStyles = makeStyles((theme) => ({
    skills: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

const DisplaySkills = (props) => {
    const classes = useStyles();

    return (<>
        {
            props.skills.length === 0 ?
                <p>Add skills to flaunt it to other viewers</p>
                :
                <GridContainer>
                    <GridItem xs={12} sm={12}>
                        <div className={classes.skills}>
                            {props.skills.map((sk, key) => {
                                return <Chip
                                    key={key}
                                    label={sk}
                                    color="primary"
                                    variant="outlined"
                                />
                            })}
                        </div>
                    </GridItem>
                </GridContainer>

        }
    </>
    );
}

export default DisplaySkills;
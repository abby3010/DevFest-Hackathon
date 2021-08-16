import React from 'react';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Button from "../../components/CustomButtons/Button.js";
import Nav from '../LandingPage/Nav';
import vec from '../../assets/img/backgrounds/wallpaper7.png';
import { useHistory } from 'react-router-dom';
export const PageNotFound = () => {
    const history = useHistory();
    return (
        <>
            <Nav />
            <div style={{ overflowX: 'clip', padding: '5rem 5rem' }}>
                <GridContainer>
                    <GridItem xs={12} sm={6}>
                        <img style={{ width: '100%', height: '100%' }} src={vec} alt="" />
                    </GridItem>
                    <GridItem align="center" xs={12} sm={6}>
                        <h3>Page not found</h3>
                        <h4>Oops! Looks like you are on the wrong page.</h4>
                        <Button color="rose" round onClick={() => history.push("/app/portals")}>Portals</Button>
                        <Button color="rose" round onClick={() => history.push("/app/forum")}>Forum</Button>
                    </GridItem>
                </GridContainer>
            </div>
        </>
    )
}

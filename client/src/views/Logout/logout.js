import { useCallback } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";

import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import Button from "../../components/CustomButtons/Button";
// import { Button } from "@material-ui/core";

export default function Logout() {
    const dispatch = useDispatch();
    const history = useHistory();

    const logout = useCallback(() => {
        dispatch({ type: "LOGOUT" });

        history.push('/auth');
    }, [history, dispatch]);

    return (
        <>
            <GridContainer>
            <GridItem xs={12} md={3}></GridItem>
                <GridItem xs={12} md={6}>
                    <Card style={{textAlign: "center"}}>
                        <CardHeader color="primary">
                            <h3>Confirm Logout</h3>
                        </CardHeader>
                        <CardBody>
                            Are you sure that you want to Logout? <br/>
                            You would still be able to use most of the functionality!
                            <br/>
                            <Button color="danger" round onClick={logout}>
                                Logout
                            </Button>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </>
    );

}
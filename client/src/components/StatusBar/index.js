import React from "react";
import { Container, Row, Col } from "../Grid";
import "./style.css";

// Run page will hold one of these components and will need to use state to update the props when they change on Run pages end.
function StatusBar(props) {
    let bar;
    let status;
    let time = props.time; // Formatting will need to be done here once we know how we are passing the time
    switch(props.status){
        case "taking":
            status = "Taking Orders";
            time = "Place by " + time;
            bar =   <Row>
                        <Col style={{"background-color": "dark-gray"}}></Col>
                        <Col style={{"background-color": "white"}}></Col>
                        <Col style={{"background-color": "white"}}></Col>
                        <Col style={{"background-color": "white"}}></Col>
                    </Row>;
            break;
        case "placed":
            status = "Order Placed";
            bar =   <Row>
                        <Col style={{"background-color": "dark-gray"}}></Col>
                        <Col style={{"background-color": "dark-gray"}}></Col>
                        <Col style={{"background-color": "white"}}></Col>
                        <Col style={{"background-color": "white"}}></Col>
                    </Row>;
            break;
        case "pickedUp":
            status = "Food Picked Up";
            bar =   <Row>
                        <Col style={{"background-color": "dark-gray"}}></Col>
                        <Col style={{"background-color": "dark-gray"}}></Col>
                        <Col style={{"background-color": "dark-gray"}}></Col>
                        <Col style={{"background-color": "white"}}></Col>
                    </Row>;
            break;
        case "delivered":
            status = "Food Delivered";
            bar =   <Row>
                        <Col style={{"background-color": "dark-gray"}}></Col>
                        <Col style={{"background-color": "dark-gray"}}></Col>
                        <Col style={{"background-color": "dark-gray"}}></Col>
                        <Col style={{"background-color": "dark-gray"}}></Col>
                    </Row>;
            break;
        default:
            throw 'No status given to StatusBar component!';
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>{status+' - '+ time}</Col>
                </Row>
                {bar}
            </Container>
        </div>
    );
}

export default StatusBar;
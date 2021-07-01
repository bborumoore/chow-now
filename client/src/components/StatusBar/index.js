import React from "react";
import "./style.css";

// Run page will hold one of these components and will need to use state to update the props when they change on Run pages end.
function StatusBar(props) {
    let bar;
    let status;
    let time = props.time; // Formatting will need to be done here once we know how we are passing the time
    switch(props.status){
        case "started":
            status = "Taking Orders";
            time = "Place by " + time;
            bar =   <div className="row">
                        <div className="col-3" style={{"background-color": "gray"}}></div>
                        <div className="col-3" style={{"background-color": "white"}}></div>
                        <div className="col-3" style={{"background-color": "white"}}></div>
                        <div className="col-3" style={{"background-color": "white"}}></div>
                    </div>;
            break;
        case "ordered":
            status = "Order Placed";
            bar =   <div className="row">
                        <div className="col-3" style={{"background-color": "gray"}}></div>
                        <div className="col-3" style={{"background-color": "gray"}}></div>
                        <div className="col-3" style={{"background-color": "white"}}></div>
                        <div className="col-3" style={{"background-color": "white"}}></div>
                    </div>;
            break;
        case "pickedUp":
            status = "Food Picked Up";
            bar =   <div className="row">
                        <div className="col-3" style={{"background-color": "gray"}}></div>
                        <div className="col-3" style={{"background-color": "gray"}}></div>
                        <div className="col-3" style={{"background-color": "gray"}}></div>
                        <div className="col-3" style={{"background-color": "white"}}></div>
                    </div>;
            break;
        case "delivered":
            status = "Food Delivered";
            bar =   <div className="row">
                        <div className="col-3" style={{"background-color": "gray"}}></div>
                        <div className="col-3" style={{"background-color": "gray"}}></div>
                        <div className="col-3" style={{"background-color": "gray"}}></div>
                        <div className="col-3" style={{"background-color": "gray"}}></div>
                    </div>;
            break;
        default:
            throw 'No status given to StatusBar component!';
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12">{status+' - '+ time}</div>
                </div>
                {bar}
            </div>
        </div>
    );
}

export default StatusBar;
import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import { Link, useParams } from "react-router-dom";
import API from "../utils/API";
import RestaurantBox from "../components/RestaurantBox";
import IncompleteRun from "../components/IncompleteRun";
import { PromiseProvider } from "mongoose";

function Dashboard() {

    // Grab id passed in url
    const {uid} = useParams();

    // Arrays to hold associated componenets.
    const [runInvites, setInvites] = useState([]);
    const [activeRuns, setActiveRuns] = useState([]);
    const [incompleteRuns, setIncompleteRuns] = useState([]);
    const [ious, setIOUS] = useState([]);

    // Get all runs
    const [allRuns, setAllRuns] = useState([]);
    useEffect(() => {
        API.getRuns()
            .then((res)=>{
                setAllRuns(res.data);
            })
            .catch(err => console.log(err));
    }, []);
    console.log("All Runs:",allRuns);

    // filter all runs by user
    let myRuns = [];
    for(let iRun = 0; iRun < allRuns.length; iRun++) {
        if (allRuns[iRun].runner === uid) {
            myRuns.push(allRuns[iRun]);
        }
    }
    console.log("My Runs:",myRuns);

    // Filter my runs by active and incomplete
    useEffect(() => {
        let tmp_activeRuns = [];
        setIncompleteRuns([]);
        for(let iRun = 0; iRun < myRuns.length; iRun++) {
            const run  = myRuns[iRun];
            const run_id = run._id;
            const status = run.status;
            const rest_name = run.restaurantName;
            const rest_address = run.restaurantAddress;
            if (status === "started" || status === "ordered" || status === "pickedUp") {
                tmp_activeRuns.push(<RestaurantBox key={run_id} run_id={run_id} restaurant_name={rest_name} address={rest_address}/>);
            } else if (status == "delivered") {
                const orders = run.orders;
                for( let iOrder = 0; iOrder < orders.length; iOrder++) {
                    const order = orders[iOrder];
                    const order_paid = order.orderPaid;
                    if( !order_paid ) {
                        const order_id = order.objectID;
                        API.getOrder(order_id)
                        .then((res) => res.data)
                        .then((data) => {
                            console.log(data);
                            const orders_user = data.user;
                            const order_total = data.orderTotal;
                            API.getUser(orders_user)
                            .then((res) => {
                                const user_name = res.data.firstName;
                                setIncompleteRuns(incompleteRuns.concat([<IncompleteRun key={run_id} name={user_name} owed_amount={order_total} run_id={run_id}/>]));
                            });
                        });
                    }
                }
            }
        }
        setActiveRuns(tmp_activeRuns);
        //setIncompleteRuns(tmp_incompleteRuns);
    }, [allRuns]);
    console.log("Active Runs:", activeRuns);
    console.log("Incomplete Runs:", incompleteRuns);

    return (
        <div>
            <Jumbotron>
                <h1>My Dashboard</h1>
            </Jumbotron>
            
            {runInvites.length > 0 &&
                <div>
                    <h3>Run Invites:</h3>
                    {runInvites}
                </div>
            }

            <h3>Active Runs:</h3>
            {activeRuns.length > 0 ? activeRuns : <Link to="/newrun" style={{border: "3px solid black"}}>Create Run</Link>}

            <h3>Incomplete Runs:</h3>
            {incompleteRuns.length > 0 ? incompleteRuns : <h3 style={{border: "3px solid black"}}>None</h3>}

            <h3>IOUs:</h3>
            {ious.length > 0 ? ious : <h3 style={{border: "3px solid black"}}>None</h3>}

        </div>
    );
}

export default Dashboard;

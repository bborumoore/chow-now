import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import { Link, useParams } from "react-router-dom";
import API from "../utils/API";
import RestaurantBox from "../components/RestaurantBox";
import IncompleteRun from "../components/IncompleteRun";
import Iou from "../components/Iou";
import { getFromStorage } from "../utils/storage";

async function getActiveAndIncompleteRuns(myRuns, activeCB, incompleteCB) {
    let tmp_activeRuns = [];
    let tmp_incompleteRuns = [];
    for (let iRun = 0; iRun < myRuns.length; iRun++) {
        const run = myRuns[iRun];
        const run_id = run._id;
        const status = run.status;
        const rest_name = run.restaurantName;
        const rest_address = run.restaurantAddress;
        if (status === "started" || status === "ordered" || status === "pickedUp") {
            tmp_activeRuns.push(<RestaurantBox key={run_id} run_id={run_id} restaurant_name={rest_name} address={rest_address} />);
        } else if (status === "delivered") {
            const orders = run.orders;
            for (let iOrder = 0; iOrder < orders.length; iOrder++) {
                const order = orders[iOrder];
                const order_paid = order.orderPaid;
                if (!order_paid) {
                    const order_id = order.objectID;
                    console.log("Getting orders.")
                    await API.getOrder(order_id)
                        .then((res) => res.data)
                        .then(async (data) => {
                            const orders_user = data.user;
                            const order_total = (data.orderTotal / 100).toFixed(2);
                            await API.getUser(orders_user)
                                .then((res) => {
                                    const user_name = res.data.firstName;
                                    tmp_incompleteRuns.push([<IncompleteRun key={run_id} name={user_name} owed_amount={order_total} run_id={run_id} />]);
                                });
                        });
                }
            }
        }
    }
    activeCB(tmp_activeRuns);
    incompleteCB(tmp_incompleteRuns);
}

async function getIOUS(othersRuns, iousCB, uid) {
    let tmp_ious = [];
    for (let iRun = 0; iRun < othersRuns.length; iRun++) {
        const run = othersRuns[iRun];
        const run_id = run._id;
        const status = run.status;
        const runner = run.runner;
        if (status === "delivered") {
            const orders = run.orders;
            for (let iOrder = 0; iOrder < orders.length; iOrder++) {
                const order = orders[iOrder];
                const order_paid = order.orderPaid;
                if (!order_paid) {
                    const order_id = order.objectID;
                    await API.getOrder(order_id)
                        .then((res) => res.data)
                        .then(async (data) => {
                            const orders_user = data.user;
                            const order_total = (data.orderTotal / 100).toFixed(2);
                            console.log(uid, orders_user);
                            if (uid === orders_user) {
                                await API.getUser(runner)
                                    .then((res) => {
                                        const runner_name = res.data.firstName;
                                        tmp_ious.push([<Iou key={run_id} name={runner_name} owed_amount={order_total} run_id={run_id} />]);
                                    });
                            }
                        });
                }
            }
        }
    }
    iousCB(tmp_ious);
}

function Dashboard() {

    // Grab id passed in url
    // const { uid } = useParams();

    // Arrays to hold associated componenets.
    const [runInvites, setInvites] = useState([]);
    const [activeRuns, setActiveRuns] = useState([]);
    const [incompleteRuns, setIncompleteRuns] = useState([]);
    const [ious, setIOUS] = useState([]);
    const [uid, setUid] = useState("");

    // *SWITCHED* to get uid from localstorage
    // useEffect(() => {
    //     const obj = getFromStorage('chow-now');
    //     const { token } = obj;
    //     const uid = token;
    //     setUid(uid);
    //     console.log("token: " + token);

    // }, []);

    // Get all runs
    const [allRuns, setAllRuns] = useState([]);

    useEffect(() => {
        const obj = getFromStorage('chow-now');
        const { token } = obj;
        const uid = token;
        setUid(uid);
        console.log("token: " + token);
        API.getRuns()
            .then((res) => {
                setAllRuns(res.data);
                console.log("In the runs section.")
            })
            .catch(err => console.log(err));
    }, []);
    //console.log("All Runs:",allRuns);

    // filter all runs by user
    let myRuns = [];
    let othersRuns = [];
    for (let iRun = 0; iRun < allRuns.length; iRun++) {
        if (allRuns[iRun].runner === uid) {
            myRuns.push(allRuns[iRun]);
        } else {
            othersRuns.push(allRuns[iRun]);
        }
    }
    //console.log("My Runs:",myRuns);
    //console.log("Other's runs:",othersRuns);

    // Filter runs by active, incomplete, and ious
    useEffect(() => {
        getActiveAndIncompleteRuns(myRuns, setActiveRuns, setIncompleteRuns);
        getIOUS(othersRuns, setIOUS, uid);
    }, [allRuns]);
    //console.log("Active Runs:", activeRuns);
    console.log("Incomplete Runs:", incompleteRuns);
    console.log("ious:", ious);

    return (
        <div>
            <Jumbotron>
                <h1>My Dashboard</h1>
            </Jumbotron>

            {<Link to="/newrun" style={{ border: "3px solid black" }}>Create Run</Link>}

            {runInvites.length > 0 &&
                <div>
                    <h3>Run Invites:</h3>
                    {runInvites}
                </div>
            }

            <h3>Active Runs:</h3>
            {activeRuns.length > 0 ? activeRuns : <h3 style={{ border: "3px solid black" }}>None</h3>}

            <h3>Incomplete Runs:</h3>
            {incompleteRuns.length > 0 ? incompleteRuns : <h3 style={{ border: "3px solid black" }}>None</h3>}

            <h3>IOUs:</h3>
            {ious.length > 0 ? ious : <h3 style={{ border: "3px solid black" }}>None</h3>}

        </div>
    );
}

export default Dashboard;

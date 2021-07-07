import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantBox from "../components/RestaurantBox";
import UserOrder from "../components/UserOrder";
import StatusBar from "../components/StatusBar";
import MealBox from "../components/Meal/MealBox";
import { Button } from "../components/Button/Button";
import API from "../utils/API.js";
import { getFromStorage } from "../utils/storage";
import "./../styles/app.scss";

function formatTime(fourDigitTime) {
    var hours24 = parseInt(fourDigitTime.substring(0, 2));
    var hours = ((hours24 + 11) % 12) + 1;
    var amPm = hours24 > 11 ? 'pm' : 'am';
    var minutes = fourDigitTime.substring(2);

    return hours + minutes + amPm;
};

async function getRunFromAPI(rid, token, restNameCB, restAddressCB, statusCB, timeCB, ordersCB, inRunCB, isRunnerCB, myMealCB) {
    await API.getRun(rid)
        .then((res) => {
            if (res.data.runner === token)
                isRunnerCB(true);

            restNameCB(res.data.restaurantName);
            restAddressCB(res.data.restaurantAddress);
            statusCB(res.data.status);
            getOrdersFromAPI(res.data, ordersCB, token, inRunCB, myMealCB);
            timeCB(formatTime(res.data.time));
        })
        .catch(err => console.log(err));
}

async function getOrdersFromAPI(run, orderCB, token, inRunCB, myMealCB) {
    // Loop over the orders to get their IDs
    const orders_bare = run.orders;
    const order_ids = [];
    for (let i = 0; i < orders_bare.length; i++)
        order_ids.push(orders_bare[i].objectID);

    // Loop over the orders to get a list of users in the order, whether they've payed, and how much their total is/was.
    const orders = [];
    for (let iOrder = 0; iOrder < order_ids.length; iOrder++) {
        const order_id = order_ids[iOrder];
        await API.getOrder(order_id)
        .then((res) => res.data)
        .then(async (data) => {
            const orders_user = data.user;

            // Check if the current order is the users
            if( orders_user === token ) {
                // If it is, then the user is in the run
                inRunCB(true);

                // Reconstruct the user's order into a simple JSON object with the order's name and items
                const orderItemIds = data.orderItems;
                let tmp_orderItems = [];
                for(let iItem = 0; iItem < orderItemIds.length; iItem++){
                    await API.getOrderItem(orderItemIds[iItem])
                    .then((res) => {
                        tmp_orderItems.push(res.data);
                    });
                }
                const tmp_myMeal = {orderID: order_id, orderName: data.orderName, orderItems: tmp_orderItems};
                myMealCB(tmp_myMeal);
            }

            // Get the order's total and status
            const order_total = (data.orderTotal/100).toFixed(2);
            const order_status = data.status;

            // Get the user's name
            await API.getUser(orders_user)
            .then((res) => {
                const user_name = res.data.firstName;

                // Create the React component that will display the relevant info
                orders.push(<UserOrder key={user_name} name={user_name} total={order_total} status={order_status} />);
            });
        });
    }
    orderCB(orders);
}

function copyToClipboard(event) {
    event.preventDefault();
    const copyText = document.getElementById("inviteLink").getAttribute('href');

    document.addEventListener('copy', function (event) {
        event.clipboardData.setData('text/plain', copyText);
        event.preventDefault();
    }, true);

    document.execCommand('copy');
    console.log('copied text : ', copyText);
    alert('copied text: ' + copyText);
}

function Run() {

    // Grab run id passed in url
    const { id } = useParams();
    const { token } = getFromStorage('chow-now');

    // Get all runs
    const [restaurant_name, setRestName] = useState("");
    const [restaurant_address, setRestAddress] = useState("");
    const [status, setStatus] = useState("started");
    const [time, setTime] = useState("*run has no time attribute*");
    const [orders, setOrders] = useState([]);
    const [userIsInRun, setUserIsInRun] = useState(false);
    const [isRunner, setIsRunner] = useState(false);
    const [myMeal, setMyMeal] = useState({
        orderName: "",
        orderItems: []
    });
    useEffect(() => {
        getRunFromAPI(id, token, setRestName, setRestAddress, setStatus, setTime, setOrders, setUserIsInRun, setIsRunner, setMyMeal);
    }, []);

    function addUserToRun() {
        const new_order = {
            user: token,
            orderItems: [],
            orderTotal: "$0"
        };
        API.createOrder(new_order)
            .then((res) => {
                let oid = res.data._id;
                API.getRun(id)
                    .then((res) => {
                        let tmp_orders = res.data.orders;
                        tmp_orders.push({ objectID: oid, orderPaid: false });
                        API.updateRun(id, {
                            orders: tmp_orders
                        }).then((res) => {
                            window.location.reload();
                        });
                    });
            });
    }

    return (
        <div>
            <RestaurantBox restaurant_name={restaurant_name} address={restaurant_address} run_id={id} />
            <StatusBar status={status} time={time} />
            <h3><a className="invite-link" id="inviteLink"
                href={window.location.hostname + ":" + window.location.port + "/run/" + id}
                onClick={copyToClipboard}
                style={{ "color": "#000" }}>
                Click here for invite link!
            </a></h3>
            <h3>Group:</h3>
            {orders.length > 0 ? orders : <h3>&emsp; No participants yet</h3>}

            <h3>My Meal:</h3>
            {userIsInRun ? <MealBox orderID={myMeal.orderID} orderName={myMeal.orderName ? myMeal.orderName : "Meal Name"} listOfItems={myMeal.orderItems} /> : false}

            {!userIsInRun && status === "started" ? <Button type="button" buttonSize="btn-lg" onClick={addUserToRun} >Add Me To Run!</Button> : false}

            {isRunner && status === "started" && orders.length > 0 ? <h3>Place Order</h3> : false}
            {isRunner && status === "ordered" ? <h3>Picked Up</h3> : false}
            {isRunner && status === "pickedUp" ? <h3>Mark Delivered</h3> : false}
            {isRunner && status === "delivered" ? <h3>Mark Completed</h3> : false}
            {isRunner && status === "completed" ? <h3>Completed!</h3> : false}
        </div>
    );
}

export default Run;
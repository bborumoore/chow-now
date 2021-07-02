import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantBox from "../components/RestaurantBox";
import UserOrder from "../components/UserOrder";
import StatusBar from "../components/StatusBar";
import API from "../utils/API.js";

async function getRunFromAPI(rid, restNameCB, restAddressCB, statusCB, timeCB, ordersCB) {
    await API.getRun(rid)
        .then((res)=>{
            restNameCB(res.data.restaurantName);
            restAddressCB(res.data.restaurantAddress);
            statusCB(res.data.status);
            getOrdersFromAPI(res.data,ordersCB);
        })
        .catch(err => console.log(err));
}

async function getOrdersFromAPI(run, orderCB) {
    const orders_bare = run.orders;
    const order_ids = [];
    for (let i = 0; i < orders_bare.length; i++)
        order_ids.push(orders_bare[i].objectID);

    const orders = [];
    for( let iOrder = 0; iOrder < order_ids.length; iOrder++) {
        const order_id = order_ids[iOrder];
        await API.getOrder(order_id)
        .then((res) => res.data)
        .then(async (data) => {
            const orders_user = data.user;
            const order_total = (data.orderTotal/100).toFixed(2);
            await API.getUser(orders_user)
            .then((res) => {
                const user_name = res.data.firstName;
                orders.push(<UserOrder name={user_name} total={order_total} status={"*need status in order model*"} />);
            });
        });
    }
    orderCB(orders);
}

function Run() {

    // Grab run id passed in url
    const {rid} = useParams();

    // Get all runs
    const [restaurant_name, setRestName] = useState("");
    const [restaurant_address, setRestAddress] = useState("");
    const [status, setStatus] = useState("started");
    const [time, setTime] = useState("*need time component in run model*");
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        getRunFromAPI(rid, setRestName, setRestAddress, setStatus, setTime, setOrders);
    }, []);
    console.log(orders);

    return (
        <div>
            <RestaurantBox restaurant_name={restaurant_name} address={restaurant_address} run_id={rid}/>
            <StatusBar status={status} time={time}/>
            <h3>Group:</h3>
            {orders}
        </div>
    );
}

export default Run;
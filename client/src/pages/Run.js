import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantBox from "../components/RestaurantBox";
import UserOrder from "../components/UserOrder";
import StatusBar from "../components/StatusBar";
import API from "../utils/API.js";
import { getFromStorage } from "../utils/storage";

async function getRunFromAPI(rid, token, restNameCB, restAddressCB, statusCB, timeCB, ordersCB, inRunCB, isRunnerCB) {
    await API.getRun(rid)
        .then((res)=>{
            if(res.data.runner === token)
                isRunnerCB(true);

            restNameCB(res.data.restaurantName);
            restAddressCB(res.data.restaurantAddress);
            statusCB(res.data.status);
            getOrdersFromAPI(res.data,ordersCB, token, inRunCB);
        })
        .catch(err => console.log(err));
}

async function getOrdersFromAPI(run, orderCB, token, inRunCB) {
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
            if( orders_user === token )
                inRunCB(true);
            const order_total = (data.orderTotal/100).toFixed(2);
            await API.getUser(orders_user)
            .then((res) => {
                const user_name = res.data.firstName;
                orders.push(<UserOrder key={user_name} name={user_name} total={order_total} status={"*need status in order model*"} />);
            });
        });
    }
    orderCB(orders);
}

function copyToClipboard(event) {
    event.preventDefault();
    const copyText = document.getElementById("inviteLink").getAttribute('href');

    document.addEventListener('copy', function(event) {
        event.clipboardData.setData('text/plain', copyText);
        event.preventDefault();
    }, true);

    document.execCommand('copy');  
    console.log('copied text : ', copyText);
    alert('copied text: ' + copyText); 
}

function Run() {

    // Grab run id passed in url
    const {id} = useParams();
    const { token } = getFromStorage('chow-now');

    // Get all runs
    const [restaurant_name, setRestName] = useState("");
    const [restaurant_address, setRestAddress] = useState("");
    const [status, setStatus] = useState("started");
    const [time, setTime] = useState("*need time component in run model*");
    const [orders, setOrders] = useState([]);
    const [userIsInRun, setUserIsInRun] = useState(false);
    const [isRunner, setIsRunner] = useState(false);
    useEffect(() => {
        getRunFromAPI(id, token, setRestName, setRestAddress, setStatus, setTime, setOrders, setUserIsInRun, setIsRunner);
    }, []);

    return (
        <div>
            <RestaurantBox restaurant_name={restaurant_name} address={restaurant_address} run_id={id}/>
            <StatusBar status={status} time={time}/>
            <h3><a  id="inviteLink" 
                href={window.location.hostname + ":" + window.location.port + "/run/" + id} 
                onClick={copyToClipboard}
                style={{"color": "#000"}}>
                    Click here for invite link!
            </a></h3>
            <h3>Group:</h3>
            {orders}

            <h3>Meal Placeholder</h3>

            {!userIsInRun ? <h3>Add Me To Run!</h3> : false}
            {isRunner ? <h3>Place Order</h3> : false}
        </div>
    );
}

export default Run;
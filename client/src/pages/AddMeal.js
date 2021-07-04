import React, { useState, useEffect } from "react";
import Navbar from "../components/Nav";
import Jumbotron from "../components/Jumbotron";
import MealBox from "../components/Meal/MealBox";

// import { useParams } from "react-router-dom";

function AddMeal() {

    const [listItems, setItems] = useState([
        // DUMMY DATA FOR TESTING:
        {
            orderItemName: "Burger",
            orderItemNotes: "extra cheese",
            orderItemQty: "2",
            orderItemPrice: "$3.25"
        },
        {
            orderItemName: "Fries",
            orderItemNotes: "",
            orderItemQty: "1",
            orderItemPrice: "$1.75"
        },
        {
            orderItemName: "Drink",
            orderItemNotes: "light ice",
            orderItemQty: "1",
            orderItemPrice: "$1.75"
        }
    ]);
    useEffect(() => {
        console.log("test string for useEffect");
        // fetch from api data stuffs
    }, [])


    return (
        <div className="page">
            <Navbar />
            <Jumbotron>
                Add Meal
            </Jumbotron>
            <MealBox listOfItems={listItems} />
        </div>
    );
}

export default AddMeal;

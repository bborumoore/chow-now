import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import MealBox from "../components/Meal/MealBox";

function AddMeal() {

    const [listItems, setItems] = useState([
        // DUMMY DATA FOR TESTING:
        {
            orderItemName: "Cheeseburger",
            orderItemNotes: "No pickles, extra cheese",
            orderItemQty: "1",
            orderItemPrice: "$4.99"
        },
        {
            orderItemName: "Large Fries",
            orderItemNotes: "",
            orderItemQty: "2",
            orderItemPrice: "$3.25"
        }
    ]);
    useEffect(() => {
        console.log("test string for useEffect");
        // fetch from api data stuffs
    }, [])

    return (
        <div>
            <Jumbotron>
                Add Meal
            </Jumbotron>
            <MealBox listOfItems={listItems} />
        </div>
    );
}

export default AddMeal;

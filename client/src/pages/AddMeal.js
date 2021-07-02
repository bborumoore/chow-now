import React, { useState, useEffect } from "react";
import Navbar from "../components/Nav";
import Jumbotron from "../components/Jumbotron";
import MealBox from "../components/Meal/MealBox";

// import { useParams } from "react-router-dom";

function AddMeal() {

    const [listItems, setItems] = useState([
        // DUMMY DATA FOR TESTING:
        {
            orderItemName: "order name",
            orderItemNotes: "there is a note here",
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
            <Navbar />
            <Jumbotron>
                Add Meal
            </Jumbotron>
            <MealBox listOfItems={listItems} />
        </div>
    );
}

export default AddMeal;

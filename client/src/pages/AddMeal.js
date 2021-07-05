import React, { useState, useEffect } from "react";
import Navbar from "../components/Nav";
import Jumbotron from "../components/Jumbotron";
import MealBox from "../components/Meal/MealBox";
import AddMealBtn from "../components/Button/AddMealBtn";


import MealEditItem from "../components/Meal/MealEdit/MealEditItem";
import MealEditItemHeader from "../components/Meal/MealEdit/MealEditItemHeader";
import MealEditBox from "../components/Meal/MealEdit/MealEditBox";

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
            <Jumbotron>
                <h1>Add Meal</h1>
            </Jumbotron>
            <MealBox listOfItems={listItems} />
            <MealEditBox>
                <MealEditItemHeader />
                <MealEditItem />
            </MealEditBox>
            <AddMealBtn />
        </div>
    );
}

export default AddMeal;
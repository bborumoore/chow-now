import React, { useState, useEffect } from "react";
import Jumbotron from "../../components/Jumbotron";
import { useParams } from "react-router-dom";
import EditMealBtn from "../../components/Button/EditMealBtn";
import SaveMealBtn from "../../components/Button/SaveMealBtn";
import API from "../../utils/API";
import "./style.css"

function History() {
  // Grab id passed in url
  const { id } = useParams();
  const [runHistory, setRunHistory] = useState([
    // {
    //   runner: "Jamie",
    //   orders: [{ orderPaid: true, objectID: "123456" }],
    //   status: "completed",
    //   restaurantName: "Chipotle",
    //   restaurantAddress: "1234 1st St.",
    // },
    // {
    //   runner: "Marina",
    //   orders: [{ orderPaid: true, objectID: "123456" }],
    //   status: "completed",
    //   restaurantName: "Chipotle",
    //   restaurantAddress: "1234 1st St.",
    // },
    // {
    //   runner: "Bryce",
    //   orders: [{ orderPaid: true, objectID: "123456" }],
    //   status: "completed",
    //   restaurantName: "Chipotle",
    //   restaurantAddress: "1234 1st St.",
    // },
    // {
    //   runner: "Brian",
    //   orders: [{ orderPaid: true, objectID: "123456" }],
    //   status: "completed",
    //   restaurantName: "Chipotle",
    //   restaurantAddress: "1234 1st St.",
    // },
    // {
    //   runner: "Claire",
    //   orders: [{ orderPaid: true, objectID: "123456" }],
    //   status: "completed",
    //   restaurantName: "Chipotle",
    //   restaurantAddress: "1234 1st St.",
    // },
    // {
    //   runner: "Thomas",
    //   orders: [{ orderPaid: true, objectID: "123456" }, { orderPaid: true, objectID: "123457" },{ orderPaid: true, objectID: "123458" }],
    //   status: "completed",
    //   restaurantName: "Chipotle",
    //   restaurantAddress: "1234 1st St.",
    // },
  ]);

  useEffect(() => {
    API.getRuns()
    .then((res) => {
      setRunHistory(res.data);
      console.log("-----------");
      console.log("Response:");
      console.log(res);
      console.log("-----------");
    })
    .catch(err => console.log(err));
  }, []);

  console.log("-----------");
  console.log("runHistory:");
  console.log(runHistory);
  console.log("-----------");

  return (
    <div>

      <div className="History">
        <p>Order History</p>
      </div>

      {runHistory.map((run) => {
        return (
          <div>
            <h1>{run.runner}</h1>
            <ul>{run.orders.map( 
              order => <li>{order.objectID}</li>
            )}</ul>
            <h1>{run.status}</h1>
            <h1>{run.restaurantName}</h1>
            <h1>{run.restaurantAddress}</h1>
            <EditMealBtn />
            <SaveMealBtn />
          </div>
        );
        
      })}
    </div>
  );
}

export default History;

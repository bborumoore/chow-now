import React, { useState } from "react";
import EditMeal from "../components/EditMeal";


function EditMealPage(props) {
  const [isGoing, setIsGoing] = useState(false);
  const [numberOfGuests, setNumberOfGuests] = useState(0);

   const handleIsGoingChange = (event) => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
     
    setIsGoing(value)

    }

  const handleNumberOfGuestsChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    
  setNumberOfGuests(value)

    }
  
      return (
        <form>
          <label>
            Is going:
            <input
              name="IsGoing"
              type="checkbox"
              checked={isGoing}
              onChange={handleIsGoingChange} />
          </label>
          <br />
          <label>
            Number of guests:
            <input
              name="NumberOfGuests"
              type="number"
              value={numberOfGuests}
              onChange={handleNumberOfGuestsChange} />
          </label>
        </form>
      );
    
  }

  export default EditMealPage;
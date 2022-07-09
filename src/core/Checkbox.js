// when checkbox of paticular category is check 
// then fetch the data of that category and show it right side of shop page

import React, { useState } from "react";

// we give all category to this and this will return the category of user choice
// we are send back the data to shop component by using handleFilters its is function 
const Checkbox = ({ categories, handleFilters }) => {
    const [checked, setCheked] = useState([]);
    
    // when we click on check of particular category then this function trigger and take argument as category id
    const handleToggle = c => () => {
        // it will check that already that category item are there or not if there then return the first index or -1 if not there
        const currentCategoryId = checked.indexOf(c);
        const newCheckedCategoryId = [...checked];
        // if currently checked was not already in checked state > push
        // else pull/take off
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(c);
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }
        // console.log(newCheckedCategoryId);
        setCheked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);
    };

    return categories.map((c, i) => (
        <li key={i} className="list-unstyled">
            <input
                onChange={handleToggle(c._id)}
                value={checked.indexOf(c._id === -1)}
                type="checkbox"
                className="form-check-input"
            />
            <label className="form-check-label">{c.name}</label>
        </li>
    ));
};

export default Checkbox;
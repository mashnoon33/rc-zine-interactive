"use client";

import { useEffect, useMemo, useState } from "react";

export default function TestPage() {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const memoTest = inputValue + "test";

    useEffect(() => {
        console.log("thius will run only once");
    }, []);

    useEffect(() => {
        console.log("this will run when inputValue changes");
    }, [inputValue]);

    return (
        <div>
            <p>{inputValue}</p>
            <input 
                type="text" 
                value={inputValue} 
                onChange={handleInputChange} 
                placeholder="Enter text"
            />
            <p>Current input: {inputValue}</p>
        </div>
    );
}

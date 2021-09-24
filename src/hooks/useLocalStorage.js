import { useState } from "react";

export default function useLocalStorage(name) {
    const getItem = () => JSON.parse(localStorage.getItem(name));
    const [state, setstate] = useState(getItem());
    const setItem = value => {
        if(typeof value === "function") {
            value = value(getItem())
        }
        localStorage.setItem(name, JSON.stringify(value))
        setstate(value)
    }

    return [state, setItem]
}

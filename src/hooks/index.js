import { useEffect, useRef, useState } from "react";

export function useLocalStorage(name) {
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

const cookieValue = (name) => (
    document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`))
    .split('=')[1]
)

export function useCookieStorage(name) {
    const [state, setstate] = useState(cookieValue(name));
    const setItem = (value, maxAge) => {
        if(typeof value === "function") {
            value = value(cookieValue(name))
        }
        document.cookie = `${name}=${value}; max-age=${maxAge}; SameSite=Strict; Secure`
        setstate(value)
    }
    return [state, setItem]
}

export function useEscapeKey (updaterFunction) {
    useEffect(() => {
        const ifEscape = (e) => e.key === "Escape" && updaterFunction(false)
        document.addEventListener("keydown", ifEscape)        
        return () => {
            document.removeEventListener("keydown", ifEscape);
        }
    }, [updaterFunction])
}


export function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]); 
    return ref.current;
}
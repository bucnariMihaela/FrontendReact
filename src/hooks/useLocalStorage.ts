import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key);
        if (jsonValue != null) return JSON.parse(jsonValue);
        return initialValue;
    });

    useEffect(() => {
        if (value === undefined) return; // Ignoră dacă valoarea este undefined
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    const removeItem = () => {
        localStorage.removeItem(key);
        setValue(initialValue);
    };

    return { value, setValue, removeItem };
}
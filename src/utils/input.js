import { useState } from 'react';

// new custom hook
export function useInput(initialValue) {
    //initalValue can be a primitive type or CB function
    // if a CB function, whatever gets returned is the intitial value
  // make a little less specific to breed
  const [value, setValue] = useState(initialValue);
        //getter, setter

  const customSetter = (newValue) => { // this is a wrapper function
    console.log("New Value: ", newValue)
    setValue(newValue)
  }

  return [value, customSetter] // no new functionality; 
}

export function useLocalStorage(key, initialValue) {
    // in the DOM, we would do this:
    // window.localStorage.getItem(key, value)
    const [value, setValue] = useInput(() =>{
        //pull from local storage or initialValue 
        //return intitialValue <-- works just the same as saying useInput(initialValue)
        return window.localStorage.getItem(key) || initialValue;
    })

    const customSetter = (newValue) => {
        setValue(newValue)
        window.localStorage.setItem(key, newValue)
    }

    return [value, customSetter]

}
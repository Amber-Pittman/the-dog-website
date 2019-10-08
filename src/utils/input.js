// new custom hook
export function useInput(initialValue) {
  // make a little less specific to breed
  const [value, setValue] = useState(initialValue);

  const customSetter = (newValue) => { // this is a wrapper function
    console.log("New Value: ", newValue)
    setValue(newValue)
  }

  return [value, customSetter] // no new functionality; 
}
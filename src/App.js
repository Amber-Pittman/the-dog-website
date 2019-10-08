import React, { useEffect, useState } from 'react';
import axios from "axios";
import styled from "styled-components";
import { useLocalStorage } from './utils/input';

const ImgStyles = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    .picture {
      width: 400px;
      height: 400px;
      margin: 10px;
      overflow: hidden;
    }
`;

function App(props) {
  const [breed, setBreed] = useLocalStorage("breed", "husky"); //wrapped the hook in our custom hook
  const [count, setCount] =useLocalStorage("count", 1);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // this.setState({ images: [] })
    setImages([])
    // re-fetch images with new state value
    fetchDogImages()
  }, [breed, count])

  // const handleChange = (event) => { // MOVED INTO onCHANGE
  //   // change the state here --- make our select field controlled by react state
  //   // this.setState({
  //   //   breed: event.target.value
  //   // })
  //     setBreed(event.target.value)
  // }

  const fetchDogImages = () => {
    axios.get(`https://dog.ceo/api/breed/${breed}/images/random/${count}`)
      .then(result => {
        console.log(result.data.message)
        setImages(result.data.message)
      })
      .catch(error => {
        console.log("Error getting API Dog Images: ", error)
      })
    }

  return (
    <>
      <h1>The Dog Website</h1>

      <select value={breed} onChange={e => setBreed(e.target.value)}>
        <option value="husky">Husky</option>
        <option value="beagle">Beagle</option>
        <option value="corgi">Corgi</option>
        <option value="boxer">Boxer</option>
        <option value="wolfhound/irish">Irish Wolfhound</option>
      </select>

      <input 
        type="number"
        placeholder="Image Count"
        value={count}
        onChange={e => setCount(e.target.value)}
      />

      <ImgStyles>
        {images.map((image, index) => (
          <img key={index} 
               src={image} 
               alt="Dog" 
               data-pin-nopin="true" 
               className="picture" 
            />
        ))}
      </ImgStyles>
    </>
  )
}


export default App;
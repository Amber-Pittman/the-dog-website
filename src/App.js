import React from 'react';
// import axios from "axios";
import styled from "styled-components";
import { useLocalStorage } from './utils/input';
import { useDogImages } from './utils/api';

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
  const [images, /*setImages (not used here) */] = useDogImages(breed, count);


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
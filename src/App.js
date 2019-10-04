import React, { Component } from 'react';
import axios from "axios";
import styled from "styled-components";

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

class App extends Component {
  constructor() {
    super()

    this.state = { // set initial default state values
      breed: "husky",
      images: []
    }
  }

  componentDidMount() {
    this.fetchDogImages() //fetch images for the default state value (husky)
  }

  componentDidUpdate(prevProps, prevState) {
    // this if statement prevents an infinite loop
    // by only re-fetching if the breed has changed since the last update
    //
    // ----- same idea -----
    //   useEffect(() => {
    // 
    //   }, [breed])
    
    if (prevState.breed !== this.state.breed) {
      // give the user feedback that something is happening
      // by clearing out the current images while fetching new ones
      this.setState({ 
        images: [] 
      })

       // re-fetch images with new state value
       this.fetchDogImages()
      }
    }

    fetchDogImages = () => {
      axios.get(`https://dog.ceo/api/breed/${this.state.breed}/images`)
    .then(result => {
      console.log(result.data.message)
      this.setState({
          images: result.data.message
      })
    })
    .catch(error => {
      console.log("error: ", error)
    })
    }

  handleChange = (event) => {
    // change the state here --- make our select field controlled by react state
    this.setState({
      breed: event.target.value
    })
  }


  render() {
    return (
      <>
        <h1>The Dog Website</h1>

        <select value={this.state.breed} onChange={this.handleChange}>
          <option value="husky">Husky</option>
          <option value="beagle">Beagle</option>
          <option value="corgi">Corgi</option>
          <option value="boxer">Boxer</option>
          <option value="wolfhound/irish">Irish Wolfhound</option>
        </select>

        <ImgStyles>
          {this.state.images.map((image, index) => (
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
}

export default App;
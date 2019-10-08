import React from "react";

export function fetchDogImages = () => {
    axios.get(`https://dog.ceo/api/breed/${breed}/images/random/${count}`)
      .then(result => {
        console.log(result.data.message)
        setImages(result.data.message)
      })
      .catch(error => {
        console.log("Error getting API Dog Images: ", error)
      })
    }
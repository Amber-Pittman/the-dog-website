import { useState, useEffect } from "react";
import axios from "axios";

export function useDogImages(breed, count) {
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get(`https://dog.ceo/api/breed/${breed}/images/random/${count}`)
            .then(result => {
                console.log(result.data.message)
                setImages(result.data.message)
            })
            .catch(error => {
                console.log("Error getting API Dog Images: ", error)
            })
    }, [breed, count])

    return [images, setImages]
}
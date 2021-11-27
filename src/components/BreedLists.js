import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./BreedLists.css";

function BreedLists() {
  const [breedList, setBreedList] = useState([]);
  const [src, setSrc] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getBreeds = async () => {
    setIsLoading(true);
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();

    setBreedList(data.message);
    setIsLoading(false);
    console.log(setBreedList(data.message));
  };

  const breedListArr = Object.keys(breedList);

  useEffect(() => {
    getBreeds();
  }, []);

  const imgSrc = async (breed) => {
    const response = await fetch(
      `https://dog.ceo/api/breed/${breed}/images/random`
    );
    const data = await response.json();
    setSrc(data.message);
  };

  return (
    <div style={{ display: "flex" }}>
      {isLoading ? (
        <div className="loader" ></div>
      ) : (
        <ul>
          {breedListArr.map((breed) => {
            const breedColor = {
              color: breedList[breed].length && "red",
            };
            return (
              <li
                key={uuidv4()}
                onClick={() => imgSrc(breed)}
                style={{
                  cursor: "pointer",
                  margin: 10,
                  ...breedColor,
                }}
              >
                {breed}
              </li>
            );
          })}
        </ul>
      )}

      {src === "" ? null : (
        <img
          src={src}
          alt="pic"
          style={{ maxWidth: "100%", width: 300, height: 200 }}
        />
      )}
    </div>
  );
}

export default BreedLists;

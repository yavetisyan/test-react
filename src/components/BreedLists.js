import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Collapse } from "@mui/material";


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
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <CircularProgress size="100" />
        </Box>
      ) : (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="ul"
        >
          {breedListArr.map((breed) => {
            const breedColor = {
              color: breedList[breed].length && "red",
            };
            return (
              <li className='asd'>
                <ListItemButton
                  key={breed}
                  onClick={() => imgSrc(breed)}
                  style={{
                    cursor: "pointer",
                    margin: 10,
                    ...breedColor,
                  }}
                >
                  <ListItemText primary={breed} />
                </ListItemButton>
                <Collapse in timeout="auto" unmountOnExit>
                  <List component="li" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
      
                      <ListItemText primary="Starred" />
                    </ListItemButton>
                  </List>
                </Collapse>
              </li>
            );
          })}
        </List>
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

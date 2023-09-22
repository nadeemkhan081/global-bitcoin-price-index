import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
} from "@material-ui/core";

const BitcoinPrice = () => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://bitcoinaverage-global-bitcoin-index-v1.p.rapidapi.com/indices/global/ticker/BTCUSD",
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key":
                "6427150cd5msh7be628fb28a312fp14871bjsnbea82aff78f8",
              "X-RapidAPI-Host":
                "bitcoinaverage-global-bitcoin-index-v1.p.rapidapi.com",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const bitcoinPrice = data.last;
        setPrice(bitcoinPrice);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Timer to fetch the price at regular intervals
    const intervalId = setInterval(fetchData, 60000); // Fetch every 60 seconds

    // function to clear the interval if the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container>
      <Grid container style={{ marginTop: "80px" }}>
        <Grid item>
          {price !== null ? (
            <Typography variant="h6">Bitcoin Price: ${price}</Typography>
          ) : (
            <Typography variant="h6">Loading...</Typography>
          )}
        </Grid>
        <Grid item></Grid>
      </Grid>
    </Container>
  );
};

export default BitcoinPrice;

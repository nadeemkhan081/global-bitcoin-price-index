import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';

const BitcoinPriceChart = () => {
  const [priceData, setPriceData] = useState({ labels: [], datasets: [] });
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://bitcoinaverage-global-bitcoin-index-v1.p.rapidapi.com/indices/global/ticker/BTCUSD',
          {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': '6427150cd5msh7be628fb28a312fp14871bjsnbea82aff78f8',
              'X-RapidAPI-Host': 'bitcoinaverage-global-bitcoin-index-v1.p.rapidapi.com',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const bitcoinPrice = data.last;

        // Get the current time
        const currentTime = new Date().toLocaleTimeString();

        // Update the price data with the new price and timestamp
        setPriceData((prevData) => ({
          labels: [...prevData.labels, currentTime],
          datasets: [
            {
              label: 'Bitcoin Price',
              data: [...prevData.datasets[0]?.data ?? [], bitcoinPrice],
              fill: true,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch data initially and set up a timer to fetch data at regular intervals
    fetchData();

    const intervalId = setInterval(fetchData, 60000); // Fetch every 60 seconds

    // Cleanup function to clear the interval if the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Render the chart only when data is available
  const chart = priceData.datasets[0]?.data.length > 0 && (
    <div>
      <Line ref={chartRef} data={priceData} />
    </div>
  );

  return chart;
};

export default BitcoinPriceChart;

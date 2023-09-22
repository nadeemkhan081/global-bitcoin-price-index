import { Container, Grid } from "@material-ui/core";
import BitcoinPriceChart from "./BitcoinPriceChart";
import BitcoinPrice from "./BitcoinPrice";
import Appbar from "./Appbar";

function App() {
  return (
    <Container maxWidth="md">
      <Appbar />
      <Grid container spacing={4} style={{ marginTop: "120px" }}>
        <Grid item xs={6}>
          <BitcoinPrice />
        </Grid>
        <Grid item xs={8} style={{height: '200px'}}>
          <BitcoinPriceChart />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;

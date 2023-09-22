import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";

const Appbar = () => {
  return (
    <div>
        <AppBar position="absolute" color="#d7cdcd">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <CurrencyBitcoinIcon fontSize="large" />
          </IconButton>
          <Typography variant="h4">Bitcoin Price Index</Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Appbar
import './styles/normalize.css';
import './styles/fonts.css';
import './styles/utils.css';
import './styles/app.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { Provider } from 'react-redux';
import { store } from './redux/store';

import ThemeProvider from "@material-ui/styles/ThemeProvider";

import MuiTheme from "./components/theme"
import MartPage from "./pages/Frontend/MartPage";

import { ToastContainer } from 'react-toastify';

const App = () => {

  return (
    <Provider store={store}>
      <ThemeProvider theme={MuiTheme}>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<MartPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}
export default App;

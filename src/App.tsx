import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header/Header";
import { AppRoutes } from "./AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;

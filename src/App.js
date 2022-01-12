import { Routes, Route} from "react-router-dom";
import Home from "./Home"
import Admin from "./Admin"
import User from "./User"
function App() {

  return (
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path=":id" element={<User />} />
      </Routes>
  );
}

export default App;

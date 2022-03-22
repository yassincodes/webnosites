// the real decentralazation
// while we see everyone talking about how web3 will give power to the ppl for the ppl and all this stuff.
// I think that what will really do that is a concept I like to call webnosites!!
// they say they web3 will took the power from large companies and that will give it to ppl.
// but we are seeing something very different.
// what solves our problems right now is social media (marketing) and web2
// webnosite is the concept of a website that have no site 
// in other words it is the nocode for the influencers 
// when I started as a builder, I put it to my self like that 
// either I'll be an influecer or I'll build stuff for influencers!
// that is in my opinion where the decentralizedization is going to be.
// it is giving more power to the influencers.
// give them a way to create make small links that contains their usernames!
// and then they can create their own links 
// links that represent their own shop and places to sell things
// or simply their museum (where they put their NFTs)
// as I read in that book.
// first states, then companies and finally influencers!

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

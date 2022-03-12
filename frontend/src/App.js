import { motion } from "framer-motion"
import React from "react";
import Home from "./Pages/Home";
import WrittenDetails from "./Pages/WrittenDetails";
import About from "./Pages/About";
import NF404 from "./Pages/NF404";
import Nav from "./Component/Nav";
import Footer from "./Component/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <motion.div className="duration-500 h-screen bg-gray-50 dark:bg-neutral-900">
      <Nav />
      <Router>
        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/writtenFeelings/:feelings_id" component={WrittenDetails} />
          <Route exact path="/" component={Home} />
          <Route path="*" component={NF404} /> {/* Not Found */}
        </Switch>
      </Router>
      <Footer />
    </motion.div>
  );
}

export default App;

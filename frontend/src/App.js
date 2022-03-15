import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Container from "./Pages/Container"
import Nav from "./Component/Nav";
import Footer from "./Component/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <motion.div className="relative">
      <Nav />
      <Router>
        <Switch>
          <AnimatePresence>
            <Route path="/" component={Container} />
          </AnimatePresence>
        </Switch>
      </Router>
      <Footer />
    </motion.div>
  );
}

export default App;

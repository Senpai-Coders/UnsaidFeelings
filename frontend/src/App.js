import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Container from "./Pages/Container"
import Footer from "./Component/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <motion.div className="relative">
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

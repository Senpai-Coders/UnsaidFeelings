import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Container from "./Pages/Container"
import Nav from "./Component/Nav";
import Footer from "./Component/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <motion.div className="relative duration-500 min-h-screen bg-gray-50 dark:bg-neutral-900 scrollbar-thumb scrollbar-thumb-rounded scrollbar-w-2 scrollbar-track">
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

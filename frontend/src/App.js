import { motion } from "framer-motion"
import React from "react";
import Home from "./Pages/Home";
import Nav from "./Component/Nav"

function App() {
  return (
    <motion.div className="h-screen bg-gray-50 dark:bg-gray-800">
      <Nav />
      <Home />
    </motion.div>
  );
}

export default App;

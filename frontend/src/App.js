import { motion } from "framer-motion"
import React from "react";
import Home from "./Pages/Home";
import Nav from "./Component/Nav"

function App() {
  return (
    <motion.div className="duration-500 h-screen bg-gray-50 dark:bg-neutral-900">
      <Nav />
      <Home />
    </motion.div>
  );
}

export default App;

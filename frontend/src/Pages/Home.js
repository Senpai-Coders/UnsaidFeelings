import React from "react";
import HeroTitle from "../Component/HeroTitle";

const Home = () => {
  return (
    <div>
      <section className="flex items-center h-screen">
        <HeroTitle title={"Unsaid Feelings"} styleclass={"font-BadScript"} mode={1} duration={{ start : 2, end : 5}} />
      </section>
    </div>
  );
};

export default Home;

import React from "react";
import HeroTitle from "../Component/HeroTitle";

const Home = () => {
  return (
    <>
      <section className="flex items-center h-1/2 ">
        <HeroTitle title={"Unsaid Feelings"} styleclass={"font-MajorMonoDisplay text-7xl text-gray-800 dark:text-gray-400"} mode={0} duration={{ start : 3, end : 8}} />
      </section>
    </>
  );
};

export default Home;

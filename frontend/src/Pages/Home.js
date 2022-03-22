import React, { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { BsFolderX, BsVectorPen } from "react-icons/bs";
import { CgOptions } from "react-icons/cg";

import { api, nShorter } from "../Utils";

import HeroTitle from "../Component/HeroTitle";
import Feelings from "../Component/Feelings";
import Loading from "../Component/Loading";
import { Link, withRouter } from "react-router-dom";

const Home = (props) => {
  const [filterValue, setFilterValue] = useState("to");
  const [toggleFilter, setToggleFilter] = useState(false);
  const [toFind, setToFind] = useState("");

  const [data, setData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(true);

  const [appState, setAppState] = useState()

  const init = async () => {
      try{
        const appStates = await api.post("/getAppSettings", {
            criteria: { key: "AppState" },
          });

        setAppState(appStates.data.appOption)
      }catch(e){
          console.log(e)
      }
  }

  const search = async () => {
    try {
      setLoading(true);
      let currentIds = data.map((obj, idx) => obj._id);
      // maxReturn from server 45 records

      // what ? to : string | from : string | letter

      let what = { mode: filterValue, search: toFind };

      const response = await api.post("/search", {
        currentIds,
        limit: 45,
        what,
      });

      setData(response.data.result);
      setLoading(false);
      setHasSearched(true);
    } catch (e) {
      console.log(e);
    }
  };

  const untogleFilter = () => {
    setToggleFilter(false);
  };

  const getAppOption = (name, key) => {
      if(!appState) return { value : ''}

      for(var x = 0; x < appState.length; x++){
          const foc = appState[x] 
          if(foc.name === name && foc.key === key)
            return foc
      }
      
      return { value : ''}
  }

  useEffect(()=>{
      search()
      init()
  },[])

  return (
    <>
      <div onClick={() => setToggleFilter(false)} className="mt-12">
        <div
          className={`duration-500 ${data.length === 0 ? "h-screen" : "h-96"}`}
        >
          <section className={`flex items-center h-2/6 md:h-1/4`}>
            <HeroTitle
              title={"Unsaid Feelings"}
              styleclass={
                "font-MajorMonoDisplay text-xl sm:text-2xl md:text-4xl text-gray-800 dark:text-gray-200"
              }
              mode={0}
              duration={{ start: 1, end: 3 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
            />
          </section>
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 4 }}
            className="relative flex flex-col justify-center items-center my-4"
          >
            <Link
              to="/write"
              className="px-5 py-1 my-4 flex font-Yomogi duration-300 text-gray-700 ring-1 hover:ring-1 ring-neutral-200 dark:ring-neutral-700 hover:ring-neutral-800 dark:hover:ring-neutral-400 rounded-md hover:text-gray-900 dark:text-gray-400 items-center space-x-4"
            >
              <BsVectorPen className="h-5 w-5" /> <p>Write Yours</p>
            </Link>

            <div className="flex items-center  w-4/6 md:w-1/3 relative">
              <input
                type="text"
                placeholder={filterValue}
                value={toFind}
                onChange={(e) => {
                  setToFind(e.target.value);
                }}
                onClick={(e) => {
                  untogleFilter();
                }}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  setData([]);
                  search();
                  untogleFilter();
                }}
                className="mr-2 py-2 px-1 w-full tracking-widest outline-none text-gray-800 dark:text-gray-300 font-TheGirlNextDoor text-lg bg-transparent border-b-2 border-gray-600 dark:border-gray-400"
              ></input>
              <div className="relative ">
                <button
                  onClick={(e) => {
                    setToggleFilter(!toggleFilter);
                    e.stopPropagation();
                  }}
                  className="p-4 duration-500 bg-gray-50 hover:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 rounded-md"
                >
                  <CgOptions className=" h-4 w-4 dark:text-gray-300" />
                </button>
                <AnimatePresence>
                  {toggleFilter && (
                    <motion.div
                      drag
                      dragConstraints={{
                        top: -50,
                        left: 0,
                        right: 50,
                        bottom: 0,
                      }}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute z-10 md:w-44 text-base border filter backdrop-blur-lg border-gray-100 dark:border-neutral-700 rounded divide-y divide-gray-100 "
                    >
                      <ul
                        className="py-1 font-Yomogi"
                        aria-labelledby="dropdownButton"
                      >
                        {["to", "from", "written"].map((fltr, idx) => (
                          <li key={idx}>
                            <p
                              onClick={(e) => {
                                setFilterValue(fltr);
                                e.stopPropagation();
                              }}
                              className={`cursor-pointer block py-2 px-4 text-sm text-gray-700 hover:font-semibold dark:text-gray-200 dark:hover:text-white ${
                                fltr === filterValue &&
                                "font-semibold font-SpecialElite"
                              }`}
                            >
                              {fltr}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <p className="text-sm absolute -bottom-8 text-center text-gray-800 dark:text-gray-300 font-Yomogi">
                Maybe someone wrote for you
              </p>
            </div>
            {loading && (
              <div className="absolute -bottom-16">
                <Loading />
              </div>
            )}
            {hasSearched && !loading && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`absolute -bottom-36 text-center text-gray-700 my-9 dark:text-gray-400 ${data.length === 0? 'font-TheGirlNextDoor' : 'font-Yomogi'}`}
              >
                {data.length === 0 ? "Sorry, We Found Nothing" : `${nShorter(getAppOption('TotalSubmissions', 'AppState').value,2)} Total Submissions`}
              </motion.p>
            )}
          </motion.section>
        </div>

        {hasSearched && !loading && data.length !== 0 && (
          <section
            className={`min-h-screen md:w-11/12 w-full mx-auto max-w-screen-xl my-16 ${
              data.length === 0 && "h-24"
            }`}
          >
            <div className="w-full py-8 grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-4 md:gap-x-8 gap-y-2">
              <AnimatePresence>
                {data.map((feelings, idx) => (
                  <div
                    key={idx}
                    className="cursor-pointer"
                    onClick={() => {
                      props.history.push(`/writtenFeelings?id=${feelings._id}`);
                    }}
                  >
                    <Feelings data={feelings} />
                  </div>
                ))}
              </AnimatePresence>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default withRouter(Home);

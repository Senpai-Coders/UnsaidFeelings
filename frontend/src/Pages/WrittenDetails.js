import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../Utils";

import { FaRegEye  } from "react-icons/fa"
import { IoCalendar } from "react-icons/io5"

import Loading from "../Component/Loading";
import Feelings from "../Component/Feelings";

import { nShorter, parseDate } from "../Utils"

const WrittenDetails = () => {
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(true);

  const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  };

  let query = useQuery();

  const init = async () => {
    try {
      const id = query.get("id");
      const response = await api.get(`/feelings_details/${id}`);
      console.log(response.data.details.views);
      setDetails(response.data.details);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className=" w-full font-Inter text-neutral-600 my-4 dark:text-neutral-100">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={`${
          query.get("state") !== "new" && "hidden"
        } text-center my-8 text-2xl font-Yomogi `}
      >
        Saved Successfully
      </motion.p>
      <div className={`mx-auto ${!loading && "hidden"}`}>
        <Loading />
      </div>
      {!loading && !details && <p className="text-center my-8 text-2xl font-Yomogi ">{!query.get('state')? "Sorry but this written feeling doesn't exist anymore" : "Sorry, but we can't save right now"}</p>}
      {!loading && details && (
        <div className="w-3/12 mx-auto">
          <div className="">
            <Feelings data={details} />
          </div>
          <div className="space-y-3 mb-6">
            <div className="flex items-center">
                <p className="font-semibold">To : </p>
                <p className="ml-2">{details.to}</p>
            </div>
            <div className="flex items-center">
                <p className="font-semibold">From : </p>
                <p className="ml-2">{details.from}</p>
            </div>
            <div className="flex items-center">
                < IoCalendar />
                <p className="ml-2">{parseDate(details.cat)}</p>
            </div>
            <div className="flex items-center">
                <FaRegEye />
                <p className="ml-2">{nShorter(details.views,2)} View{details.views > 1 && 's'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WrittenDetails;

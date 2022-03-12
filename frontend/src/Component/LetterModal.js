import React, { useState } from "react";
import axios from "axios";

const LetterModal = () => {

  const [to, setTo] = useState();
  const [from, setFrom] = useState();
  const [message, setMessage] = useState();

  const [data, setData ] = useState()

  // http://localhost:3001/api/create_message

  // arrow function
  const saveMessage = async () => {
    try{
        const response = await axios.post("http://localhost:3001/api/create_message", {
            to, message
        } )

        setData(response.data.content)

    }catch(e){
        console.log(e)
    }
  }

  return (
    <div className="h-screen flex justify-evenly items-center">
      <input
        value={to}
        onChange={(e) => {
          setTo(e.target.value);
        }}
        className="rounded-lg p-4 bg-white shadow-lg"
        type="text"
        placeholder="to"
      />
      <input
        value={from}
        onChange={(e) => {
          setFrom(e.target.value);
        }}
        className="rounded-lg p-4 bg-white shadow-lg"
        type="text"
        placeholder="from"
      />
      <input
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        className="rounded-lg p-4 bg-white shadow-lg"
        type="text"
        placeholder="letter"
      />
      <button onClick={ () => saveMessage() } className="bg-blue-400 p-5 rounded-lg text-white">
        Submit Letter
      </button>

      <p>{data && data._id}</p>
    </div>
  );
};

export default LetterModal;

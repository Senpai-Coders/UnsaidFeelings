import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const randomTime = (start, end) => {
  return Math.floor(Math.random() * (end - start + 1) + start);
};

export const nShorter = (num, digits) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
};

export const parseDate = (date) => {
  let thisDate = new Date(date);

  let wordDate = `${thisDate.toLocaleString("en-us", {
    month: "short",
  })} ${thisDate.getDate()}, ${thisDate.getFullYear()} at ${thisDate.toLocaleString('en-US', { hour: 'numeric', minute : 'numeric' , hour12: true })}`;

  return wordDate;
};

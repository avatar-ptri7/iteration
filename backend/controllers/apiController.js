const axios = require("axios");
const API_KEY = process.env.API_KEY;

const apiController = {};

apiController.getJobs = async (req, res, next) => {
  const options = {
    method: "GET",
    url: "https://google-jobs-search.p.rapidapi.com/search",
    params: { query: "NodeJS developer in New York" },
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": "google-jobs-search.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      res.locals.jobResults = response.data.data;

      return next();
    })
    .catch(function (error) {
      console.error(error);
      return next(error);
    });
};

module.exports = apiController;

import apiConstants from "@config";

const endpoints = {
  OMDBAPI: `${apiConstants.OMDBAPI}?apikey=${apiConstants.OMDBAPI_API_KEY}`,
};

export default endpoints;

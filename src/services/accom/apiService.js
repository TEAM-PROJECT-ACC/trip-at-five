import axios from "axios";

export const showAccomodationList = async () => {
  const response = await axios.get("/accomodations");
  return response.data;
};

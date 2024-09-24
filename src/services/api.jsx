import axios from "axios";

export const fetchImagesWithValue = async (query) => {
  const { data } = await axios.get("https://api.unsplash.com/search/photos", {
    params: {
      client_id: `1dGbpqqj5OroUypzuMCYUoNYgL40QLGn97yi6KIZf1w`,
      query: `${query}`,
      per_page: 7,
    },
  });
  //   console.dir(data);
  return data;
};

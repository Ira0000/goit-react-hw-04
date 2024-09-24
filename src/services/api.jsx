import axios from "axios";

export const fetchImagesWithValue = async (page, query) => {
  const { data } = await axios.get("https://api.unsplash.com/search/photos", {
    params: {
      client_id: `1dGbpqqj5OroUypzuMCYUoNYgL40QLGn97yi6KIZf1w`,
      query: `${query}`,
      page: page,
      per_page: 7,
    },
  });
  console.dir(data);
  return data;
};

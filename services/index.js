import axios from "axios";

async function getpost(page = 1) {
  const res = await axios.get(`https://notigram.com/wp-json/wp/v2/posts?per_page=5&status=publish&page=${page}&_embed`);
  return res.data;
}
export default getpost;
// import { useState, useEffect } from "react";
// import { api } from "../utilis/axios";

// export default function useFetchTags() {
//   const [tags, setTags] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchTags = async () => {
//     try {
//       const res = await api.get(`/tags`); 
//       setTags(res.data);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTags();
//   }, []);

//   return [tags, loading];
// }

import { useState, useEffect } from "react";
import { api } from "../utilis/axios";

export default function useFetchTags() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTags = async () => {
    try {
      const res = await api.get("/tags"); 
      const lowercaseTags = res.data.map(tag => ({
        ...tag,
        name: tag.name.toLowerCase()
      }));
      setTags(lowercaseTags); 
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return [tags, loading];
}

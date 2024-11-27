// import { useState, useEffect } from "react";
// import { api } from "../utilis/axios";

// export default function useFetch(params = "", query = "", sort = "", tag="") {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchData = async () => {
//     try {
//       const res = await api.get(`${params}`, {
//         params: {
//           q: query,
//           sort: sort,
//           tag:tag,
//         },
//       });
//       if (res.data.hasOwnProperty("posts")) {
//         setData(res.data.posts);
//       } else {
//         setData(res.data);
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [query, sort, tag]);

//   return [data, loading];
// }


// import { useState, useEffect } from "react";
// import { api } from "../utilis/axios";

// export default function useFetch(params = "", query = "", sort = "", tag = "", page = 1, limit = 10) {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchData = async () => {
//     try {
//       const res = await api.get(`${params}`, {
//         params: {
//           q: query,
//           sort: sort,
//           tag: tag.toLowerCase(),
//           limit: limit,
//           skip: (page - 1) * limit, // Skip the appropriate number of posts
//         },
//       });
//       if (res.data.hasOwnProperty("posts")) {
//         setData(res.data.posts);
//       } else {
//         setData(res.data);
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [query, sort, tag, page]); // Add `page` as a dependency

//   return [data, loading];
// }

// import { useState, useEffect } from "react";
// import { api } from "../utilis/axios";

// export default function useFetch(params = "", query = "", sort = "", tag = "", postNumber = 9, pageskip = 0) {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchData = async () => {
//     try {
//       const res = await api.get(`${params}`, {
//         params: {
//           q: query,
//           sort: sort,
//           tag: tag.toLowerCase(), // Convert tag to lowercase
//           limit: postNumber,
//           skip: pageskip,
//         },
//       });
//       setData(res.data.posts || res.data);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [query, sort, tag, postNumber, pageskip]); // Include dependencies

//   return [data, loading];
// }

import { useState, useEffect } from "react";
import { api } from "../utilis/axios";

export default function useFetch(params = "", query = "", sort = "", tag = "", limit = 10, skip = 0) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0); // State to hold total posts

  const fetchData = async () => {
    try {
      const res = await api.get(`${params}`, {
        params: {
          q: query,
          sort: sort,
          tag: tag,
          limit: limit,
          skip: skip, 
        },
      });

      if (res.data.hasOwnProperty("posts")) {
        setData(res.data.posts);
        setTotal(res.data.total); // Set the total number of posts
      } else {
        setData(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query, sort, tag, limit, skip]);

  return [data, loading, total]; // Return total posts 
}


import React from "react";
import { client } from "../sanity";
export const useSanityQuery = (query, params = null) => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const parameters = params === null ? {} : params;
    try {
      client.fetch(query, parameters).then((fetchedData) => {
        setData(fetchedData);
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  }, []);
  return [data, loading, error];
};

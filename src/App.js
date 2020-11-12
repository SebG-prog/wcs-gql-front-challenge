import React from "react";
import "./App.css";
import { useQuery, gql } from "@apollo/client";

const GET_LAUNCHES = gql`
  query {
    launches(limit: 5) {
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
      }
      details
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(GET_LAUNCHES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="App">
      {data.launches.map(
        ({ launch_date_utc, launch_success, rocket, links, details }, i) => (
          <div key={i}>
            <h2>{rocket.rocket_name}</h2>
            <p>Launch date: {launch_date_utc} </p>
            <p>Succes: {launch_success ? "yes" : "no"}.</p>
            <p>
              Video: <a href={links.video_link}>here</a>
            </p>
            <p>More details : </p>
            <p>{details}</p>
          </div>
        )
      )}
    </div>
  );
};

export default App;

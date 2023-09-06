"use client";

import { gql, useQuery } from "@apollo/client";
import Image from "next/image";

import { GET_LOCATIONS } from "@/apollo-gql/get-location";

export default function Apollographql() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error : {error.message}</p>;

  return data.locations.map(({ id, name, description, photo }: any) => (
    <div key={id}>
      <h3>{name}</h3>
      <Image width="400" height="250" alt="location-reference" src={`${photo}`}/>
      <br/>
      <b>About this location:</b>
      <p>{description}</p>
      <br/>
    </div>
  ));
}


// const test = () => {
//   useEffect(() => {
//     client.query({
//       query: gql`
//       query GetLocations {
//         locations {
//           id
//           name
//           description
//           photo
//         }
//       }
//     `
//     }).then((result) => {
//       console.log(result);
//     });
//   });
//
//   return (
//     <div>dsdsd</div>
//   );
// }

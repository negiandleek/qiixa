import React, { useState } from "react";
import { useUserQuery } from "./query.generated";

const Styled = () => (
  <style jsx>{`
    .profileImage {
      width: 120px;
      height: 120px;
    }
  `}</style>
);

export const Home = () => {
  const [user, setUser] = useState("");
  const { data } = useUserQuery();
  return (
    <main className="w-full my-8">
      <Styled />
      <div className="w-4/5 m-auto">
        <h1>Qiixa</h1>
        <div className="flex">
          <input
            className="w-full"
            type="text"
            placeholder="youya66"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <button className="ml-auto">search</button>
        </div>
      </div>
      {/* user info */}
      <div className="w-4/5 mx-auto my-8">
        {/* done fetch and exists user */}
        {data && data.user && (
          <div>
            <figure className="flex items-center">
              <img
                className="profileImage rounded-full mr-auto"
                src={data.user.profileImage}
                alt="profile user"
              />
              <figcaption className="w-full ml-8">
                <h2>{data.user.name ?? data.user.id}</h2>
                {data.user.description && <p>{data.user.description}</p>}
              </figcaption>
            </figure>
          </div>
        )}
      </div>
    </main>
  );
};

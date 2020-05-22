import React, { useState } from "react";
import { useUserQuery } from "./query.generated";

const Styled = () => (
  <style>{`
    .profileImage {
      width: 120px;
      height: 120px;
    }
    .article-list{
      background-color: var(--background);
    }
  `}</style>
);

export const Home = () => {
  const [user, setUser] = useState("");
  const { data, refetch } = useUserQuery();

  const onClick = () => {
    refetch({ id: user });
  };
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
          <button className="ml-auto" onClick={onClick}>
            search
          </button>
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
      <div className="w-4/5 mx-auto my-8">
        <ul>
          {data &&
            data.user?.articles &&
            data.user.articles.edges.map((article) => (
              <li className="article-list flex p-4 mb-4" key={article?.node.id}>
                <p className="truncate w-4/5 m-0">
                  <a target="blank" href={article?.node.url}>
                    {article?.node.title}
                  </a>
                </p>
                <span className="ml-auto truncate">stock: 10 </span>
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
};

import React, { useState } from "react";
import { useUserQuery } from "./query.generated";

const Styled = () => (
  <style>{`
    .skelton-user{
      height: 180px;
      width: 100%;
      background: linear-gradient(-90deg, var(--background) 0%, var(--background-body) 50%, var(--background) 100%);
      background-size: 400% 400%;
      animation: pulse 1.2s ease-in-out infinite;
    }
    .skelton-article{
      height: 180px;
      width: 100%;
      background: linear-gradient(-90deg, var(--background) 0%, var(--background-body) 50%, var(--background) 100%);
      background-size: 400% 400%;
      animation: pulse 1.2s ease-in-out infinite;
    }
    @keyframes pulse {
      0% {
        background-position: 0% 0%;
      }
      100% {
        background-position: -135% 0%;
      }
    }
    .profileImage {
      max-width: 120px;
      max-height: 120px;
      width: auto;
      height: auto;
    }
    .article-list{
      background-color: var(--background);
    }
    .stock{
      min-width: 88px;
    }
  `}</style>
);

export const Home = () => {
  const [user, setUser] = useState("youya66");
  const [page, setPage] = useState(1);
  const { loading, data, refetch, fetchMore } = useUserQuery({
    notifyOnNetworkStatusChange: true,
  });

  const onClick = () => {
    setPage(0);
    refetch({ id: user });
  };

  const handleFetchMore = () => {
    setPage((prev) => prev + 1);
    fetchMore({
      variables: {
        after: page + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        return {
          ...prev,
          user: {
            ...prev.user,
            articles: {
              ...prev.user?.articles,
              edges: [
                ...(prev?.user?.articles.edges ?? []),
                ...(fetchMoreResult?.user?.articles.edges ?? []),
              ],
              pageInfo: fetchMoreResult?.user?.articles.pageInfo,
            },
          },
        } as any;
      },
    });
  };

  const isUserLoading = loading && data?.user?.id !== user;
  const isFetchMoreLoading = loading && data?.user?.articles.edges.length !== 0;

  return (
    <main className="w-full my-8">
      <Styled />
      <div className="w-4/5 m-auto">
        <h1>Qiixa</h1>
        <div className="flex">
          <input
            className="w-full"
            type="text"
            placeholder="userid"
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
        {isUserLoading && <div className="skelton-user"></div>}
        {!isUserLoading && data?.user && (
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
      {!isUserLoading && (
        <div className="w-4/5 mx-auto my-8">
          <ul>
            {data?.user?.articles.edges.map((article) => (
              <li className="article-list flex p-4 mb-4" key={article?.node.id}>
                <p className="truncate w-full m-0">
                  <a target="blank" href={article?.node.url}>
                    {article?.node.title}
                  </a>
                </p>
                <span className="stock ml-auto truncate flex-shrink-0 pl-4">
                  stock: {article?.node.stockCounts}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="w-4/5 mx-auto text-center">
        {!isFetchMoreLoading &&
          data?.user?.articles.pageInfo?.hasNextPage &&
          data?.user?.articles.edges.length !== 0 && (
            <button onClick={handleFetchMore}>もっと見る</button>
          )}
      </div>
      {loading && (
        <div className="w-4/5 mx-auto text-center">
          <div className="skelton-article" />
        </div>
      )}
    </main>
  );
};

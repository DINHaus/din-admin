import { DEFAULT_NETWORK_ID } from "./constants";

export function formatDate(createdAt: number) {
  const date = new Date(createdAt * 1000);
  const formattedDate = `${date.getFullYear()} ${date.toLocaleString(
    "default",
    { month: "short" }
  )} ${date.getDate()} ${date.getHours()}:${
    date.getMinutes() < 10 ? "0" : ""
  }${date.getMinutes()}`;

  return formattedDate;
}

export const getArticleUrl = (
  daoId: string,
  articleId: string,
  daoChain?: string
) => {
  return `/molochv3/${
    daoChain || DEFAULT_NETWORK_ID
  }/${daoId}/articles/${articleId}`;
};

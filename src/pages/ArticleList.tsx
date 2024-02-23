import { useDHConnect } from "@daohaus/connect";

import { ParMd, SingleColumnLayout, Tooltip } from "@daohaus/ui";

import { Link } from "react-router-dom";
import { useRecords } from "../hooks/useRecords";
import { useCurrentDao } from "@daohaus/moloch-v3-hooks";
import { AuthorAvatar } from "../components/AuthorAvatar";
import { ZERO_ADDRESS } from "@daohaus/utils";
import { ButtonRouterLink } from "../components/ButtonRouterLink";
import { CollectButton } from "../components/CollectButton";
import { ArticleCard, ArticleLinks, ButtonList, CardAvatar, CardDescription, CardTitle, CardTitleWrapper, CardWrapper, StyledLink } from "../utils/listStyles";
import { BlogPost } from "../utils/types";
import { CollectedBy } from "../components/CollectedBy";
import { Comments } from "./Comments";
import { ArticleListItem } from "./ArticleListItem";



export const ArticleList = () => {
  const { address } = useDHConnect();
  const { daoChain, daoId } = useCurrentDao();

  if (!daoId || !daoChain) {
    return null;
  }

  const { records } = useRecords({
    daoId: daoId,
    chainId: daoChain,
    recordType: "DIN",
  });

  // console.log("records >>", records);

  return (
    <SingleColumnLayout>
      <ButtonList>
      <ButtonRouterLink
          color="secondary"
          to={`/molochv3/${daoChain}/${daoId}/new`}
        >
          Top
        </ButtonRouterLink>
        <ButtonRouterLink
          color="secondary"
          to={`/molochv3/${daoChain}/${daoId}/new`}
        >
          New
        </ButtonRouterLink>
        <ButtonRouterLink
          color="secondary"
          to={`/molochv3/${daoChain}/${daoId}/new`}
        >
          Submit Article
        </ButtonRouterLink>

      </ButtonList>
      <CardWrapper>
        {records?.map((record, key) => {
          const parsedContent: BlogPost = record.parsedContent as BlogPost;
          return (
            <ArticleListItem parsedContent={parsedContent} key={key} />
          );
        })}
      </CardWrapper>
    </SingleColumnLayout>
  );
};

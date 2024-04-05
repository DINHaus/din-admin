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
import { ArticleListItem } from "../components/ArticleListItem";
import { NewDraftDialog } from "../components/NewDraftDialog";
import { useEffect, useState } from "react";



export const FeedList = () => {
  const { address } = useDHConnect();
  const { daoChain, daoId } = useCurrentDao();
  const [dinRecords, setDinRecords] = useState<BlogPost[]>([]);

  if (!daoId || !daoChain) {
    return null;
  }

  const { records: dinCuratedRecords } = useRecords({
    daoId: daoId,
    chainId: daoChain,
    recordType: "DIN",
  });

  const { records: dinCommentRecords } = useRecords({
    daoId: daoId,
    chainId: daoChain,
    recordType: "DINComment",
  });

  useEffect(() => {

    if (dinCuratedRecords && dinCommentRecords) {
      const combinedRecords = [...dinCuratedRecords, ...dinCommentRecords];
      const sortedRecords = combinedRecords.sort((a, b) => {
        return Number(b.createdAt) - Number(a.createdAt);
      });
      const combinedParsedContent: BlogPost[] = [];
      
      sortedRecords.forEach((record) => {
        combinedParsedContent.push({...(record.parsedContent as BlogPost), ...{recordId: record.id}});
      }
      );
      setDinRecords(combinedParsedContent);
    }



  }
  , [dinCuratedRecords, dinCommentRecords]);


  // console.log("dinCuratedRecords >>", dinCuratedRecords);

  return (
    <SingleColumnLayout>
      <ButtonList>
      <ButtonRouterLink
          color="secondary"
          to={``}
        >
          Top
        </ButtonRouterLink>
        <ButtonRouterLink
          color="secondary"
          to={``}
        >
          New
        </ButtonRouterLink>
        |
        <ButtonRouterLink
          color="secondary"
          to={``}
        >
          Curated
        </ButtonRouterLink>
        <ButtonRouterLink
          color="secondary"
          to={``}
        >
          Local
        </ButtonRouterLink>
        <ButtonRouterLink
          color="secondary"
          to={``}
        >
          Comments
        </ButtonRouterLink>
        |
        <NewDraftDialog />
        {/* <ButtonRouterLink
          color="secondary"
          to={`/molochv3/${daoChain}/${daoId}/new`}
        >
          Submit Article or comment
        </ButtonRouterLink> */}

      </ButtonList>
      <CardWrapper>
        {dinRecords?.map((record, key) => {
          
          return (
            <ArticleListItem parsedContent={record} key={key} />
          );
        })}
      </CardWrapper>
    </SingleColumnLayout>
  );
};

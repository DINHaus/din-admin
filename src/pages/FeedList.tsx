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
import { CuratedArticleListItem } from "../components/CuratedArticleListItem";



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
    recordType: "DUCEREF",
  });

  const { records: dinCommentRecords } = useRecords({
    daoId: daoId,
    chainId: daoChain,
    recordType: "DUCE",
  });

  useEffect(() => {

    if (dinCuratedRecords && dinCommentRecords) {
      console.log("dinCuratedRecords >>", dinCuratedRecords);
      const combinedRecords = [...dinCuratedRecords, ...dinCommentRecords];
      const sortedRecords = combinedRecords.sort((a, b) => {
        return Number(b.createdAt) - Number(a.createdAt);
      });
      const combinedParsedContent: BlogPost[] = [];

      sortedRecords.forEach((record) => {
        combinedParsedContent.push({ ...(record.parsedContent as BlogPost), ...{ recordId: record.id } });
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

        <NewDraftDialog />
        {/* <ButtonRouterLink
          color="secondary"
          to={`/molochv3/${daoChain}/${daoId}/new`}
        >
          Submit Article or comment
        </ButtonRouterLink> */}

      </ButtonList>
      <CardWrapper>
        {dinRecords.length === 0 && (
          <ArticleCard>
            <ParMd>No content yet. You can be the first. </ParMd>
            <ParMd>Start by creating a new draft then immortalize it on chain.</ParMd>
            <ParMd>Collectors can post comments on posts.</ParMd>
            <ParMd>idk maybe write about your pets</ParMd>
          </ArticleCard>
        )}
        {dinRecords?.map((record, key) => {

          console.log("record >>", record.relatedRecordId);
          if(record.relatedRecordId){
            return (
              <CuratedArticleListItem relatedRecordId={record.relatedRecordId} key={key} />
            )
          }

          return (
            <ArticleListItem parsedContent={record} key={key} />
          );
        })}
      </CardWrapper>
    </SingleColumnLayout>
  );
};

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
        {records?.map((record) => {
          const parsedContent: BlogPost = record.parsedContent as BlogPost;
          return (
            <ArticleCard key={record.id}>
              {/* <CardImg>
                <Link to={parsedContent?.id}>
                  <img
                    src={
                      parsedContent?.imageURI ||
                      "https://hackmd.io/_uploads/rkWi13-ba.png"
                    }
                  />
                </Link>
              </CardImg> */}
              <CardAvatar>


                {parsedContent?.authorAddress ? (
                  <AuthorAvatar address={parsedContent?.authorAddress} />
                ) : (
                  <AuthorAvatar address={ZERO_ADDRESS} />
                )}
              </CardAvatar>
              <CardTitleWrapper>
                <Link to={`${parsedContent?.id}/comments`}><CardTitle>{parsedContent?.title}</CardTitle></Link> 
                <Tooltip key={parsedContent?.id} content={`updoot & collect`} triggerEl={(<CollectButton hash={parsedContent?.id} link={true} />)} />
              </CardTitleWrapper>
              <CardDescription>{parsedContent?.content}</CardDescription>
              <ParMd>{parsedContent?.contentURI}</ParMd>
              <ArticleLinks>
                <StyledLink to={parsedContent?.id}> detail</StyledLink>
                <StyledLink to={`${parsedContent?.id}/comments`}> comments <Comments hash={parsedContent?.id} badge /> </StyledLink>
                <StyledLink to={``}> created at: {new Date(Number(parsedContent.createdAt) * 1000).toString()} </StyledLink>

              </ArticleLinks>


            </ArticleCard>
          );
        })}
      </CardWrapper>
    </SingleColumnLayout>
  );
};

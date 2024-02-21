import { useDHConnect } from "@daohaus/connect";

import { Button, Card, ParMd, SingleColumnLayout } from "@daohaus/ui";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { useRecords } from "../hooks/useRecords";
import { useCurrentDao } from "@daohaus/moloch-v3-hooks";
import { AuthorAvatar } from "../components/AuthorAvatar";
import { ZERO_ADDRESS } from "@daohaus/utils";
import { ButtonRouterLink } from "../components/ButtonRouterLink";

type BlogPost = {
  title: string;
  content: string;
  contentURI: string;
  imageURI: string;
  authorAddress: string;
  contentHash: string;
  parentId: string;
  id: string;
};

const CardWrapper = styled.div`
  margin: 1rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  justify-items: center;
`;

const ArticleCard = styled(Card)`
  width: 100%;
  max-width: 35rem;
  min-height: 20rem;
  padding: 1rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
`;

const CardTitle = styled(ParMd)`
  font-size: 1.5rem;
  font-weight: 700;
`;

const CardDescription = styled(ParMd)`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardAvatar = styled.div`
  margin-top: 0px;
`;

const CardImg = styled.div`
height: 20rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ButtonList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

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

  console.log("records >>", records);

  return (
    <SingleColumnLayout>
      <ButtonList>
        <ButtonRouterLink
          color="secondary"
          fullWidth
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
              <CardTitle>{parsedContent?.title}</CardTitle>
              <CardDescription>{parsedContent?.content}</CardDescription>
              <ParMd>{parsedContent?.contentURI}</ParMd>
              <Button variant="link">
                <Link to={parsedContent?.id}> More...</Link>
              </Button>
            </ArticleCard>
          );
        })}
      </CardWrapper>
      </SingleColumnLayout>
  );
};

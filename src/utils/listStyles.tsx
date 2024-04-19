import { Card, ParSm } from "@daohaus/ui";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const CardWrapper = styled.div`
  margin: 0.1rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  justify-items: center;
`;

export const ArticleCard = styled(Card)`
  width: 100%;
  min-height: 10rem;
  padding: 1rem;
  margin: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
`;

export const CardTitle = styled(ParSm)`
  font-size: 1.5rem;
  font-weight: 700;
`;
export const CardTitleWrapper = styled.div`
  margin-top: 0;
  margin-bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0;
`;

export const CardDescription = styled(ParSm)`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CardAvatar = styled.div`
  margin-top: 0px;
`;

export const CardImg = styled.div`
  height: 20rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ButtonList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const StyledLink = styled(Link)<{ isDead?: boolean }>`
  text-decoration: none;
  color: ${({ theme }) => theme.primary.step10};
  pointer-events: ${({ isDead }) => (isDead ? "none" : "auto")};
  cursor: ${({ isDead }) => (isDead ? "default" : "pointer")};
  &:hover {
    text-decoration: none;
    font-weight: bold;
  }
`;

export const ArticleLinks = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

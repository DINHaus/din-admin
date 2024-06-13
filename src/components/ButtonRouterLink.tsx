import React, { ComponentProps } from "react";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "@daohaus/ui";

type ProfileLinkProps = {
  href?: string;
  to: string;
  selected?: boolean;
  isdead?: string;
  disabled?: boolean;
  linkType?: "internal" | "external" | "no-icon-external";
  hideIcon?: boolean;
  target?: string;
  rel?: string;
} & Partial<ComponentProps<typeof Button>>;

const StyledRouterLink = styled(RouterLink)<{ isdead?: string }>`
  text-decoration: none;
  color: unset;
  pointer-events: ${({ isdead }) => (isdead == "true" ? "none" : "auto")};
  cursor: ${({ isdead }) => (isdead =="true" ? "default" : "pointer")};
  &:hover {
    text-decoration: none;
  }
`;

export const ButtonRouterLink = ({
  to,
  target,
  disabled,
  children,
  linkType,
  hideIcon,
  rel,
  isdead,
  ...buttonProps
}: ProfileLinkProps) => {
  return (
    <StyledRouterLink
      to={to}
      target={target}
      className="button-link"
      rel={rel}
      isdead={isdead?.toString()}
    >
      <Button size="sm" variant="link" disabled={disabled} {...buttonProps}>
        {children}
      </Button>
    </StyledRouterLink>
  );
};

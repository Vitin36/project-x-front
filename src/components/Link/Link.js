import { StyledLink } from "./styles/StyledLink";

const Link = ({ children, to }) => {
  return <StyledLink to={to}>{children}</StyledLink>;
};

export default Link;

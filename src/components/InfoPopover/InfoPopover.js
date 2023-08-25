import { UncontrolledPopover, PopoverBody } from "reactstrap";
import { StyledInfoButtonPopover } from "./styles/StyledInfoPopover";

const InfoPopover = ({ id, description }) => {
  return (
    <>
      <StyledInfoButtonPopover color="secondary" id={`${id}`} type="button">
        ?
      </StyledInfoButtonPopover>
      <UncontrolledPopover
        placement="top"
        target={`${id}`}
        className="popover-secondary"
      >
        <PopoverBody>{description}</PopoverBody>
      </UncontrolledPopover>
    </>
  );
};

export default InfoPopover;

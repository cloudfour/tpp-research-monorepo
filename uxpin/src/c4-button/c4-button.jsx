import React from "react";
import { C4Button as _C4Button } from "../../../react-components/dist";
import PropTypes from "prop-types";
import { sizeToUtility } from "../utilities";

function C4Button(props) {
  return (
    <_C4Button {...props} className={sizeToUtility(props.size)}>
      {props.children}
    </_C4Button>
  );
}

C4Button.propTypes = {
  children: PropTypes.string,
  disabled: PropTypes.bool,
  buttonClass: PropTypes.string,
  tag: PropTypes.string,
  type: PropTypes.string,
  href: PropTypes.string,
  size: PropTypes.number,
};

export { C4Button as default };

import React from "react";
import { C4Container as _C4Container } from "../../../../react-components/dist";
import PropTypes from "prop-types";

function C4Container(props) {
  return (
    <_C4Container {...props}>
      {props.children}
    </_C4Container>
  );
}

C4Container.propTypes = {
  children: PropTypes.node,
  isDark: PropTypes.bool,
  isProse: PropTypes.bool,
  isTall: PropTypes.bool,  
};

export { C4Container as default };

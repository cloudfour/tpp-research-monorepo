import React from "react";
import { C4StarRating as _C4StarRating } from "../../../../react-components/dist";
import PropTypes from "prop-types";
import { sizeToUtility } from "../../utilities";

function C4StarRating(props) {
  return <_C4StarRating {...props} className={sizeToUtility(props.size)} />;
}

C4StarRating.propTypes = {
  rating: PropTypes.number,
  size: PropTypes.number,
};

export { C4StarRating as default };

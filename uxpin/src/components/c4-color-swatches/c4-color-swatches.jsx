import React from "react";
import { C4ColorSwatches as _C4ColorSwatches } from "../../../../react-components/dist";
import PropTypes from "prop-types";
import { sizeToUtility } from "../../utilities";

function C4ColorSwatches(props) {
  const colorsArray = props.colors ? props.colors.split(",") : [];
  const colorsData = colorsArray.map((color) => {
    return {
      hex: color,
      name: "",
      id: "",
    };
  });

  console.log(colorsArray);

  return (
    <_C4ColorSwatches
      colorsData={colorsData}
      className={sizeToUtility(props.size)}
      radioName="colors"
    ></_C4ColorSwatches>
  );
}

C4ColorSwatches.propTypes = {
  size: PropTypes.number,
  colors: PropTypes.string,
};

export { C4ColorSwatches as default };

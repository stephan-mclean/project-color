import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { useTrail, animated } from "react-spring";
import styles from "./ColorPaletteList.module.scss";

import ColorTile from "../ColorTile/ColorTile";

const ROW_DIRECTION = "row";
const COL_DIRECTION = "col";
const ALL_DIRECTIONS = [ROW_DIRECTION, COL_DIRECTION];

/**
 * Renders a list of colors
 */
const ColorPaletteList = ({
  name,
  colors,
  direction,
  onColorClick,
  onColorDoubleClick,
  animationRef,
  getCustomTileStyle,
  renderTileBy,
  ...otherProps
}) => {
  const headingClass = cx("margin-bottom--xs", {
    "text--align-left": direction === ROW_DIRECTION,
    "text--align-center": direction === COL_DIRECTION
  });

  const containerClass = cx({
    [styles.containerCol]: direction === COL_DIRECTION,
    [styles.containerRow]: direction === ROW_DIRECTION
  });

  const tileClass = cx({
    "margin-bottom--xs": direction === COL_DIRECTION,
    "margin-right--xs": direction === ROW_DIRECTION
  });

  const trailMargin =
    direction === COL_DIRECTION ? "marginBottom" : "marginRight";
  const trails = useTrail(colors.length, {
    from: { [trailMargin]: 20, opacity: 0 },
    to: { [trailMargin]: 0, opacity: 1 },
    ref: animationRef
  });

  return (
    <div {...otherProps}>
      <h4 className={headingClass}>{name || ""}</h4>
      <div className={containerClass}>
        {trails.map((trailProps, idx) => {
          const color = colors[idx];
          const onClick = () => onColorClick(color);
          return (
            <animated.div
              key={`animated-tile-${color.name}-${idx}`}
              style={trailProps}
            >
              {renderTileBy(color, tileClass, onClick, false, false)}
            </animated.div>
          );
        })}
      </div>
    </div>
  );
};

ColorPaletteList.propTypes = {
  /**
   * Name of the list
   */
  name: PropTypes.string,
  /**
   * The list of colors to display
   */
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      name: PropTypes.string,
      isMain: PropTypes.bool
    })
  ).isRequired,
  /**
   * Determines the layout of the tiles
   */
  direction: PropTypes.oneOf(ALL_DIRECTIONS),
  /**
   * Callback for when a color in the list is clicked
   */
  onColorClick: PropTypes.func,
  /**
   * Ref used to hook into the animation
   */
  animationRef: PropTypes.object,
  /**
   * Pass custom styles for a particular color tile
   */
  getCustomTileStyle: PropTypes.func,
  /**
   * Render prop to render the color tile
   */
  renderTileBy: PropTypes.func
};

ColorPaletteList.defaultProps = {
  direction: COL_DIRECTION,
  onColorClick: () => {},
  onColorDoubleClick: () => {},
  getCustomTileStyle: () => ({}),
  renderTileBy: (color, className, onClick, hideName, hideHex) => (
    <ColorTile
      key={color.name}
      color={color.color}
      name={color.name}
      size={color.isMain ? "lg" : "md"}
      className={className}
      onClick={onClick}
      hideName={hideName}
      hideHex={hideHex}
    />
  )
};

export default ColorPaletteList;

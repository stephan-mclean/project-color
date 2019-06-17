import React, { useMemo } from "react";
import PropTypes from "prop-types";
import tinycolor from "tinycolor2";
import uuid from "uuid";

import ColorPaletteList from "../ColorPaletteList/ColorPaletteList";
import { VARIANT_TYPES } from "../../constants";

/**
 * Based on a base color, this component will generate lists of variants and display them.
 */
const VariantGenerator = ({
  color,
  interval,
  onVariantClick,
  onVariantDoubleClick,
  getCustomVariantStyles
}) => {
  const lighter = useMemo(() => {
    const result = [];
    let c = tinycolor(color);
    let cumulitiveInterval = interval;

    while (c.getBrightness() < 255) {
      c = c.lighten(interval);

      result.push({
        name: `lighten-${cumulitiveInterval}`,
        color: c.toHexString(),
        id: uuid(),
        type: VARIANT_TYPES.lighten,
        interval: cumulitiveInterval
      });

      cumulitiveInterval += interval;
    }

    return result;
  }, [color, interval]);

  const darker = useMemo(() => {
    const result = [];
    let c = tinycolor(color);
    let cumulitiveInterval = interval;

    while (c.getBrightness() > 0) {
      c = c.darken(interval);

      result.push({
        name: `darken-${cumulitiveInterval}`,
        color: c.toHexString(),
        id: uuid(),
        type: VARIANT_TYPES.darken,
        interval: cumulitiveInterval
      });

      cumulitiveInterval += interval;
    }

    return result;
  }, [color, interval]);

  const desaturate = useMemo(() => {
    const result = [];
    let c = tinycolor(color);
    let cumulitiveInterval = interval;

    while (c.toHsl().s > 0) {
      c = c.desaturate(interval);

      result.push({
        name: `desaturate-${cumulitiveInterval}`,
        color: c.toHexString(),
        id: uuid(),
        type: VARIANT_TYPES.desaturate,
        interval: cumulitiveInterval
      });

      cumulitiveInterval += interval;
    }

    return result;
  }, [color, interval]);

  const saturate = useMemo(() => {
    const result = [];
    let c = tinycolor(color);
    let cumulitiveInterval = interval;

    while (c.toHsl().s < 1) {
      c = c.saturate(interval);

      result.push({
        name: `saturate-${cumulitiveInterval}`,
        color: c.toHexString(),
        id: uuid(),
        type: VARIANT_TYPES.saturate,
        interval: cumulitiveInterval
      });

      cumulitiveInterval += interval;
    }

    return result;
  }, [color, interval]);

  return (
    <div>
      <ColorPaletteList
        name="Lighter"
        colors={lighter}
        direction="row"
        className="margin-bottom--xs"
        onColorClick={onVariantClick}
        onColorDoubleClick={onVariantDoubleClick}
        getCustomTileStyle={getCustomVariantStyles}
      />
      <ColorPaletteList
        name="Darker"
        colors={darker}
        direction="row"
        className="margin-bottom--xs"
        onColorClick={onVariantClick}
        onColorDoubleClick={onVariantDoubleClick}
        getCustomTileStyle={getCustomVariantStyles}
      />
      <ColorPaletteList
        name="Desaturated"
        colors={desaturate}
        direction="row"
        className="margin-bottom--xs"
        onColorClick={onVariantClick}
        onColorDoubleClick={onVariantDoubleClick}
        getCustomTileStyle={getCustomVariantStyles}
      />
      <ColorPaletteList
        name="Saturated"
        colors={saturate}
        direction="row"
        className="margin-bottom--xs"
        onColorClick={onVariantClick}
        onColorDoubleClick={onVariantDoubleClick}
        getCustomTileStyle={getCustomVariantStyles}
      />
    </div>
  );
};

VariantGenerator.propTypes = {
  /**
   * The color to generate variants of
   */
  color: PropTypes.string.isRequired,
  /**
   * The step between each variant generated in %
   */
  interval: PropTypes.number,
  /**
   * Callback for when a variant is clicked
   */
  onVariantClick: PropTypes.func,
  /**
   * Callback for when a variant is double clicked
   */
  onVariantDoubleClick: PropTypes.func,
  /**
   * Pass in custom styles for a variant in the list
   */
  getCustomVariantStyles: PropTypes.func
};

VariantGenerator.defaultProps = {
  interval: 5,
  onVariantClick: () => {},
  onVariantDoubleClick: () => {},
  getCustomVariantStyles: () => ({})
};

export default VariantGenerator;
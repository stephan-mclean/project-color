import React, { useContext, useState } from "react";
import cx from "classnames";

import { PaletteContext } from "../PaletteProvider/PaletteProvider";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import Button from "../Button/Button";
import { VARIANT_MODE } from "../../constants";

import styles from "./EditorPanel.module.scss";
import PaletteView from "./components/PaletteView";

const PALETTE_VIEW = "palette_view";
const PAIRS_VIEW = "pairs_view";

const EditorPanel = () => {
  const { currentMode, palette } = useContext(PaletteContext);
  const [currentView, setCurrentView] = useState(
    currentMode === VARIANT_MODE ? PALETTE_VIEW : PAIRS_VIEW
  );

  const renderViewSwitcher = () => {
    const paletteClassName = cx("btn btn--link", {
      "btn--active": currentView === PALETTE_VIEW
    });
    const pairsClassName = cx("btn btn--link", {
      "btn--active": currentView === PAIRS_VIEW
    });
    return (
      <ButtonGroup className="margin-bottom">
        <Button
          className={paletteClassName}
          onClick={() => setCurrentView(PALETTE_VIEW)}
        >
          Palette
        </Button>
        <Button
          className={pairsClassName}
          onClick={() => setCurrentView(PAIRS_VIEW)}
        >
          Pairs
        </Button>
      </ButtonGroup>
    );
  };

  const renderCurrentView = () => {
    const currentColor = palette.colors.find(
      c => c.id === palette.currentSelectedColor
    );
    return (
      <div>
        {currentView === PALETTE_VIEW && (
          <PaletteView colors={[currentColor.base, ...currentColor.variants]} />
        )}
        {currentView === PAIRS_VIEW && <div>pairs view</div>}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {renderViewSwitcher()} {renderCurrentView()}
    </div>
  );
};

export default EditorPanel;
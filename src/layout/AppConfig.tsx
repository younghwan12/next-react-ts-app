import PrimeReact from "primereact/api";
import { Button } from "primereact/button";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { Sidebar } from "primereact/sidebar";
import { classNames } from "primereact/utils";
import React, { useContext, useEffect, useState } from "react";
import { AppConfigProps, LayoutConfig, LayoutState } from "../../types/types";
import { LayoutContext } from "./context/layoutcontext";

const AppConfig = (props: AppConfigProps) => {
  const [scales] = useState([12, 13, 14, 15, 16]);
  const { layoutConfig, setLayoutConfig, layoutState, setLayoutState } =
    useContext(LayoutContext);

  const onConfigButtonClick = () => {
    setLayoutState((prevState: LayoutState) => ({
      ...prevState,
      configSidebarVisible: true,
    }));
  };

  const onConfigSidebarHide = () => {
    setLayoutState((prevState: LayoutState) => ({
      ...prevState,
      configSidebarVisible: false,
    }));
  };

  const changeTheme = (
    theme: string,
    colorScheme: string,
    darkMode: boolean
  ) => {
    PrimeReact.changeTheme?.(layoutConfig.theme, theme, "theme-css", () => {
      setLayoutConfig((prevState: LayoutConfig) => ({
        ...prevState,
        theme,
        colorScheme,
        darkMode: darkMode,
      }));
    });
  };

  const decrementScale = () => {
    setLayoutConfig((prevState: LayoutConfig) => ({
      ...prevState,
      scale: prevState.scale - 1,
    }));
  };

  const incrementScale = () => {
    setLayoutConfig((prevState: LayoutConfig) => ({
      ...prevState,
      scale: prevState.scale + 1,
    }));
  };

  const applyScale = () => {
    document.documentElement.style.fontSize = layoutConfig.scale + "px";
  };

  useEffect(() => {
    applyScale();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutConfig.scale]);

  // const changeMode = (theme: string, colorScheme: string) => {
  //   PrimeReact.changeTheme?.(layoutConfig.theme, theme, "theme-css", () => {
  //     setLayoutConfig((prevState: LayoutConfig) => ({
  //       ...prevState,
  //       theme,
  //       colorScheme,
  //     }));
  //   });
  // };

  return (
    <>
      <button
        className="layout-config-button config-link"
        type="button"
        onClick={onConfigButtonClick}
      >
        <i className="pi pi-cog"></i>
      </button>

      <Sidebar
        visible={layoutState.configSidebarVisible}
        onHide={onConfigSidebarHide}
        position="right"
        className="layout-config-sidebar w-20rem"
      >
        {!props.simple && (
          <>
            <h5>Scale</h5>
            <div className="flex align-items-center">
              <Button
                icon="pi pi-minus"
                type="button"
                onClick={decrementScale}
                rounded
                text
                className="w-2rem h-2rem mr-2"
                disabled={layoutConfig.scale === scales[0]}
              ></Button>
              <div className="flex gap-2 align-items-center">
                {scales.map((item) => {
                  return (
                    <i
                      className={classNames("pi pi-circle-fill", {
                        "text-primary-500": item === layoutConfig.scale,
                        "text-300": item !== layoutConfig.scale,
                      })}
                      key={item}
                    ></i>
                  );
                })}
              </div>
              <Button
                icon="pi pi-plus"
                type="button"
                onClick={incrementScale}
                rounded
                text
                className="w-2rem h-2rem ml-2"
                disabled={layoutConfig.scale === scales[scales.length - 1]}
              ></Button>
            </div>

            <h5>Dark Mode</h5>
            <InputSwitch
              checked={layoutConfig.darkMode}
              onChange={(e) => {
                const newDarkModeValue = e.value as boolean;
                let newColorScheme = "light";
                let newTheme = "light-blue";

                if (newDarkModeValue) {
                  newColorScheme = "dark";
                  newTheme = "dark-blue";
                }

                changeTheme(newTheme, newColorScheme, newDarkModeValue);
              }}
            ></InputSwitch>
          </>
        )}
      </Sidebar>
    </>
  );
};

export default AppConfig;

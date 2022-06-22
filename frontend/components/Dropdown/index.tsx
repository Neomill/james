import {
  Menu,
  MenuButton,
  MenuHeader,
  MenuItem,
  MenuRadioGroup,
} from "@szhsin/react-menu";
import React, { Fragment, useState } from "react";
import { IconContext } from "react-icons";
import { BsFilter } from "react-icons/bs";

type Props = {
  outline?: boolean;
  colorScheme?: "primary" | "secondary" | "warning" | "danger";
  size?: "small" | "medium" | "large";
  label: string;
  icon?: any;
  iconSize?: number;
  options: any[];
  setStateModal?: any;
  stateModal?: any;
  onClick?: (e: any) => void;
  type?: string;
};

const Dropdown = ({
  outline = false,
  size = "medium",
  iconSize = 20,
  icon = <BsFilter />,
  colorScheme = "primary",
  label,
  options = [],
  setStateModal,
  stateModal,
  type,
  onClick,
  ...props
}: Props) => {
  const mode =
    outline === false
      ? colorScheme === "primary"
        ? `bg-amber-500 text-white hover:bg-amber-600`
        : colorScheme === "secondary"
        ? `bg-gray-500 text-white hover:bg-gray-600 `
        : colorScheme === "warning"
        ? `bg-amber-500 text-black hover:bg-amber-600 `
        : colorScheme === "danger"
        ? `bg-red-500 text-white hover:bg-red-600 `
        : `bg-white text-black`
      : colorScheme === "primary"
      ? `bg-amber-50 text-amber-500 hover:bg-amber-100 hover:text-amber-600`
      : colorScheme === "secondary"
      ? `bg-gray-50 text-gray-600 hover:bg-gray-100`
      : colorScheme === "warning"
      ? `bg-amber-50 text-amber-500 hover:bg-amber-100 hover:text-amber-600`
      : colorScheme === "danger"
      ? `bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600`
      : `bg-white text-black`;

  return (
    <Menu
      arrow
      align="end"
      {...props}
      className={``}
      menuButton={
        <MenuButton
          className={`${mode}  px-6  py-2  rounded-lg ease-in transition duration-200  flex flex-row items-center gap-3 `}
        >
          <IconContext.Provider value={{ size: `${iconSize}` }}>
            {icon}
          </IconContext.Provider>
          {label}
        </MenuButton>
      }
    >
      {options.map((option) => {
        return (
          <Fragment key={option.title}>
            <MenuHeader>{option.title}</MenuHeader>
            {option.sub_options.length > 0 && (
              <>
                <MenuRadioGroup
                  value={option.selectedOption}
                  onRadioChange={(e) =>
                    onClick &&
                    onClick({ selector: option.selector, value: e.value })
                  }
                >
                  {option.sub_options.map(({ title, value, isChecked }) => {
                    return (
                      <MenuItem
                        type="radio"
                        key={title + value}
                        value={value}
                        className={``}
                        checked={isChecked}
                      >
                        {title}
                      </MenuItem>
                    );
                  })}
                </MenuRadioGroup>
              </>
            )}
          </Fragment>
        );
      })}
    </Menu>
  );
};

export default Dropdown;

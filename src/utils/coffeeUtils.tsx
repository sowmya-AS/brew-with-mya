import React from "react";
import SugarIcon from "../assets/cappuchino.svg";
import MilkIcon from "../assets/milk.svg";
import SmallIcon from "../assets/small.svg";
import MediumIcon from "../assets/medium.svg";
import LargeIcon from "../assets/large.svg";
import EspressoIcon from "../assets/espresso.svg";
import RistrettoIcon from "../assets/ristretto.svg";
import CappuccinoIcon from "../assets/cappuchino.svg";

export const getSvgIcon = (name: String) => {
  switch (name.toLowerCase()) {
    case "select the amount of sugar":
      return <SugarIcon width={32} height={32} />;
    case "select the amount of sugar":
      return <SugarIcon width={32} height={32} />;
    case "select type of milk":
      return <MilkIcon width={32} height={32} />;
    case "espresso":
      return <EspressoIcon width={32} height={32} />;
    case "cappuccino":
      return <CappuccinoIcon width={32} height={32} />;
    case "ristretto":
      return <RistrettoIcon width={32} height={32} />;
    case "tall":
      return <SmallIcon width={32} height={32} />;
    case "venti":
      return <MediumIcon width={32} height={32} />;
    case "large":
      return <LargeIcon width={32} height={32} />;
  }
};

export const getExtraDisplayName = (name: String) => {
  switch (name.toLowerCase()) {
    case "select the amount of sugar":
      return "Sugar";
    case "select type of milk":
      return "Milk";
    default:
      return name;
  }
};

export const getDisplayName = (name: string): string => {
  switch (name.toLowerCase()) {
    case "select the amount of sugar":
      return "Sugar";
    case "select type of milk":
      return "Milk";

    case "cow":
      return "Dairy";

    case "a lot":
      return "A Lot";

    default:
      return name.charAt(0).toUpperCase() + name.slice(1);
  }
};

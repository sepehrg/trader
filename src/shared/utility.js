import React from "react";
import moment from "moment-jalaali";

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const coloredPercent = (
  value,
  theme,
  parentheses = false,
  percent = false
) => {
  if (value < 0)
    return (
      <span style={{ color: theme.palette.color.red }}>
        {parentheses
          ? `(${comma(Math.abs(value))}${percent ? "%" : ""})`
          : comma(Math.abs(value))}
      </span>
    );
  else if (value > 0)
    return (
      <span style={{ color: theme.palette.color.green }}>
        {parentheses ? `(${comma(value)}${percent ? "%" : ""})` : comma(value)}
      </span>
    );
  else
    return parentheses
      ? `(${comma(value)}${percent ? "%" : ""})`
      : comma(value);
};

export const coloredPercentHtml = (
  value,
  theme,
  parentheses = false,
  percent = false
) => {
  const result = coloredPercent(value, theme, parentheses, percent);
  if (typeof result === "object")
    return `<span style="color: ${result.props?.style?.color}">
    ${result.props?.children}
    </span>`;
  else return result;
};

export const comma = (value) => {
  if (!value) return 0;
  else if (value > 999 || value < -999) return value.toLocaleString();
  else return value;
};

export const shortenNumber = (num) => {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(2) + " K";
  } else if (num > 999999 && num < 1000000000) {
    return (num / 1000000).toFixed(2) + " M";
  } else if (num > 999999999) {
    // return comma(parseInt((num / 1000000000).toFixed(2))) + " B";
    return comma(parseFloat((num / 1000000000).toFixed(2))) + " B";
  } else if (num < 1000) {
    return num;
  }
};

export const replaceItemAtIndex = (arr, index, newValue) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

export const removeItemAtIndex = (arr, index) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

export const toJalaliDateTime = (date) => {
  if (date) return moment(date).format("jYYYY/jMM/jDD HH:mm:ss");
  return "";
};

export const toJalaliDate = (date) => {
  if (date) return moment(date).format("jYYYY/jMM/jDD");
  return "";
};

export const getOptions = (model) => {
  return Object.keys(model).reduce(function (options, key) {
    options.push({
      value: model[key].value,
      text: model[key].title,
    });
    return options;
  }, []);
};

export const toJalaliDateTimeNoSecond = (date) => {
  if (date) return moment(date).format("HH:mm jYYYY/jM/jD");
  return "";
};

export const ltr = (element) => {
  return <div style={{ direction: "ltr" }}>{element}</div>;
};

export const isModalDisplayed = (modalName) => {
  return getDisplayedModals().includes(modalName);
};

export const addDisplayedModal = (modalName) => {
  return localStorage.setItem(
    "displayed",
    JSON.stringify([...getDisplayedModals(), modalName])
  );
};

const getDisplayedModals = () => {
  return JSON.parse(localStorage.getItem("displayed") || null) || [];
};

export const correctUserDataTypes = (user) => {
  if (user.UserMustChangePassword)
    user.UserMustChangePassword =
      user.UserMustChangePassword === "True" ? true : false;
  if (user.UserShouldChangePassword)
    user.UserShouldChangePassword =
      user.UserShouldChangePassword === "True" ? true : false;
  return user;
};

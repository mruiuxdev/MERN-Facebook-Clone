import React from "react";

const SelectDateBirth = ({
  bDay,
  bMonth,
  bYear,
  days,
  months,
  years,
  handleRegisterChange,
  errorDate,
  desktopView,
}) => {
  return (
    <>
      <div
        className="reg_grid"
        style={{ marginBottom: desktopView ? "" : "15px" }}
      >
        <select
          name="bDay"
          value={bDay}
          onChange={handleRegisterChange}
          className="reg_input"
        >
          {days.map((day) => (
            <option key={day} month={day}>
              {day}
            </option>
          ))}
        </select>
        <select
          name="bMonth"
          value={bMonth}
          onChange={handleRegisterChange}
          className="reg_input"
        >
          {months.map((month) => (
            <option value={month} key={month}>
              {month}
            </option>
          ))}
        </select>
        <select
          name="bYear"
          value={bYear}
          onChange={handleRegisterChange}
          className="reg_input"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {errorDate && (
        <div
          className={
            desktopView
              ? "input_error input_error_desktop input_error_desktop_right"
              : "input_error"
          }
        >
          {errorDate}
          <span
            className={
              desktopView
                ? "error_arrow_bottom error_arrow_bottom_desktop"
                : "error_arrow_bottom"
            }
          ></span>
        </div>
      )}
    </>
  );
};

export default SelectDateBirth;

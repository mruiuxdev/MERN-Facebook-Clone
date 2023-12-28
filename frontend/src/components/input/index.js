import { ErrorMessage, useField } from "formik";
import "./style.scss";
import { useMediaQuery } from "react-responsive";

const LoginInput = ({ placeholder, bottom, ...props }) => {
  const [field, meta] = useField(props);

  const desktopView = useMediaQuery({
    query: "(min-width: 990px)",
  });

  console.log(desktopView);

  return (
    <div className="input_wrap">
      {meta.touched && meta.error && !bottom && (
        <div
          className={
            desktopView ? "input_error input_error_desktop" : "input_error"
          }
        >
          <ErrorMessage name={field.name} />
          <span
            className={
              desktopView
                ? "error_arrow_top error_arrow_top_desktop"
                : "error_arrow_top"
            }
          ></span>
        </div>
      )}
      <input
        className={meta.touched && meta.error ? "input_error_border" : ""}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && bottom && (
        <div
          className={
            desktopView ? "input_error input_error_desktop" : "input_error"
          }
          style={{ marginTop: "2px" }}
        >
          <ErrorMessage name={field.name} />
          <span
            className={
              desktopView
                ? "error_arrow_bottom error_arrow_bottom_desktop"
                : "error_arrow_bottom"
            }
          ></span>
        </div>
      )}
      {meta.touched && meta.error && (
        <i
          className="error_icon"
          style={{ top: !bottom && (desktopView ? "15px" : "75px") }}
        ></i>
      )}
    </div>
  );
};

export default LoginInput;

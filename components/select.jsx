
import React from "react";

const Select = (props) => {
  const {
    option,
    register,
    label,
    check,
    errors,
    placeholder,
    onChange
  } = props;
  return (
    <>
      <div className="select_Input">
        <select
          {...(register ? register(label, check) : {})}
          onChange={onChange}


          className={`${errors && errors[label] && "selectActive"
            }`}
        >
          <option value="" disabled selected hidden>
            {placeholder}
          </option>
          {option?.map((data, i) => {
            if (data?.id) {
              return (
                <>
                  <option value={data?.id}>{data?.option}</option>
                </>
              );
            }
            return (
              <>
                <option>{data}</option>
              </>
            );
          })}
        </select >
        {errors && errors[label] && (
          <span className="inputError">{errors[label]?.message}</span>
        )}
      </div>
    </>
  );
};

export default Select;
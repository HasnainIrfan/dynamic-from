import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "./input";
import Select from "./select";

const Ragistration = ({ isRagistration ,isId}) => {
  // React Form Hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const getData = async () => {
    const response3 = await axios
      .get(
        `https://stage-api.cyfersoft.com/api/Admin/v1/ClientDashboardServices/GetCourseTrainingRegistrationLov`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
            id: isId,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response, "603");
        setIsCategories(
          response?.data.data
            .lovServicesCourseTrainingCategoryCheckListViewModels
        );
      })
      .catch((error) => {
        console.log(error, "Error on Post From");
      });
  };

  useEffect(()=>{
    getData()
  },[])

  //   useEffect(() => {
  //     if () {
  //       const fields = ["first_name", "last_name", "email", "phone_no", "status"];
  //       fields.forEach((field) => setValue(field, EmployeeById[field]));
  //       setValue("role_id", filterData?.id);
  //     }
  //   }, [EmployeeById]);

  const onSubmit = (Data) => {
    console.log(Data, "902");
  };
  return (
    <>
      <div className="ragistration_menu">
        <h1>{isRagistration?.description_EN}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {isRagistration?.lovServicesCourseTrainingCheckListViewModels.map(
            (item, i) => {
              console.log(item, "901");
              return (
                <div key={i}>
                  <span>
                    <span>*</span> {item.name_EN}
                  </span>
                  {item.options_EN.length > 1 ? (
                    <Select
                      option={item.options_EN}
                      type={`${item.fieldSubType}`}
                      label={`${item.checkListDetailId}`}
                      register={register}
                      errors={errors}
                      check={{
                        required: `${item.name_EN} is Required`,
                      }}
                    />
                  ) : (
                    <Input
                      type={`${item.fieldSubType}`}
                      label={`${item.checkListDetailId}`}
                      register={register}
                      errors={errors}
                      check={{
                        required: `${item.name_EN} is Required`,
                      }}
                    />
                  )}
                </div>
              );
            }
          )}
          <div className="from_action">
            <button type="submit">Next</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Ragistration;

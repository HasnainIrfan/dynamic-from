import Ragistration from "@/components/Ragistration";
import axios from "axios";
import React, { useEffect, useState } from "react";

const index = () => {
  const [isId, setIsId] = useState();
  const [isCategories, setIsCategories] = useState();
  const [isData, setIsData] = useState(false);
  const [isRagistration, setIsRagistration] = useState();
  const courseTrainingId = "a50895f6-65d7-44c2-ba7d-08db0d866fc1";

  const getData = async () => {
    const response = await axios
      .get(
        `https://stage-api.cyfersoft.com/api/Admin/v1/LearnerDashboardServices/DashboardGetUserProfile/`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setIsId(response?.data.data.id);
        console.log(response, "601");
      })
      .catch((error) => {
        console.log(error, "Error on Post From");
      });
    const response2 = await axios
      .get(
        `https://stage-api.cyfersoft.com/api/Admin/v1/LMSLOVServices/GetCountryLov`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response, "602");
      })
      .catch((error) => {
        console.log(error, "Error on Post From");
      });

    const response3 = await axios
      .get(
        `https://stage-api.cyfersoft.com/api/Admin/v1/ClientDashboardServices/GetCourseTrainingRegistrationLov`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
            id: courseTrainingId,
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
  useEffect(() => {
    getData();
  }, []);

  const handleClick = (item, i) => {
    if (item) {
      setIsRagistration(item);
      setIsData(true);
    }
    console.log(item, i, "901");
  };
  console.log(isId, "903");
  return (
    <>
      <div className="ragistration_step">
        <div className="ragistration_step_wrapper">
          {!isData && (
            <>
              <div className="ragistration_step_heading">
                <h1>Let’s get started with your application journey</h1>
                <p>
                  This is your application dashboard for you to track the
                  progress of your application submission
                </p>
              </div>
              <div className="ragistration_step_boxs">
                {isCategories?.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="ragistration_step_box"
                      onClick={() => handleClick(item, i)}
                    >
                      <span>{item?.name_EN}</span>
                      <div className="register_icon"></div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {isData && (
            <Ragistration isRagistration={isRagistration} isId={isId} />
          )}
        </div>
      </div>
    </>
  );
};

export default index;

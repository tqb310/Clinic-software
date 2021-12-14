import React, { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { TextField, Button } from "@mui/material";
import { RadioButtonUnchecked, CheckCircle } from "@mui/icons-material";
import { CustomPaper } from "_components/StyledComponent";
import PatientInfo from "../PatientInfo";
import ServiceInfo from "../ServiceInfo";
import ExaminingInfo from "../ExaminingInfo";
import PrescriptionForm from "./Prescription";
import "./index.scss";
// import PropTypes from 'prop-types'

function ExamineCard({ handleSubmitFinal }) {
  const [open, setOpen] = useState(false);
  // const [isValidForm, setValidForm] = useState(true);
  const [prescriptionData, setPrescriptionData] = useState([]);
  const [examiningData, setExaminingData] = useState({});
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmitPres = (data) => {
    console.log(data);
    setPrescriptionData(data);
  };
  const handleSubmitExamining = (data) => {
    //  console.log("FINAL: ", data);
     setExaminingData(data);
  };
  const handleSubmitComplete = () => {
    if (prescriptionData.length === 0) {
      alert("Bạn chưa kê toa thuốc");
      return;
    }
    if (Object.keys(examiningData).length === 0) {
      alert("Bạn chưa điền kết quả khám lâm sàng");
      return;
    }
    // console.log(examiningData);
    const result = {
      ...examiningData,
      PRESCRIPTION: prescriptionData,
    };
    handleSubmitFinal(result);
  };
  return (
    <Scrollbars style={{ width: "100%", height: "100%" }} autoHide={true}>
      <CustomPaper className="DTExamineCard">
        <div className="DTExamineCard__header">
          <p>Phiếu khám bệnh</p>
          <p>
            <span>#123456</span>
          </p>
        </div>
        <div className="DTExamineCard__cardInfo">
          <p>
            <span>Ngày lập</span>
            <TextField
              variant="filled"
              value="13/12/2021"
              size="small"
              sx={{
                "& .MuiInputBase-input": {
                  paddingTop: 0,
                },
                width: 150,
              }}
            />
          </p>
          <p>
            <span>Nhân viên tiếp nhận</span>
            <TextField
              variant="filled"
              value="Đặng Ngọc Liêm"
              size="small"
              sx={{
                "& .MuiInputBase-input": {
                  paddingTop: 0,
                },
                width: 200,
              }}
            />
          </p>
        </div>
        <div className="DTExamineCard__content">
          <div className="DTExamineCard__patientInfo">
            <PatientInfo />
          </div>
          <div className="DTExamineCard__service">
            <ServiceInfo />
          </div>
          <div className="DTExamineCard__examineInfo">
            <ExaminingInfo handleSubmit={handleSubmitExamining} />
          </div>
        </div>
        <div className="DTExamineCard__footer">
          <div>
            <Button variant="outlined" sx={{ width: 180, marginRight: 2 }}>
              Cập nhật dịch vụ
            </Button>
            <Button
              variant="outlined"
              color={prescriptionData.length > 0 ? "success" : "warning"}
              startIcon={
                prescriptionData.length > 0 ? (
                  <CheckCircle />
                ) : (
                  <RadioButtonUnchecked />
                )
              }
              sx={{ width: 110 }}
              onClick={() => setOpen(true)}
            >
              Kê toa
            </Button>
          </div>
          <div>
            <Button
              variant="outlined"
              sx={{ width: 110, marginRight: 2 }}
              // disabled={isValidForm}
              onClick={handleSubmitComplete}
            >
              Hoàn tất
            </Button>
            <Button variant="contained" color="error" sx={{ width: 110 }}>
              Hủy
            </Button>
          </div>
        </div>
        <PrescriptionForm
          open={open}
          handleClose={handleClose}
          handleSubmit={handleSubmitPres}
        />
      </CustomPaper>
    </Scrollbars>
  );
}

// ExamineCard.propTypes = {};

export default ExamineCard;

import { useEffect, useState } from "react";
import { Container } from "../../components/container/Container";
import { Box, Button, Grid, Typography } from "@mui/material";
import { getAppoinmentsPatient } from "../../services/PatientService/PatientService";
import { useLoginContext } from "../../context/login-context";
import DividerCustom from "../../components/DividerCustom/DividerCustom";
import { useHospitalContext } from "../../context/hospital-context";
import { useModalContext } from "../../context/modal-contex/modal-context";
import ModalCancel from "./ModalCancel/ModalCancel";
import ModalEditProfile from "./ModalEditProfile/ModalEditProfile";
import ModalEditPassword from "./ModalEditPassword/ModalEditPassword";
import ModalRate from "./ModalRate/ModalRate";

type TDataAppoinment = {
  appointmentId: string;
  fullName: string;
  gender: string;
  address: string;
  date: string;
  dateOfBirth: string;
  phoneNumber: string;
  reason: string;
  statusId: string;
  timeType: string;
  doctorName: string;
  doctorId: string;
  ratePoint: string;
};

export type TDataInfoRate = {
  // id:string,
  doctorNameSelected: string;
  appointmentId: string;
  userId: string;
  doctorId: string;
  // point:string,
  // rateContent:string
};

export default function ProfileUser() {
  const { dataLogin, isLogin } = useLoginContext();
  const [listAppointment, setListAppointment] = useState<TDataAppoinment[]>([]);
  const { setOpenModalInfoDoctor } = useHospitalContext();
  const [dataInfoRate, setDataInfoRate] = useState<TDataInfoRate>({
    // id:'',
    appointmentId: "",
    doctorId: "",
    doctorNameSelected: "",
    userId: "",
    // point:'',
    // rateContent:'',userId:''
  });
  const { openModal } = useModalContext();
  function handleDelete(appointmentId: string) {
    openModal(
      "Vui lòng xác nhận lại!",
      <ModalCancel
        appointmentId={appointmentId}
        getListAppointmentByUSer={getListAppointmentByUSer}
      />
    );
  }

  function handleEditProfile() {
    openModal("Thay đổi thông tin thài khoản", <ModalEditProfile />, "600px");
  }

  function handleEditPassword() {
    openModal("Thay đổi mật khẩu", <ModalEditPassword />, "400px");
  }

  async function getListAppointmentByUSer() {
    try {
      const response = await getAppoinmentsPatient(dataLogin.idUser);
      console.log(response);

      setListAppointment(
        response.data.data.map((item: any) => {
          return {
            appointmentId: item.id,
            fullName: item.fullName,
            gender: item.gender,
            address: item.address,
            date: item.date,
            dateOfBirth: item.dateOfBirth,
            phoneNumber: item.phoneNumber,
            reason: item.reason,
            statusId: item.statusId,
            timeType: item.timeType,
            doctorName:
              item.Doctor_Info.User.firstName +
              " " +
              item.Doctor_Info.User.lastName,

            doctorId: item.doctorId,
            ratePoint: item.RatePoint,
          };
        })
      );
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getListAppointmentByUSer();
  }, []);
  return (
    <>
      {isLogin ? (
        <Container sx={{ mt: 3, minHeight: "580px" }}>
          <ModalRate
            dataInfoRate={dataInfoRate}
            getListAppointmentByUSer={getListAppointmentByUSer}
          />
          <Grid container spacing={2}>
            <Grid
              item
              xs={4}
              sx={{
                justifyContent: "center",
              }}
            >
              {/* <Box
                sx={{
                  backgroundImage: `url(${dataLogin.image})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "auto",
                  // backgroundPosition: "center",
                  width: "200px",
                  height: "200px",
                  borderRadius: "12px",
                }}
              ></Box> */}
              <img
                src={dataLogin.image}
                style={{
                  borderRadius: "12px",
                  width: "200px",
                  height: "200px",
                }}
              />
            </Grid>
            <Grid item xs={8}>
              <Box>
                <Typography sx={{ fontWeight: 600, fontSize: "20px", mb: 3 }}>
                  {dataLogin.firstName} {dataLogin.lastName}
                </Typography>
                {/* <Typography sx={{ mb: 1 }}>
                  Ngày sinh: {dataLogin.address}
                </Typography> */}
                <Typography sx={{ mb: 1 }}>
                  Giới tính: {dataLogin.gender}
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  Địa chỉ: {dataLogin.address}
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  Số điện thoại: {dataLogin.phoneNumber}
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  {/* Vai trò: {dataLogin.roleId} */}
                </Typography>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  sx={{
                    // width: "120px",
                    background:
                      "linear-gradient(83.63deg,#00b5f1 33.34%,#00e0ff 113.91%)",
                    mr: 2,
                  }}
                  onClick={handleEditProfile}
                >
                  Sửa thông tin
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    // width: "120px",
                    background:
                      "linear-gradient(83.63deg,#00b5f1 33.34%,#00e0ff 113.91%)",
                  }}
                  onClick={handleEditPassword}
                >
                  Đổi mật khẩu
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Typography sx={{ fontWeight: 600, fontSize: "20px", mt: 5 }}>
            Lịch sử đặt lich khám bệnh của bệnh nhân
          </Typography>
          <Box sx={{ overflow: "auto" }}>
            <Box sx={{ mt: 2, minWidth: "1000px", mb: 3 }}>
              <Grid container>
                <Grid item xs={1}>
                  <Typography>STT</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>Họ và tên</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography>Giới tính</Typography>
                </Grid>

                <Grid item xs={2}>
                  <Typography>Địa chỉ</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>Ngày sinh</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>Bác sĩ khám</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>Hành động</Typography>
                </Grid>
              </Grid>
              <Box>
                {listAppointment.length > 0 ? (
                  <Box>
                    {listAppointment.map((item, index) => {
                      return (
                        <Box key={"history" + index}>
                          <DividerCustom />
                          <Grid container>
                            <Grid item xs={1}>
                              <Typography>{index + 1}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <Typography>{item.fullName}</Typography>
                            </Grid>
                            <Grid item xs={1}>
                              <Typography>{item.gender}</Typography>
                            </Grid>

                            <Grid item xs={2}>
                              <Typography>{item.address}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <Typography>{item.dateOfBirth}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <Typography>{item.doctorName}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <>
                                {item.statusId == "S1" ? (
                                  <Typography sx={{ color: "red" }}>
                                    Bạn chưa xác nhận
                                  </Typography>
                                ) : (
                                  <>
                                    {item.statusId == "S2" ? (
                                      // <Typography sx={{ color: "red" }}>
                                      //   Chưa khám
                                      // </Typography>
                                      <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() =>
                                          handleDelete(item.appointmentId)
                                        }
                                        sx={{ width: "120px" }}
                                      >
                                        Huỷ
                                      </Button>
                                    ) : (
                                      <>
                                        {item.ratePoint ? (
                                          <Typography sx={{ color: "green" }}>
                                            Đã đánh giá
                                          </Typography>
                                        ) : (
                                          <Button
                                            sx={{
                                              width: "120px",
                                              background:
                                                "linear-gradient(83.63deg,#00b5f1 33.34%,#00e0ff 113.91%)",
                                            }}
                                            variant="contained"
                                            onClick={() => {
                                              setOpenModalInfoDoctor(true);
                                              setDataInfoRate((prev) => {
                                                return {
                                                  ...prev,
                                                  doctorId: item.doctorId,
                                                  doctorNameSelected:
                                                    item.doctorName,
                                                  appointmentId:
                                                    item.appointmentId,
                                                  userId: dataLogin.idUser,
                                                };
                                              });
                                            }}
                                          >
                                            Đánh giá
                                          </Button>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </>
                            </Grid>
                          </Grid>
                        </Box>
                      );
                    })}
                  </Box>
                ) : (
                  <Box sx={{ mt: 3, textAlign: "center" }}>
                    <Typography sx={{ fontSize: "24px" }}>No data</Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Container>
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <Typography
            sx={{ fontWeight: 600, color: "red", fontSize: "20px", mt: 3 }}
          >
            Vui lòng đăng nhập trước!{" "}
          </Typography>
        </Box>
      )}
    </>
  );
}

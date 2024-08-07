import axios from "axios";
import { BACKEND_DOMAIN } from "../BackendDomain";
import { TInfoDoctor } from "../../views/Manage/ManageDoctors/ManageDoctors";
import { TDoctor } from "../../context/constants/typeData";

export type TAllDataDoctor = {
  price: string;
  firstName: string;
  lastName: string;
  gender: string;
  province: string;
  nameSpecialty: string;
  doctorId: string;
  image: string;
  specialtyId: string;
  hospitalId: string;
  nameHospital: string;
  addressHospital: string;
  markdownHTML: string;
  description: String;
  doctorInfoId: string;
};

export type TReturnAllDataDoctor = TAllDataDoctor[];

export const getDoctors = async (): Promise<TDoctor[]> => {
  const response = await axios.get(`${BACKEND_DOMAIN}/api/get-all-doctors`);
  console.log(response);
  return response.data.doctors.map((item: any) => {
    return {
      id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      doctorInfoId: item?.Doctor_Info?.id,
    };
  });
};

export const saveInfoDoctor = async (infoDoctor: TInfoDoctor) => {
  return await axios.post(`${BACKEND_DOMAIN}/api/save-info-doctor`, infoDoctor);
};

export const getInfoDoctor = async (
  userId: string
): Promise<TAllDataDoctor> => {
  // return await axios.get(`${BACKEND_DOMAIN}/api/get-info-doctor?id=${userId}`);
  const response = await axios.get(
    `${BACKEND_DOMAIN}/api/get-info-doctor?id=${userId}`
  );
  console.log(response);
  const data = response.data.doctorInfo.data;
  return {
    price: data.Doctor_Info.priceId,
    firstName: data.firstName,
    lastName: data.lastName,
    gender: data.gender,
    province: data.provinceId,
    doctorId: data.id,
    image: data.image,
    hospitalId: data.Doctor_Info.clinicId,
    specialtyId: data.Doctor_Info.specialtyId,
    nameHospital: response.data.doctorInfo.dataHospital.name,
    nameSpecialty: response.data.doctorInfo.dataSpecialty.name,
    addressHospital: response.data.doctorInfo.dataHospital.address,
    markdownHTML: data?.Markdown?.contentHTML,
    description: data?.Markdown?.description,
    doctorInfoId: data.Doctor_Info.id,
  };
};

export type TDataDoctorByHospital = {
  price: string;
  firstName: string;
  lastName: string;
  gender: string;
  province: string;
  nameSpecialty: string;
  doctorId: string;
  image: string;
  doctorInfoId: string;
};

export const getListDoctorByHopital = async (
  hospitalId: string,
  specialtyId: string
): Promise<TDataDoctorByHospital[]> => {
  console.log(hospitalId);
  const response = await axios.get(
    `${BACKEND_DOMAIN}/api/get-list-doctor-by-hospital?hospitalId=${hospitalId}&specialtyId=${specialtyId}`
  );
  console.log(response);
  const data = response.data.data;
  return data.map((item: any) => {
    return {
      price: item.priceId,
      nameSpecialty: item.Specialty.name,
      firstName: item.User.firstName,
      lastName: item.User.lastName,
      gender: item.User.gender,
      province: item.provinceId,
      doctorId: item.doctorId,
      image: item.User.image,
      doctorInfoId: item.id,
    };
  });
};

export const getScheduleDoctors = async (
  doctorId: string,
  date: number | string
) => {
  return await axios.get(
    `${BACKEND_DOMAIN}/api/get-schedule-doctors?doctorId=${doctorId}&date=${date}`
  );
};

export const doneAppointment = async (apppointmentId: string) => {
  return await axios.post(`${BACKEND_DOMAIN}/api/done-appointment`, {
    apppointmentId: apppointmentId,
  });
};

export const getListRatePoint = async (idDoctor: string) => {
  return await axios.get(
    `${BACKEND_DOMAIN}/api/get-list-rate-point?doctorId=${idDoctor}`
  );
};

import axios from "axios";
import { BACKEND_DOMAIN } from "../BackendDomain";
import { THospital, TTypeHospital } from "../../context/constants/typeData";

export const getHospital = async () => {
  return await axios.get(`${BACKEND_DOMAIN}/api/get-all-hospital`);
};

export const getTopHospitalHome = async () => {
  return await axios.get(`${BACKEND_DOMAIN}/api/get-top-hospital-home`);
};

export type TAllDataHospital = {
  id: string;
  address: string;
  image: string;
  name: string;
  type: TTypeHospital;
  contentHTML: string;
  contentMarkdown: string;
  description: string;
};
export type TReturnAllDataHospital = TAllDataHospital[];

export const getTopHospitalWithType = async (
  typeHospital: TTypeHospital
): Promise<TReturnAllDataHospital> => {
  const response = await axios.get(
    `${BACKEND_DOMAIN}/api/get-hospital-with-type?type=${typeHospital}`
  );
  console.log(response);
  const data = response.data.hospitalWithType;
  return data.map((item: any) => {
    return {
      id: item.id,
      address: item.address,
      image: item.image,
      name: item.name,
      type: item.type,
    };
  });
};

export const getInfoHospitalById = async (
  idHospital: string
): Promise<TAllDataHospital> => {
  const response = await axios.get(
    `${BACKEND_DOMAIN}/api/get-info-hospital-by-id?id=${idHospital}`
  );
  console.log(response);
  const data = response.data.infoHospital;
  return {
    id: data.id,
    address: data.address,
    image: data.image,
    name: data.name,
    type: data.type,
    contentHTML: data?.Markdown?.contentHTML,
    contentMarkdown: data?.Markdown?.contentMarkdown,
    description: data?.Markdown?.description,
  };
};

export const addNewHospital = async (newHospital: THospital) => {
  return await axios.post(
    `${BACKEND_DOMAIN}/api/create-new-hospital`,
    newHospital
  );
};
export const EditHospital = async (newHospital: THospital) => {
  return await axios.put(`${BACKEND_DOMAIN}/api/edit-hospital`, newHospital);
};

export const DeleteHospital = async (hospitalId: string) => {
  return await axios.delete(`${BACKEND_DOMAIN}/api/delete-hospital`, {
    data: {
      id: hospitalId,
    },
  });
};

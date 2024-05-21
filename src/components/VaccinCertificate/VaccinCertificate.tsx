import { getNamedRouteRegex } from "next/dist/shared/lib/router/utils/route-regex";
import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { Error } from "../Error/Error";

const VaccinCertificate: React.FC = () => {
  const location = useLocation();
  const formData = location.state?.formData;

  const dummyData = [
    {
      fullName: "Nguyễn Văn A",
      gender: "Nam",
      dob: "01/01/1990",
      idNumber: "000000000001",
      city: "Hồ Chí Minh",
      district: "Quận 1",
      ward: "Phường Bến Thành",
    },
    {
      fullName: "Nguyễn Thị B",
      gender: "Nữ",
      dob: "02/02/1991",
      idNumber: "000000000002",
      city: "Hà Nội",
      district: "Quận Ba Đình",
      ward: "Phường Ngọc Hà",
    },
  ];

  const matchingData = dummyData.find(
    (data) => data.idNumber === formData.idNumber
  );

  if (!matchingData || !formData) {
    return <Error />;
  }

  const finalData = {
    fullName: formData.fullName ?? matchingData.fullName,
    gender: formData.gender ?? matchingData.gender,
    dob: formData.dob ?? matchingData.dob,
    idNumber: formData.idNumber ?? matchingData.idNumber,
    city: formData.city ?? matchingData.city,
    district: formData.district ?? matchingData.district,
    ward: formData.ward ?? matchingData.ward,
  };

  return (
    <div>
      <h2>Form Data</h2>
      <p>Full Name: {finalData.fullName}</p>
      <p>Gender: {finalData.gender}</p>
      <p>Date of Birth: {finalData.dob}</p>
      <p>ID Number: {finalData.idNumber}</p>
      <p>City: {finalData.city}</p>
      <p>District: {finalData.district}</p>
      <p>Ward: {finalData.ward}</p>
    </div>
  );
};

export default VaccinCertificate;

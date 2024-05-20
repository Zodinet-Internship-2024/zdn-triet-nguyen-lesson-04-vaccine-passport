import React from "react";
import { useParams, useLocation } from "react-router-dom";


const VaccinCertificate: React.FC = () => {
const location = useLocation();
const formData = location.state?.formData;

if (!formData) {
    return <div>No data available</div>;
}

return (
    <div>
        <h2>Form Data</h2>
        <p>Full Name: {formData.fullName}</p>
        <p>Gender: {formData.gender}</p>
        <p>Date of Birth: {formData.dob}</p>
        <p>ID Number: {formData.idNumber}</p>
        <p>City: {formData.city}</p>
        <p>District: {formData.district}</p>
        <p>Ward: {formData.ward}</p>
    </div>
);
};

export default VaccinCertificate;

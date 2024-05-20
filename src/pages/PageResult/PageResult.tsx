import React, { ReactElement } from "react";
import Layout from "../../layouts/MainLayout/MainLayout";
import VaccinCertificate from "../../components/VaccinCertificate/VaccinCertificate";

const HomePage: React.FC = () => {

  return (
    <Layout>
      <VaccinCertificate />
    </Layout>
  );
};

export default HomePage;

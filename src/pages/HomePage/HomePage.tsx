import React, { ReactElement } from "react";
import Layout from "../../layouts/MainLayout/MainLayout";
import Form from "../../components/Form/Form";
import bodyImage from "../../assets/images/body-image.png";

const HomePage: React.FC = () => {

  return (
    <Layout>
      <Form />
      <img src={bodyImage} alt="Hinh lo thuoc" />
    </Layout>
  );
};

export default HomePage;

import React, { useState } from "react";
import { Grid, Card, Image } from "semantic-ui-react";
import { Form, Input, Button, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { dummyRequest, getBase64, beforeUpload, uploadDataWithImg } from "../helper/imageUpload";

const PortfolioForm = (portfolios, setPortfolios) => {
  const [loading, setLoading] = useState(false);
  const [imageRef, setImageRef] = useState(null);
  const [originFile, setOriginFile] = useState(null);

  const handleChange = (photo) => {
    if (photo.file.status === "uploading") {
      setLoading(true);
    }
    if (photo.file.status === "done") {
      // Get this url from response in real world.
      getBase64(photo.file.originFileObj, (imageUrl) => {
        setImageRef(imageUrl);
        setOriginFile(photo.file);
        setLoading(false);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const addPortfolio = (value) => {
    const newPortfolio = {
      img: imageRef,
      name: value.name,
      period: value.period,
      description: value.description,
      originFile: originFile,
    };

    const newPortfolios = [...portfolios, newPortfolio];
    setPortfolios(newPortfolios);
    setImageRef(null);
    setOriginFile(null);
  };

  return (
    <Card key={portfolios.length}>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={dummyRequest}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageRef !== null ? (
          <img src={imageRef} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
      <Form className="portfolioForm" onFinish={addPortfolio}>
        <Card.Content className="cardContent">
          <Card.Header>
            <Form.Item label="portfolio Name" name="name" className="portfolioName">
              <Input className="portfolioName" type="name" />
            </Form.Item>
          </Card.Header>
          <Card.Meta>
            <Form.Item label="portfolio Period" name="period" className="portfolioPeriod">
              <Input className="portfolioPeriod" type="period" />
            </Form.Item>
          </Card.Meta>
          <Card.Description>
            <Form.Item
              label="portfolio Description"
              name="description"
              className="portfolioDescription"
            >
              <Input.TextArea className="description" type="description" />
            </Form.Item>
          </Card.Description>
        </Card.Content>
        <Button className="doneBtn" htmlType="submit">
          Done
        </Button>
      </Form>
    </Card>
  );
};

export default function EditPortfolio() {
  const [portfolios, setPortfolios] = useState([]);

  const portfolioCard = (project) => {
    const removePortfolio = () => {
      const updatedPortfolio = portfolios.filter((e) => e.name !== project.name);
      setPortfolios(updatedPortfolio);
    };

    return (
      <Card key={project.name}>
        <Image src={project.img} height="280px" />
        <Card.Content>
          <Card.Header>{project.name}</Card.Header>
          <Card.Meta>{project.period}</Card.Meta>
          <Card.Description>{project.description}</Card.Description>
        </Card.Content>
        <button
          className="removeBtn"
          width="100%"
          style={{ borderColor: "#d9d9d9", height: "32px", borderRadius: "2px" }}
          onClick={() => removePortfolio(project.name)}
        >
          Remove
        </button>
      </Card>
    );
  };

  return (
    <section className="editPortfolioContainer" id="PORTFOLIO">
      <h2 className="portfolioTitle">PORTFOLIO</h2>
      <div className="portfolios">
        <Grid columns={3} textAlign="center">
          {portfolios.map((project) => {
            return portfolioCard(project);
          })}
          {PortfolioForm(portfolios, setPortfolios, portfolios.imageRef)}
        </Grid>
        <div className="portfolioSave">
          <Button
            onClick={() => {
              uploadDataWithImg(portfolios, "kangmin", "portfolios");
            }}
          >
            Save portfolio
          </Button>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import "../styles/Footer.css";
import Card from "react-bootstrap/Card";

const InfoCard = (props: any) => {
  const { title, description, img, link } = props;
  return (
    <a href={link}>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </a>
  );
};

export default InfoCard;

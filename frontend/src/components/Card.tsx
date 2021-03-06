import React from "react";
import "../styles/Footer.css";
import Card from "react-bootstrap/Card";
import "../styles/About.css";

const InfoCard = (props: any) => {
  const { title, description, img, link } = props;
  return (
    <a href={link} target="_blank">
      <Card bg='card h-100' style={{ width: "18rem" }}>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </a>
  );
};

const ProfileCard = (props: any) => {
  const { name, img, role, bio, commits, issues, tests } = props;
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body className= "center">
      <Card.Img variant="top"  src={img}   className="profile-img img-fluid"/>
        <Card.Title >{name}</Card.Title>
        <Card.Text >{role}</Card.Text>
        <Card.Text >{bio}</Card.Text>
        <Card.Text >Commits: {commits}</Card.Text>
        <Card.Text >Issues: {issues}</Card.Text>
        <Card.Text >Tests: {tests}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export { InfoCard, ProfileCard };

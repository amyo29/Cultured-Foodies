import React from "react";
import "../styles/Footer.css";
import Card from "react-bootstrap/Card";
import "../styles/About.css";

const InfoCard = (props: any) => {
  const { title, description, img, link } = props;
  return (
    <div className="col-md-4">
      <div className="card text-center">
        <a href={link} target="_blank">
          <img src={img} className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text-center"> {description}</p>
          </div>
        </a>
      </div>
    </div>
  );
};

const ProfileCard = (props: any) => {
  const { name, img, role, bio, commits, issues, tests } = props;
  return (
      <div className="card text-center">
          <img src={img} className="card-img-top profile-img img-fluid" />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text"> {role}</p>
            <p className="card-text"> {bio}</p>
            <p className="card-text">Commits: {commits}</p>
            <p className="card-text">Issues: {issues}</p>
            <p className="card-text">Tests: {tests}</p>
          </div>
      </div>
  );
};


export { InfoCard, ProfileCard };

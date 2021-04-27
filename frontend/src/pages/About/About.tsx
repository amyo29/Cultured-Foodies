import React, { useEffect, useState } from "react";
import NavBarSolid from "../../components/NavBarSolid";

import { API_INFO, TOOLS_INFO } from "./AboutInfo";
import { InfoCard, ProfileCard } from "../../components/Card";
import retrieveGitLabInfo, {
  TOTAL_COMMITS_INDEX,
  TOTAL_ISSUES_INDEX,
  TOTAL_TESTS_INDEX,
} from "./GitLabInfo";
import "../../styles/About.css";
import {  Spinner } from "react-bootstrap";
import { Container} from "react-bootstrap";
import { MDBIcon } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";

function About() {
  useEffect(() => {
    document.title = "About";
  }, []);
  const [commitsSum, changeCommitsSum] = useState(-1);
  const [issuesSum, changeIssuesSum] = useState(-1);
  const [testsSum, changeTestsSum] = useState(-1);
  const [teamData, changeTeamData] = useState([{}]);
  const [loaded, changeLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (teamData === undefined || teamData.length === 1) {
        const gitLabInfo = await retrieveGitLabInfo();
        changeCommitsSum(gitLabInfo.statsInfo[TOTAL_COMMITS_INDEX]);
        changeIssuesSum(gitLabInfo.statsInfo[TOTAL_ISSUES_INDEX]);
        changeTestsSum(gitLabInfo.statsInfo[TOTAL_TESTS_INDEX]);
        changeTeamData(gitLabInfo.TEAM_INFO);
        changeLoading(true);
      }
    };
    fetchData();
  }, [teamData]);

  const teamData1 = teamData.slice(0, 3);
  const teamData2 = teamData.slice(3, 6);
  var i, j;
  var chunk = 3;
  var toolRows = [];
  for (i = 0, j = TOOLS_INFO.length; i < j; i += chunk) {
    toolRows.push(TOOLS_INFO.slice(i, i + chunk));
  }
  var APIRows = [];
  for (i = 0, j = API_INFO.length; i < j; i += chunk) {
    APIRows.push(API_INFO.slice(i, i + chunk));
  }
  return (
    <div className="font-style center">
      <NavBarSolid />
      
      <h1>About Us</h1>

      <p className="summary">
        Hong Kong's dim sum? Italy's lasagna? Or UK's fish 'n' chips? Join us on
        a journey of culinary and cultural discovery that stretches through the
        ages and across the seas. With information on delectable cuisines from
        around the world and where you can experience them in your city, as well
        as highlights on worldwide countries and U.S cities, Cultured Foodies
        makes it easy for you to feast to your mind and stomach's content.
      </p>

      <h2>Meet the Team</h2>
      {loaded ? (
        <>
          <Container>
            <div className="row mb-4">
              {
                teamData1.map((teamMember: any) => {
                  const {
                    name,
                    img,
                    role,
                    bio,
                    commits,
                    issues,
                    tests,
                    linkedin,
                  } = teamMember;
                  return (
                    <div className="col-md-4">
                      <ProfileCard
                        name={name}
                        img={img}
                        role={role}
                        bio={bio}
                        commits={commits}
                        issues={issues}
                        tests={tests}
                        linkedin={linkedin}
                      />
                    </div>
                  );
                })

              }
            </div>
          </Container>
          <Container>
            <div className="row mb-4">
              {
                teamData2.map((teamMember: any) => {
                  const {
                    name,
                    img,
                    role,
                    bio,
                    commits,
                    issues,
                    tests,
                    linkedin,
                  } = teamMember;
                  return (
                    <div className="col-md-4">
                      <ProfileCard
                        name={name}
                        img={img}
                        role={role}
                        bio={bio}
                        commits={commits}
                        issues={issues}
                        tests={tests}
                        linkedin={linkedin}
                      />
                    </div>
                  );
                })
              }
            </div>
          </Container>
        </>
      ) : (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}

      <h2>Stats</h2>
      <Container>
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card">
              <div>
                {commitsSum === -1 ? (
                  <h4>
                    Total Commits:{" "}
                    {
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    }
                  </h4>
                ) : (
                  <>
                  <MDBIcon icon="code-branch" size="2x" />
                  <h4>Total Commits: {commitsSum}</h4>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div>
                {commitsSum === -1 ? (
                  <h4>
                    Total Issues:{" "}
                    {
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    }
                  </h4>
                ) : (
                  <>
                    <MDBIcon icon="list-ul" size="2x" />
                    <h4>Total Issues: {issuesSum}</h4>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div>
                {commitsSum === -1 ? (
                  <h4>
                    Total Tests:{" "}
                    {
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    }
                  </h4>
                ) : (
                  <>
                  <MDBIcon far icon="check-circle" size= "2x" />
                  <h4>Total Tests: {testsSum}</h4>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div>
        <h2>APIs</h2>
      </div>
      <Container>
        {APIRows.map((cols) => (
          <div className="row mb-4">
            {cols.map((col: any, i: any) => (
              <InfoCard
                title={col.name}
                img={col.img}
                description={col.description}
                link={col.link}
              />
            ))}
          </div>
        ))}
      </Container>
      <div>
        <h2>Tools</h2>
      </div>
      <Container>
        {toolRows.map((cols) => (
          <div className="row mb-4">
            {cols.map((col: any, i: any) => (
              <InfoCard
                title={col.title}
                img={col.img}
                description={col.description}
                link={col.link}
              />
            ))}
          </div>
        ))}
      </Container>
      <div>
        <h2>Our Data</h2>
      </div>
      <Container>
        <div className="row justify-content-center">
          <InfoCard
            title="Gitlab Repo"
            img={TOOLS_INFO[1].img}
            link="https://gitlab.com/cs373-group-11/cultured-foodies"
          />
          <InfoCard
            title="Postman API"
            img={TOOLS_INFO[2].img}
            link="https://documenter.getpostman.com/view/15165948/TzJrBeeW"
          />
        </div>
      </Container>
    </div>
  );
}

export default About;

import React, { useEffect, useState } from "react";
import { API_INFO, TOOLS_INFO, TEAM_INFO } from "./AboutInfo";
import { InfoCard, ProfileCard } from "../../components/Card";
import retrieveGitLabInfo, {
  TOTAL_COMMITS_INDEX,
  TOTAL_ISSUES_INDEX,
  TOTAL_TESTS_INDEX,
} from "./GitLabInfo";
import "../../styles/About.css";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import { CardDeck, Spinner } from "react-bootstrap";
import { Container, Row, Col, Card, ListGroup, Navbar } from "react-bootstrap";
import ZomatoLogo from "./Images/APIs/zomato.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  })
);

function About() {
  useEffect(() => {
    document.title = "About";
  }, []);
  const [spacing, setSpacing] = React.useState<GridSpacing>(2);
  const classes = useStyles();

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
      <h1>About Us</h1>

      <p className="summary">
        Hong Kong's dim sum? Italy's lasagna? Or UK's fish 'n' chips? Join us on a journey of culinary and cultural discovery that stretches through the ages and across the seas.
        With information on delectable cuisines from around the world and where you can experience them in your city, as well as highlights on worldwide countries and U.S cities, 
        Cultured Foodies makes it easy for you to feast to your mind and stomach's content.
      </p>

      <h2>Meet the Team</h2>
    { loaded ?
      <>
      <Container>
        <div className="row mb-4">
            {
            // loaded ? 
            (
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
                      linkedin = {linkedin}
                    />
                  </div>
                );
              })
            ) 
            // : (
            //   <Spinner animation="grow" variant="dark" size="sm"/>
            // )
            }
        </div>
      </Container>
      <Container>
        <div className="row mb-4">
            {
            // loaded ? 
            (
              teamData2.map((teamMember: any) => {
                const {
                  name,
                  img,
                  role,
                  bio,
                  commits,
                  issues,
                  tests,
                  linkedin
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
                      linkedin = {linkedin}
                    />
                  </div>
                );
              })
            )  
            // :(  
            //      <Spinner animation="grow" variant="dark" size="sm"/>
            // )
            }
        </div>
      </Container>
      </>
      :
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      }
      

      <div>
        <h2>Stats</h2>
        <div>
          
          {commitsSum === -1 ? (
            <h5>Total Commits:  {<Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            }
            </h5> 
          ) : (
            <h5>Total Commits: {commitsSum}</h5>
          )}
        </div>
        <div>
          {commitsSum === -1 ? (
            <h5>Total Issues:  {<Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            }</h5>
          ) : (
            <h5>Total Issues: {issuesSum}</h5>
          )}
        </div>
        <div>
          {commitsSum === -1 ? (
            <h5>Total Tests:  {<Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            }</h5>
          ) : (
            <h5>Total Tests: {testsSum}</h5>
          )}
        </div>
      </div>

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
            link="https://documenter.getpostman.com/view/15165948/TzCL9UDZ"
          />
        </div>
      </Container>
    </div>
  );
}

export default About;

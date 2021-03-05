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
import { CardDeck } from "react-bootstrap";

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

  const teamData1 = teamData.slice(0,3)
  const teamData2 = teamData.slice(3,6)
  return (
    <div className="font-style center">
      <h1>About Us</h1>

      <p>
        Cultured Foodies is a website that encourages its users to discover new
        foods from different cultures. We want people to explore the world of
        food from our website and learn more about new cuisines and dishes.
      </p>

      <p>
        The data we've gathered highlights cuisines from various cultures and
        their known presence in news outlets.
      </p>

      <h2>Meet the Team</h2>
      <div className= "row main-card">
      <div className="col-7">
      <CardDeck >
        {loaded ? (
          teamData1.map((teamMember: any) => {
            const { name, img, role, bio, commits, issues, tests } = teamMember;

            return (
              <ProfileCard 
                name={name}
                img={img}
                role={role}
                bio={bio}
                commits={commits}
                issues={issues}
                tests={tests}
              />
            );
          })
        ) : (
          <div>Loading</div>
        )}
      </CardDeck>
      </div>
      </div>
      <div className= "row main-card">
      <div className="col-7">
      <CardDeck >
        {loaded ? (
          teamData2.map((teamMember: any) => {
            const { name, img, role, bio, commits, issues, tests } = teamMember;

            return (
              <ProfileCard 
                name={name}
                img={img}
                role={role}
                bio={bio}
                commits={commits}
                issues={issues}
                tests={tests}
              />
            );
          })
        ) : (
          <div>Loading</div>
        )}
      </CardDeck>
      </div>
      </div>

      <div>
        <h2>Stats</h2>
        <div>
          {commitsSum === -1 ? (
            <h5>Total Commits: </h5>
          ) : (
            <h5>Total Commits: {commitsSum}</h5>
          )}
        </div>
        <div>
          {commitsSum === -1 ? (
            <h5>Total Issues: </h5>
          ) : (
            <h5>Total Issues: {issuesSum}</h5>
          )}
        </div>
        <div>
          {commitsSum === -1 ? (
            <h5>Total Tests: </h5>
          ) : (
            <h5>Total Tests: {testsSum}</h5>
          )}
        </div>
      </div>

      <div>
        <h2>Data</h2>
      </div>

      <Grid container className={classes.root} spacing={2} justify="center">
        {API_INFO.map((api: any) => {
          const { title, img, description, link } = api;

          return (
            <InfoCard
              title={title}
              img={img}
              description={description}
              link={link}
            />
          );
        })}
      </Grid>

      <div>
        <h2>Tools</h2>
      </div>

      <Grid container className={classes.root} spacing={2} justify="center">
        {TOOLS_INFO.map((tool: any) => {
          const { title, img, description, link } = tool;

          return (
            <InfoCard
              title={title}
              img={img}
              description={description}
              link={link}
            />
          );
        })}
      </Grid>

      <Grid container className={classes.root} spacing={2} justify="center">
        <InfoCard
          title="Gitlab Repo"
          img={TOOLS_INFO[1].img}
          link="https://gitlab.com/cs373-group-11/cultured-foodies"
        />
        <InfoCard
          title="Postman API"
          img={TOOLS_INFO[2].img}
          link="https://documenter.getpostman.com/view/14740527/Tz5i9gAY"
        />
      </Grid>
    </div>
  );
}

export default About;

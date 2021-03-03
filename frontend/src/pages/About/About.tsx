import React, { useEffect, useState } from "react";
import { toolsInfo, teamInfo, apiInfo } from "./AboutInfo";
import { InfoCard, ProfileCard } from "../../components/Card";
import "../../styles/About.css";

const TOTAL_COMMITS_INDEX = 0
const TOTAL_ISSUES_INDEX = 1
const TOTAL_TESTS_INDEX = 2

const retrieveGitLabInfo = async () => {
  let statsInfo = [0, 0, 0]

  teamInfo.forEach((member: any) => {
    member.commits = 0;
    member.issues = 0;
    statsInfo[TOTAL_TESTS_INDEX] += member.tests;
  });

  const issueList = await fetch(
    "https://gitlab.com/api/v4/projects/24676977/issues"
  ).then((response) => response.json());

  const commitList = await fetch(
    "https://gitlab.com/api/v4/projects/24676977/repository/contributors"
  ).then((response) => response.json());

  commitList.forEach((element: any) => {
    let name = element.name;
    let email = element.email;
    let commits = element.commits;
    teamInfo.forEach((member: any) => {
      if (
        member.name === name ||
        member.username === name ||
        member.email === email
      ) {
        member.commits += commits;
      }
    });
    statsInfo[TOTAL_COMMITS_INDEX] += commits;
  });

  issueList.forEach((element: any) => {
    let name = element.author.name;
    teamInfo.forEach((member: any) => {
      if (member.name === name) {
        member.issues += 1;
      }
    });
    statsInfo[TOTAL_ISSUES_INDEX] += 1;
  });

  return {
    statsInfo: statsInfo,
    teamInfo: teamInfo,
  };
};

function About() {
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
        changeTeamData(gitLabInfo.teamInfo);
        changeLoading(true);
      }
    };
    fetchData();
  }, [teamData]);

  return (
    <div className="font-style">
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

      {loaded ? (
        teamData.map((teamMember: any) => {
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

      {apiInfo.map((tool: any) => {
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

      <div>
        <h2>Tools</h2>
      </div>

      {toolsInfo.map((tool: any) => {
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

      <div>
        <InfoCard
          title="Gitlab Repo"
          img={toolsInfo[1].img}
          link="https://gitlab.com/cs373-group-11/cultured-foodies"
        />
      </div>

      <div>
        <InfoCard
          title="Postman API"
          img={toolsInfo[2].img}
          link="https://documenter.getpostman.com/view/14740527/Tz5i9gAY"
        />
      </div>
    </div>
  );
}

export default About;

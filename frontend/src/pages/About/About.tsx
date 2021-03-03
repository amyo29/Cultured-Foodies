import React, { useEffect, useState } from "react";
import { toolsInfo, teamInfo } from "./AboutInfo";
import { InfoCard, ProfileCard } from "../../components/Card";

const getGitlabInfo = async () => {
  let totalCommitCount = 0,
    totalIssueCount = 0,
    totalTestCount = 0;

  // Need to wipe member issues before calling again and calculate total tests
  teamInfo.forEach((member: any) => {
    totalTestCount += member.tests;
    member.issues = 0;
    member.commits = 0;
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
    totalCommitCount += commits;
  });

  issueList.forEach((element: any) => {
    let name = element.author.name;
    teamInfo.forEach((member: any) => {
      if (member.name === name) {
        member.issues += 1;
      }
    });
    totalIssueCount += 1;
  });

  return {
    totalCommits: totalCommitCount,
    totalIssues: totalIssueCount,
    totalTests: totalTestCount,
    teamInfo: teamInfo,
  };
};

function About() {
  const [commitsSum, changeCommitsSum] = useState(-1);
  const [issuesSum, changeIssuesSum] = useState(-1);
  const [testsSum, changeTestsSum] = useState(-1);
  const [teamData, changeTeamData] = useState([{}])
  const [loaded, changeLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (teamData === undefined || teamData.length === 1) {
        const gitLabInfo = await getGitlabInfo();
        changeCommitsSum(gitLabInfo.totalCommits)
        changeIssuesSum(gitLabInfo.totalIssues)
        changeTestsSum(gitLabInfo.totalTests)
        changeTeamData(gitLabInfo.teamInfo)
        changeLoading(true)
      }
    }
    fetchData()
  }, [teamData])
  return (
    <div>
      <h1>About Us</h1>

      <p>
        Cultured Foodies encourages its users to discover new foods from
        different cultures. We want people to explore the world of food from our
        website and learn more about new cuisines and dishes.
      </p>

      <p>explanation of the interesting result of integrating disparate data</p>

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
      )
}

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
        <a href="https://gitlab.com/cs373-group-11/cultured-foodies">Gitlab</a>
      </div>

      <div>
        <a href="https://www.postman.com">Postman</a>
      </div>
    </div>
  );
}

export default About;

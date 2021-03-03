import React, { useEffect } from "react";
import {toolsInfo, teamInfo} from "./AboutInfo";
import InfoCard from "../../components/Card";

const getGitlabInfo = async () => {
  let totalCommitCount = 0,
    totalIssueCount = 0,
    totalTestCount = 0;

  // Need to wipe member issues before calling again and calculate total tests
  teamInfo.forEach((member:any) => {
    totalTestCount += member.tests;
    member.issues = 0;
    member.commits = 0;
  });

  const issueList = await fetch(
    "https://gitlab.com/api/v4/projects/24676977/issues"
  ).then(response => response.json())

  // Can't use a map cause Gitlab's API returns are weird :/
  const commitList = await fetch(
    "https://gitlab.com/api/v4/projects/24676977/repository/contributors"
  ).then(response => response.json());

  commitList.forEach((element:any) => { 
    let name = element.name; 
    let email = element.email;
    let commits = element.commits;
    teamInfo.forEach((member:any) => {
      if (
        member.name === name ||
        member.username === name ||
        member.email === email
      ) {
        member.commits += commits;
      }
    });
    totalCommitCount += commits;
  })

  issueList.forEach((element:any) => { 
    // console.log(element.author.name)
    let name = element.author.name; 
    teamInfo.forEach((member:any) => {
      if (member.name === name) {
        member.issues += 1;
      }
    });
    totalIssueCount += 1;
  })

  return {
    totalCommits: totalCommitCount,
    totalIssues: totalIssueCount,
    totalTests: totalTestCount,
    teamInfo: teamInfo,
  };
};

function About() {
  useEffect(() => {
    const gitLabInfo = getGitlabInfo();
    console.log(gitLabInfo)
  })
  return (
    <div>
      <h1>About Us</h1>
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
      <p>
        Cultured Foodies encourages its users to discover new foods from
        different cultures. We want people to explore the world of food from our
        website and learn more about new cuisines and dishes.
      </p>

      <p>explanation of the interesting result of integrating disparate data</p>

      <h2>Meet the Team</h2>

      <div>
        <h3>Name</h3>
        <p>
          <p>Bio:</p>
          <p>Frontend or Backend</p>
          <p>No. of commits:</p>
          <p>No. of issues:</p>
          <p>No. of unit tests:</p>
        </p>
      </div>

      <div>
        <h2>Stats</h2>
        <p>total no. of commits: </p>
        <p>total no. of issues: </p>
        <p>total no. of unit tests: </p>
      </div>

      <div>
        <h2>Data</h2>
      </div>

      <div>
        <h2>Tools</h2>
        <p>Gitlab</p>
        <p>Postman</p>
        <p>React</p>
        <p>Bootstrap</p>
        <p>AWS</p>
        <p>NameCheap</p>
      </div>

      <div>
        <a href="https://gitlab.com/cs373-group-11/cultured-foodies">Gitlab</a>
        <a href="https://www.postman.com">Postman</a>
      </div>
    </div>
  );
}

export default About;

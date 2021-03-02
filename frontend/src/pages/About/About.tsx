import React from "react";
import teamInfo from "./AboutInfo";
import toolsInfo from "./AboutInfo";
import InfoCard from "../../components/Card";
import { type } from "os";

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

  // Can't use a map cause Gitlab's API returns are weird :/
  let commitList = await fetch(
    "https://gitlab.com/api/v4/projects/24676977/repository/contributors"
  );
  commitList = await commitList.json();
  // console.log(JSON.stringify(commitList))
  for (let dict in commitList){
    console.log(typeof(commitList))
    // teamInfo.forEach((member:any) => {
    //   if (
    //     member.name === name ||
    //     member.username === name ||
    //     member.email === email
    //   ) {
    //     member.commits += commits;
    //   }
    // });
    // totalCommitCount += commits;
  }
  // commitList.forEach((element:any) => {
  //   const { name, email, commits } = element;
  //   teamInfo.forEach((member:any) => {
  //     if (
  //       member.name === name ||
  //       member.username === name ||
  //       member.email === email
  //     ) {
  //       member.commits += commits;
  //     }
  //   });
  //   totalCommitCount += commits;
  // });

  return {
    totalCommits: totalCommitCount,
    totalIssues: totalIssueCount,
    totalTests: totalTestCount,
    teamInfo: teamInfo,
  };
};

function About() {
  getGitlabInfo()
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

import { teamInfo } from "./AboutInfo";

export const TOTAL_COMMITS_INDEX = 0
export const TOTAL_ISSUES_INDEX = 1
export const TOTAL_TESTS_INDEX = 2

const retrieveGitLabInfo = async () => {
  let statsInfo = [0, 0, 0]

  teamInfo.forEach((member: any) => {
    member.commits = 0;
    member.issues = 0;
    statsInfo[TOTAL_TESTS_INDEX] += member.tests;
  });

  const listOfIssues = await fetch(
    "https://gitlab.com/api/v4/projects/24676977/issues"
  ).then((response) => response.json());

  const listOfCommits = await fetch(
    "https://gitlab.com/api/v4/projects/24676977/repository/contributors"
  ).then((response) => response.json());

  listOfCommits.forEach((element: any) => {
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

  listOfIssues.forEach((element: any) => {
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

export default retrieveGitLabInfo;
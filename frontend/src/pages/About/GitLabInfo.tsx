import { TEAM_INFO } from "./AboutInfo";

export const TOTAL_COMMITS_INDEX = 0;
export const TOTAL_ISSUES_INDEX = 1;
export const TOTAL_TESTS_INDEX = 2;

function resetStatsInfo(statsInfo: any) {
  TEAM_INFO.forEach((member: any) => {
    member.commits = 0;
    member.issues = 0;
    statsInfo[TOTAL_TESTS_INDEX] += member.tests;
  });
}

const retrieveGitLabInfo = async () => {
  let statsInfo = [0, 0, 0];

  resetStatsInfo(statsInfo);

  const LIST_OF_ISSUES = await fetch(
    "https://gitlab.com/api/v4/projects/24676977/issues?per_page=100"
  ).then((response) => response.json());

  const LIST_OF_COMMITS = await fetch(
    "https://gitlab.com/api/v4/projects/24676977/repository/contributors"
  ).then((response) => response.json());

  LIST_OF_COMMITS.forEach((commit: any) => {
    let name = commit.name;
    let email = commit.email;
    let commits = commit.commits;
    TEAM_INFO.forEach((member: any) => {
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

  LIST_OF_ISSUES.forEach((issue: any) => {
    let name = issue.author.name;
    let username = issue.author.username;
    TEAM_INFO.forEach((member: any) => {
      if (member.name === name || member.username === username) {
        member.issues += 1;
      }
    });
    statsInfo[TOTAL_ISSUES_INDEX] += 1;
  });

  return {
    statsInfo: statsInfo,
    TEAM_INFO: TEAM_INFO,
  };
};

export default retrieveGitLabInfo;

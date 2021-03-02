import React from 'react';
// import {Button} from 'react-bootstrap';

function About() {
  return (
    <div>
      <h2>
        About
      </h2>
      <td>
        <p>
          <b>one</b> page
        </p>
        <ul>
          <li>description of the site, its purpose, its intended users</li>
          <li>explanation of the interesting result of integrating disparate data</li>
          <li>the group members</li>
          <li>for each member
          <ul>
              <li>name</li>
              <li>photo</li>
              <li>bio</li>
              <li>major responsibilities</li>
              <li>no. of commits</li>
              <li>no. of issues</li>
              <li>no. of unit tests</li>
            </ul>
          </li>
          <li>stats
          <ul>
              <li>total no. of commits</li>
              <li>total no. of issues</li>
              <li>total no. of unit tests</li>
            </ul>
          </li>
          <li>data
          <ul>
              <li>links to the data <b>sources</b></li>
              <li>description of <b>how</b> each was <b>scraped</b></li>
            </ul>
          </li>
          <li>tools
          <ul>
              <li>tools used</li>
              <li>describe their use</li>
              <li>special focus on optional tools that were <b>not</b> required</li>
            </ul>
          </li>
          <li>a link to the <a href="https://gitlab.com/cs373-group-11/cultured-foodies">GitLab</a> repo</li>
          <li>a link to the <a href="https://www.postman.com">Postman</a> API</li>
        </ul>
      </td>
    </div>
  );
}

export default About;

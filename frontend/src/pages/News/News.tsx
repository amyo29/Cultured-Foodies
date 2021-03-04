import React from "react";
const data  = require('../../data/threeNews.json')

function News() {
  return (
    <div>
       <header>News</header>
      
      {data.map((article:any, i :any) => (
        <a href={"/news/" + i}>
          <div>{article['title']} </div>
          </a>
        ))}
    </div>
  );
}

export default News;

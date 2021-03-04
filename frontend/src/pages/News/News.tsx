import React from "react";
const data  = require('../../data/threeNews.json')

function News() {
  return (
    <div>
       <header>News</header>
      {data.map((article:any) => (
          <div>{article['title']} </div>
        ))}
    </div>
  );
}

export default News;

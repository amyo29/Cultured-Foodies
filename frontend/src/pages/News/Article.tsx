import React from "react";
import { useParams } from 'react-router-dom';

const news_data  = require('../../data/threeNews.json')

function Article() {
  const {id} = useParams<{id: string}>();
  let data = news_data[+id] 
  return (
    <div>
     {data['summary']}
    </div>
  );
}

export default Article;

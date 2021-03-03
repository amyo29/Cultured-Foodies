import React from "react";
import { useParams } from 'react-router-dom';

function Country() {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <header>Country</header>
    </div>
  );
}

export default Country;

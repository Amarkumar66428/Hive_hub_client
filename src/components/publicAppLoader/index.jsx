import React from "react";
import "./publicAppLoader.scss";

const PublicAppLoader = ({ subdomain = "Loading" }) => {
  return <div className="public-app-loader">{subdomain}</div>;
};

export default PublicAppLoader;

import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="lds-container">
      <div className="lds-spinner" style={{height:'100%'}}><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/></div>
    </div>
  );
}

export default Loading;
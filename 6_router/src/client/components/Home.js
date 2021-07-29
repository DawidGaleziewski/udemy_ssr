import React from "react";

const Home = () => {
  return (
    <div>
      <span>Test</span>
      <button
        onClick={(event) => {
          console.log("hi there");
        }}
      >
        Test
      </button>
    </div>
  );
};

export default Home;

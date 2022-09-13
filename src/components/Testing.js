import React, { useRef } from "react";

const Testing = () => {
  const refInput = useRef();

  const inputFocus = () => {
    refInput.current.focus();

    // console.log("button is work");
  };

  return (
    <>
      <form>
        <input type="text" ref={refInput} />
        <button onClick={inputFocus}>click</button>
      </form>
    </>
  );
};
export default Testing;

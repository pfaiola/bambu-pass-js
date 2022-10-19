import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    fetch("/pass")
      .then((resp) => {
        console.log("a");
        return resp.json();
      })
      .then((data) => {
        console.log("b");
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Sample NextJS App</h1>
      <p>
        The main server file is ok{" "}
        <span style={{ fontFamily: "monospace" }}>src/index.js</span>
      </p>
      <p>
        New pages can be added in{" "}
        <span style={{ fontFamily: "monospace" }}>pages/</span>
      </p>
    </div>
  );
};

export default App;

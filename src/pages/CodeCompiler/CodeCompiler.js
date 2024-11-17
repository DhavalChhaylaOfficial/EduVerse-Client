import { useState, useEffect } from "react";
import "./CodeCompiler.css";
import Editor from "@monaco-editor/react";
import Navbar from "../../components/core/CodeCompiler/navbar";
import Axios from "axios";
import spinner from "../../assets/Images/spinner.svg";

function App() {
  const [userCode, setUserCode] = useState("");
  const [userLang, setUserLang] = useState("python");
  const [userTheme, setUserTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(20);
  const [userInput, setUserInput] = useState("");
  const [userOutput, setUserOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const sampleCodeMap = {
      python: "# Sample Python code\nprint('Hello, World!')",
      c: "// Sample C code\n#include <stdio.h>\nint main() {\n  printf(\"Hello, World!\");\n  return 0;\n}",
      cpp: "// Sample C++ code\n#include <iostream>\nusing namespace std;\nint main() {\n  cout << \"Hello, World!\";\n  return 0;\n}",        
      java: "// Sample Java code\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hello, World!\");\n  }\n}"

  };

  useEffect(() => {
      setUserCode(sampleCodeMap[userLang] || ""); // Set the sample code on language change
  }, [userLang]);

  const options = {
      fontSize: fontSize
  };

  function compile() {
      setLoading(true);
      if (userCode === ``) {
          return;
      }

      Axios.post(`http://localhost:4000/api/v1/compile`, {
          code: userCode,
          language: userLang,
          input: userInput
      }).then((res) => {
          setUserOutput(res.data.stdout || res.data.stderr);
      }).then(() => {
          setLoading(false);
      }).catch((err) => {
          console.error(err);
          setUserOutput("Error: " + (err.response ? err.response.data.error : err.message));
          setLoading(false);
      });
  }

  function clearOutput() {
      setUserOutput("");
  }

  return (
      <div className="App">
          <Navbar
              userLang={userLang} setUserLang={setUserLang}
              userTheme={userTheme} setUserTheme={setUserTheme}
              fontSize={fontSize} setFontSize={setFontSize}
          />
          <div className="main">
              <div className="left-container">
                  <Editor
                      options={options}
                      height="calc(100vh - 50px)"
                      width="100%"
                      theme={userTheme}
                      language={userLang}
                      defaultLanguage="python"
                      value={userCode} // Set value based on selected language
                      onChange={(value) => { setUserCode(value) }}
                  />
                  <button className="run-btn" onClick={compile}>Run</button>
              </div>
              <div className="right-container">
                  <h4>Input:</h4>
                  <div className="input-box">
                      <textarea
                          id="code-inp"
                          onChange={(e) => setUserInput(e.target.value)}>
                      </textarea>
                  </div>
                  <h4>Output:</h4>
                  {loading ? (
                      <div className="spinner-box">
                          <img src={spinner} alt="Loading..." />
                      </div>
                  ) : (
                      <div className="output-box">
                          <pre>{userOutput}</pre>
                          <button onClick={clearOutput} className="clear-btn">Clear</button>
                      </div>
                  )}
              </div>
          </div>
      </div>
  );
}

export default App;

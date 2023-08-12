import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [option, setOption] = useState([]);
  const [to, setTo] = useState("en");
  const [from, setFrom] = useState("en");
  const [input, setInput] = useState([]);
  const [output, setOutput] = useState("");
  const [dark, setDark] = useState("white");
  const [style, setStyle] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("https://libretranslate.com/languages", {
        accept: "application/json",
      })
      .then((res) => {
        setOption(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const translateHandler = () => {
    setLoading(true);
    const params = new URLSearchParams();
    params.append("q", input);
    params.append("source", from);
    params.append("target", to);
    params.append("api_key", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");

    axios
      .post("https://libretranslate.de/translate", params, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setOutput(res.data.translatedText);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const themeHandler = () => {
    if (dark === "white") {
      setDark("dark");
    }
    if (dark === "dark") {
      setDark("white");
    }
  };

  let body = document.body;
  useEffect(() => {
    if (dark === "white") {
      body.style.backgroundColor = "white";
      body.style.color = "black";
      setStyle({ backgroundColor: "white", color: "black" });
    }

    if (dark === "dark") {
      body.style.backgroundColor = "black";
      body.style.color = "white";
      setStyle({ backgroundColor: "black", color: "white" });
    }
  }, [dark, body]);

  return (
    <>
      <div className="App">
        <div className="card" style={style}>
          <h2>
            Google Translate Clone
            <button
              onClick={themeHandler}
              style={{
                float: "right",
                border: "none",
                background: "none",
                fontSize: "20px",
              }}
            >
              {dark === "white" ? "🌙" : "🔆"}
            </button>
          </h2>

          <div className="lang">
            From({from}) :-{" "}
            <select onChange={(e) => setFrom(e.target.value)}>
              {option.map((lang) => (
                <option value={lang.code} key={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>{" "}
            To({to}) :-{" "}
            <select onChange={(e) => setTo(e.target.value)}>
              {option.map((lang) => (
                <option value={lang.code} key={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="text">
            <textarea
              onInput={(e) => setInput(e.target.value)}
              placeholder="Enter Text"
            ></textarea>
            <textarea
              onChange={() => ""}
              placeholder={loading ? "Translating..." : "Translate"}
              value={output}
            ></textarea>
          </div>

          <button onClick={translateHandler} className="btn">
            {loading ? "Translating..." : "Translate"}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

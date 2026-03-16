import { useState } from "react";

function App() {
  const [topic, setTopic] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!topic) return;

    setLoading(true);
    setOutput("");

    try {
      const response = await fetch(
        `http://localhost:8000/query/${topic}`
      );

      const data = await response.json();
      console.log("data>>>>>>>>>>" , data)

      setOutput(data.response || JSON.stringify(data));
    } catch (error) {
      setOutput("⚠️ Error fetching data from backend: ", error);
    }

    setLoading(false);
  };

  return (
    <div className="page">
      <div className="card">

        <h1 className="title">AI Topic Generator</h1>
        <p className="subtitle">Enter a topic and generate content</p>

        <input
          type="text"
          placeholder="Enter topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="input"
        />

        <button onClick={generate} className="button">
          {loading ? "Generating..." : "Generate"}
        </button>

        <div className="output">
          {output || "Generated output will appear here..."}
        </div>

      </div>

      <style>{`
      
      *{
        box-sizing:border-box;
        margin:0;
        padding:0;
        font-family: system-ui;
      }

      .page{
        height:100vh;
        width:100%;
        display:flex;
        justify-content:center;
        align-items:center;

        background: linear-gradient(
          135deg,
          #667eea 0%,
          #764ba2 50%,
          #4facfe 100%
        );
      }

      .card{
  width:500px;
  padding:40px;
  border-radius:20px;

  backdrop-filter: blur(10px);
  background: rgba(255,255,255,0.15);

  border:1px solid rgba(255,255,255,0.3);

  box-shadow:0 20px 50px rgba(0,0,0,0.25);

  text-align:center;

  max-height:85vh;   /* prevents card from exceeding screen */
  overflow:hidden;   /* prevents layout break */
}

      .title{
        font-size:32px;
        font-weight:700;
        color:white;
        margin-bottom:10px;
      }

      .subtitle{
        color:#eaeaea;
        margin-bottom:25px;
      }

      .input{
  width:100%;
  padding:14px;
  border-radius:10px;
  border:none;
  margin-bottom:20px;

  font-size:16px;

  background:white;
  color:#111;          /* text color when typing */

  outline:none;

  box-shadow: inset 0 2px 6px rgba(0,0,0,0.1);
}

      .button{
        width:100%;
        padding:14px;

        border:none;
        border-radius:10px;

        font-size:16px;
        font-weight:600;

        background: linear-gradient(90deg,#4facfe,#00f2fe);
        color:white;

        cursor:pointer;

        transition:0.25s;
        margin-bottom:20px;
      }

      .button:hover{
        transform: translateY(-2px);
        box-shadow:0 8px 20px rgba(0,0,0,0.2);
      }

      .output{
  height:200px;              /* fixed height */
  max-height:200px;

  padding:15px;
  border-radius:12px;

  background: rgba(255,255,255,0.9);

  text-align:left;
  font-size:15px;
  line-height:1.6;
  color:#333;

  overflow-y:auto;           /* vertical scroll */
  overflow-x:hidden;

  word-wrap:break-word;
  white-space:pre-wrap;
}

      `}</style>
    </div>
  );
}

export default App;
import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";
import axios from "axios";

class Chatbot extends Component {
  // Fetch data from your JSON file or backend API
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };
  }

  async componentDidMount() {
    try {
      const response = await axios.get("../../../backend/data/data.json");
      this.setState({ jsonData: response.data });
    } catch (error) {
      console.log("Fetch data eror", error);
    }
  }

  handleInput = (userInput) => {
    const { jsonData } = this.state;

    if (jsonData) {
      const modelResponse = this.processUserInput(userInput, jsonData);

      this.setState((prevState) => ({
        messages: [...prevState.messages, { text: userInput, user: true }, { text: modelResponse, user: false }],
      }));
    }
  };

  processUserInput = (userInput, jsonData) => {
    const defaultResponse = "Maaf, saya tidak mengerti pertanyaan anda";
    const modelResponse = jsonData[userInput] || defaultResponse;

    return modelResponse;
  };

  render() {
    return (
      <div>
        <ChatBot
          steps={[
            ...this.state.messages.map((message, index) => ({
              id: index.toString(),
              message: message.text,
              user: message.user,
            })),
            {
              id: "userInput",
              user: true,
              trigger: "response",
            },
            {
              id: "response",
              component: <componentDidMount />,
              trigger: "userInput",
            },
            // {
            //   id: "1",
            //   message: "Selamat datang di E-BOT, Silahkan jika ada yang ditanyakan tentang pendaftaran E-KTP",
            //   trigger: "2",
            // },
            // {
            //   id: "2",
            //   user: true,
            //   trigger: "2",
            // },
          ]}
        />
        ;
      </div>
    );
  }
}

export default Chatbot;

// frontend/src/components/Chatbot.js
// import React, { useState, useEffect } from "react";
// import ChatBot from "react-simple-chatbot";
// import axios from "axios";

// const Chatbot = () => {
//   const [response, setResponse] = useState("");
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     // Fetch data from your JSON file or backend API
//     const getData = async () => {
//       try {
//         const response = await axios.get("../../../backend/data/data.json"); // Update the path
//         setData(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     getData();
//   }, []);

//   const handleEnd = async ({ values }) => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/chat", { message: values[0] });
//       setResponse(res.data.message);
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   // Ambil langkah dari data JSON
//   const steps = data.map((item) => ({
//     id: item.id.toString(),
//     message: item.question,
//     trigger: "user",
//   }));

//   steps.push({
//     id: "user",
//     user: true,
//     trigger: "end",
//   });

//   steps.push({
//     id: "end",
//     component: (
//       <div>
//         <p>Chatbot Response: {response}</p>
//       </div>
//     ),
//     asMessage: true,
//     end: true,
//   });

//   return <ChatBot steps={steps} handleEnd={handleEnd} />;
// };

// export default Chatbot;

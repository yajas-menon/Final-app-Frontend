import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

const steps = [
  {
    id: "1",
    message: "What is your name?",
    trigger: "2",
  },
  {
    id: "2",
    user: true,
    trigger: "3",
  },
  {
    id: "3",
    message: "Hi {previousValue}, nice to meet you!",
    end: true,
  },
];

// Creating our own theme
const theme = {
  background: "#f5f8fb",
  fontFamily: "Helvetica Neue",
  headerBgColor: "#EF6C00",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#EF6C00",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

// Set some properties of the bot
const config = {
  floating: true,
};

function Chat() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <ChatBot
          headerTitle="Gen Ai Bot"
          steps={steps}
          {...config}
        />
      </ThemeProvider>
    </div>
  );
}

export default Chat;

import React, { useEffect } from "react";
import {
  globalObservable,
  Button,
  Input,
} from "nicole-test-components-library";
import logo from "./logo.svg";
import "./App.css";

function App() {
  useEffect(() => {
    console.log("aaa");
    globalObservable.publish("Message 1111");
  }, []);

  const handleNewMessage = (newMessage: string) => {
    // setMessages((currentMessages) => currentMessages.concat(newMessage));
    alert(`Paren received new message from child: ${newMessage}`);
  };

  useEffect(() => {
    console.log("Start subscribe");
    globalObservable.subscribe(handleNewMessage);
    return () => {
      globalObservable.unsubscribe(handleNewMessage);
    };
  }, [handleNewMessage]);

  return (
    <div className="App">
      <header className="App-header">
        <Button />
      </header>
    </div>
  );
}

export default App;

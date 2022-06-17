import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Input,
  GlobalObservable,
  Message,
  Button,
} from "nicole-test-components-library";

function App() {
  const [messages, setMessages] = useState([] as string[]);
  const handleNewMessage = (newMessage: Message) => {
    const { action, payload } = newMessage;
    if (action === "ToParent") {
      setMessages((currentMessages) => [...currentMessages, payload.data]);
    }
  };

  useEffect(() => {
    GlobalObservable.subscribe(handleNewMessage);
    return () => {
      GlobalObservable.unsubscribe(handleNewMessage);
    };
  }, [handleNewMessage]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    GlobalObservable.publish({
      action: "ToLibrary",
      payload: { data: e.target.value },
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {!!messages.length &&
            messages.map((message, idx) => {
              return <li key={idx}>{message}</li>;
            })}
        </ul>
        <Input label="Input from library" />
        <hr />
        <label htmlFor="inputParent">Input from Parent project</label>
        <input
          type="text"
          name="inputParent"
          id="inputParent"
          onChange={handleChange}
        />
        <br />
        <Button />
      </header>
    </div>
  );
}

export default App;

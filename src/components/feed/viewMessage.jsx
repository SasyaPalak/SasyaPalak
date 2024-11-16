import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../layout/navbar";
import Footer from "../layout/footer";

const ViewMessage = () => {
  const [messages, setMessages] = useState([]);
  const [messageFeedback, setMessageFeedback] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const response = await axios.get("/admin/view-message");
      setMessages(response.data);
    } catch (error) {
      setMessageFeedback("Failed to fetch messages.");
    } finally {
      setLoading(false);
    }
  };

  const handleMessageSeenChange = (index) => {
    const updatedMessages = [...messages];
    updatedMessages[index].seen = !updatedMessages[index].seen;
    setMessages(updatedMessages);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) {
    return <div style={{ padding: "20px" }}>Loading messages...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      {/*Navbar*/}
      <Navbar />
      
      <h2>Messages</h2>
      {messageFeedback && <p style={{ color: "red" }}>{messageFeedback}</p>}
      <table border="1" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Check</th>
          </tr>
        </thead>
        <tbody>
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <tr key={index}>
                <td>{message.fullName}</td>
                <td>{message.email}</td>
                <td>{message.message}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={message.seen || false}
                    onChange={() => handleMessageSeenChange(index)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No messages available.</td>
            </tr>
          )}
        </tbody>
      </table>
      {/*Footer*/}#
      <Footer />
    </div>
  );
};

export default ViewMessage;

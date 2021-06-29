import React, { useState } from "react";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import { IconButton } from 'react-native-paper';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export default function RoomScreen() {
  const [messages, setMessages] = useState([
    /**
     * Mock message data
     */
    {
      _id: 0,
      text: "New room created.",
      createdAt: new Date().getTime(),
      system: true,
    },
    {
      _id: 1,
      text: "Hello!",
      createdAt: new Date().getTime(),
      user: {
        _id: 2,
        name: "Test User",
      },
    },
  ]);

  // sends a message
  const handleSend = (newMessage = []) => {
    setMessages(GiftedChat.append(messages, newMessage));
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#6646ee",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  }

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon='send-circle' size={32} color='#6646ee' />
        </View>
      </Send>
    );
  }

  const scrollToBottomComponent = () => {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon='chevron-double-down' size={36} color='#6646ee' />
      </View>
    );
  }

  const renderLoading = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#6646ee' />
      </View>
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessage) => handleSend(newMessage)}
      user={{ _id: 1, name: "User Test" }}
      renderBubble={renderBubble}
      placeholder="Type your message here..."
      showUserAvatar
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      renderLoading={renderLoading}
    />
  );
}

const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 8
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

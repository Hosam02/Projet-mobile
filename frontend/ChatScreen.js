import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);

  const handleSend = () => {
    if (inputText.trim() !== '') {
      const newMessage = {
        id: Date.now().toString(),
        text: inputText.trim(),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText('');
    }
  };

  useEffect(() => {
    // Scroll to the end of the chat when new messages are added
    if (messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const renderItem = ({ item }) => {
    if (!item) {
      return null;
    }

    return (
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  const keyExtractor = (item) => item?.id || '';

  return (
    <View style={styles.container}>
      {messages.length > 0 && (
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ref={flatListRef}
          contentContainerStyle={styles.messagesContainer}
          onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
        />
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSend}
          blurOnSubmit={false}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  messagesContainer: {
    flexGrow: 1,
  },
  messageContainer: {
    backgroundColor: '#e1e1e1',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#0A4C92',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChatScreen;

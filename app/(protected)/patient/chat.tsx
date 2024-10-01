import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';

// Define a type for a chat message
type MessageType = {
  id: string;
  text: string;
  sender: 'doctor' | 'patient';
  timestamp: string;
};

const Chat = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      const timestamp = new Date().toLocaleTimeString();
      setMessages([...messages, { id: Date.now().toString(), text: newMessage, sender: 'patient', timestamp }]);
      setNewMessage('');
    }
  };

  const renderMessage = ({ item }: { item: MessageType }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === 'doctor' ? styles.doctorBubble : styles.patientBubble,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header Section with Profile, Doctor Name, and Call Option */}
      <View style={styles.header}>
        <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.profileIcon} />
        <Text style={styles.doctorName}>Dr. John Doe</Text>
        <TouchableOpacity style={styles.callButton}>
          <Text style={styles.callButtonText}>Call</Text>
        </TouchableOpacity>
      </View>

      {/* Chat Message List */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messageList}
      />

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
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
    backgroundColor: '#f0f0f0',
  },
  // Header styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  doctorName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  callButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  callButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  messageList: {
    paddingHorizontal: 10,
    flexGrow: 1,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
  },
  doctorBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#e1e1e1',
  },
  patientBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  timestamp: {
    fontSize: 10,
    color: '#aaa',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Chat;

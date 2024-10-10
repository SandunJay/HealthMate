import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';

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
      {/* Header Section */}
      <View style={styles.header}>
        <Image source={{ uri: 'https://img.freepik.com/premium-photo/portrait-smiling-young-asian-female-doctor-with-stethoscope_943657-322.jpg' }} style={styles.profileIcon} />
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
    backgroundColor: '#fff', // Set background to white
  },
  // Header styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#199A8E', // Updated to use main color as background
    borderBottomWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  profileIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 12,
  },
  doctorName: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', // Text color is white
  },
  callButton: {
    backgroundColor: '#fff', // Button background is white
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    shadowColor: '#199A8E', // Shadow uses the main color
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  callButtonText: {
    color: '#199A8E', // Text on the button uses the main color
    fontWeight: '600',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 15,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  doctorBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff', // Doctor's message bubble is white
  },
  patientBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#199A8E', // Patient's message bubble uses the main color
  },
  messageText: {
    color: '#fff', // Message text is white
    fontSize: 16,
  },
  timestamp: {
    fontSize: 10,
    color: '#ccc',
    marginTop: 4,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff', // Input section background is white
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Text input background
    borderRadius: 20,
    padding: 12,
    marginRight: 10,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  sendButton: {
    backgroundColor: '#199A8E', // Send button background uses the main color
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#199A8E', // Send button shadow also uses the main color
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  sendButtonText: {
    color: '#fff', // Send button text is white
    fontWeight: '600',
  },
});


export default Chat;

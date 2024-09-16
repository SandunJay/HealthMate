import { Modal } from 'react-native';
import ItemForm from './new';
import { Stack } from 'expo-router';

const NewRecordModal = () => {
  return (
    <Modal
      transparent
      visible={true}
      animationType="slide"
    >
        <Stack.Screen options={{headerShown:false}}/>
      <ItemForm />
    </Modal>
  );
};

export default NewRecordModal;

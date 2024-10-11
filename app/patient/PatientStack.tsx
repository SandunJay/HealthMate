// app/(protected)/patient/PatientStack.tsx
import { createStackNavigator } from '@react-navigation/stack';
//ts-ignore
import Appointment from './Appointment';
import AppointmentForm from './AppointmentForm';
import AppointmentItem from './AppointmentItem';
import AppointmentHistory from './AppointmentHistory';
const Stack = createStackNavigator();

export default function PatientStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Appointment" component={Appointment} options={{ title: 'Appointments' }} />
      <Stack.Screen name="AppointmentForm" component={AppointmentForm} options={{ title: 'New Appointment' }} />
      <Stack.Screen name="AppointmentItem" component={AppointmentItem} />
      <Stack.Screen name="AppointmentHistory" component={AppointmentHistory} />
    </Stack.Navigator>
  );
}

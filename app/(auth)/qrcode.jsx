import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import QRcodeGenarator from "../../components/QRcodeGenarator";
import { useGlobalContext } from "../../context/GlobalProvider";

const Qrcode = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  console.log(user);
  return (
    <SafeAreaView>
      <View>
        <Text>Profile Page</Text>
        <Text>Hello {user?.accountId}</Text>
        {<QRcodeGenarator value={user.accountId} />}
      </View>
    </SafeAreaView>
  );
};

export default Qrcode;

const styles = StyleSheet.create({});

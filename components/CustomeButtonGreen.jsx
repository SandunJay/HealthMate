import { Text, View, TouchableOpacity } from "react-native";
import React from "react";

const CustomButtonGreen = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-primary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-white font-psemibold text-lg ${textStyles} `}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButtonGreen;

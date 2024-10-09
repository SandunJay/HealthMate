/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { StyleSheet } from "react-native";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";


export const Colors = {
  main: {
    white: '#FFFFFF',
    primary: '#45484A',
    secondary: '#AEB5BB',
    gray: '#D9D9D9',
    nav: '#B5CFB7'
  },
  light: {
    text: '#11181C',
    background: '#edffe8',
    tint: '#ECEDEE',
    icon: '#687076',
    tabIconDefault: '#99BC85',
    tabIconSelected: '#789461',
    text1: '#184001', // new color
    background1: '#EBF2B3', // new color
    tint1: "#EEEDEB", // new color
    icon1: '#3B7302', // new color
    tabIconDefault1: '#9BBF65', // new color
    tabIconSelected1: '#184001', // new color
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: "#f2f2f2",
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: "#35374B",
    text1: '#EBF2B3', // new color
    background1: '#184001', // new color
    tint1: "#E5E1DA", // new color
    icon1: '#9BBF65', // new color
    tabIconDefault1: '#3B7302', // new color
    tabIconSelected1: "#686D76", // new color
  },
  glassBg: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)', 
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  glassOly: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',  
    zIndex: -1, 
  },
};

export const theme = {
  bg: (opacity: any) => `rgba(234, 88, 12 ${opacity})`,
  text: '#f97316'
}

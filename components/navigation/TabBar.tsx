// import React from 'react'
// import { View, StyleSheet } from 'react-native'
// import TabBarButton from './TabBarButton'
// import { Colors } from '@/constants/Colors'
// import { useGlobalContext } from '@/context/GlobalProvider'

// const TabBar = ({ state, descriptors, navigation }) => {
//   const { isDarkMode } = useGlobalContext()

//   const styles = StyleSheet.create({
//     tabbar: {
//       position: 'absolute',
//       bottom: 25,
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.75)',
//       marginHorizontal: 20,
//       paddingVertical: 15,
//       borderRadius: 25,
//       borderWidth: 1,
//       borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.3)',
//       shadowColor: isDarkMode ? 'white' : 'black',
//       shadowOffset: { width: 0, height: 10 },
//       shadowRadius: 10,
//       shadowOpacity: 0.1,
//     },
//     overlay: {
//       ...StyleSheet.absoluteFillObject,
//       backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
//       borderRadius: 25,
//       borderWidth: 1,
//       borderColor: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)',
//       zIndex: -1,
//     },
//   })

//   const primaryColor = isDarkMode ? Colors.dark.primary : Colors.light.tabIconDefault1
//   const greyColor = isDarkMode ? Colors.dark.textSecondary : Colors.light.tint1

//   return (
//     <View>
//       <View style={styles.overlay} />
//       <View style={styles.tabbar}>
//         {state.routes.map((route, index) => {
//           const { options } = descriptors[route.key]
//           const label =
//             options.tabBarLabel !== undefined
//               ? options.tabBarLabel
//               : options.title !== undefined
//               ? options.title
//               : route.name

//           if (['_sitemap', '+not-found'].includes(route.name)) return null

//           const isFocused = state.index === index

//           const onPress = () => {
//             const event = navigation.emit({
//               type: 'tabPress',
//               target: route.key,
//               canPreventDefault: true,
//             })

//             if (!isFocused && !event.defaultPrevented) {
//               navigation.navigate(route.name, route.params)
//             }
//           }

//           const onLongPress = () => {
//             navigation.emit({
//               type: 'tabLongPress',
//               target: route.key,
//             })
//           }

//           return (
//             <TabBarButton
//               key={route.name}
//               onPress={onPress}
//               onLongPress={onLongPress}
//               isFocused={isFocused}
//               routeName={route.name}
//               color={isFocused ? primaryColor : greyColor}
//               label={label}
//               isDarkMode={isDarkMode}
//             />
//           )
//         })}
//       </View>
//     </View>
//   )
// }

// export default TabBar

import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import TabBarButton from './TabBarButton'
import { Colors } from '@/constants/Colors'
import { useGlobalContext } from '@/context/GlobalProvider'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'

interface TabBarButtonSkeletonProps {
  isDarkMode: boolean
}

const TabBarButtonSkeleton: React.FC<TabBarButtonSkeletonProps> = ({ isDarkMode }) => {
  const pulseAnim = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: false }),
        Animated.timing(pulseAnim, { toValue: 0, duration: 1000, useNativeDriver: false })
      ])
    )
    pulse.start()
    return () => pulse.stop()
  }, [])

  const backgroundColor = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)', isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)']
  })

  return (
    <Animated.View style={{
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor,
      marginHorizontal: 10
    }} />
  )
}

const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const { isDarkMode } = useGlobalContext()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Match this with the Home component's loading duration

    return () => clearTimeout(timer)
  }, [])

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 25,
      left: 20,
      right: 20,
    },
    tabbar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.75)',
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 25,
      borderWidth: 1,
      borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.3)',
      shadowColor: isDarkMode ? 'white' : 'black',
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 10,
      shadowOpacity: 0.1,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
      borderRadius: 25,
      borderWidth: 1,
      borderColor: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)',
      zIndex: -1,
    },
    skeletonTabbar: {
      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
    },
  })

  const primaryColor = isDarkMode ? Colors.dark.tabIconDefault1 : Colors.light.tabIconDefault1
  const greyColor = isDarkMode ? Colors.dark.textSecondary : Colors.light.tint1

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.overlay} />
        <View style={[styles.tabbar, styles.skeletonTabbar]}>
          {state.routes.map((route, index) => {
            if (['_sitemap', '+not-found'].includes(route.name)) return null
            return <TabBarButtonSkeleton key={index} isDarkMode={isDarkMode} />
          })}
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.overlay} />
      <View style={styles.tabbar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name

          if (['_sitemap', '+not-found'].includes(route.name)) return null

          const isFocused = state.index === index

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params)
            }
          }

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            })
          }

          return (
            <TabBarButton
              key={route.name}
              onPress={onPress}
              onLongPress={onLongPress}
              isFocused={isFocused}
              routeName={route.name}
              color={isFocused ? primaryColor : greyColor}
              label={label}
              isDarkMode={isDarkMode}
            />
          )
        })}
      </View>
    </View>
  )
}

export default TabBar
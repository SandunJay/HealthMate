import React from "react"
import { Text, View, StyleSheet } from "react-native"
import { PieChart } from "react-native-gifted-charts"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import { Colors } from "@/constants/Colors"

const PieChartComp = ({ isDarkMode } : {isDarkMode: any}) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background,
    },
    title: {
      fontFamily: 'sans-serif',
      color: isDarkMode ? Colors.dark.text : Colors.light.icon1,
      fontSize: 16,
      fontWeight: 'bold',
      paddingLeft: wp('5%'),
      paddingTop: wp('2%'),
    },
    chartContainer: {
      margin: 20,
      padding: 16,
      borderRadius: 20,
      backgroundColor: isDarkMode ? Colors.dark.cardBackground : Colors.light.tint,
    },
    legendText: {
      color: isDarkMode ? Colors.dark.text : Colors.main.primary,
    },
    legendContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 10,
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      width: 120,
      marginRight: 20,
    },
    legendDot: {
      height: 10,
      width: 10,
      borderRadius: 5,
      marginRight: 10,
    },
  })

  const pieData = [
    {
      value: 81,
      color: Colors.light.tabIconDefault1,
      gradientCenterColor: Colors.light.background,
      focused: true,
    },
    {value: 10, color: Colors.light.tabIconSelected, gradientCenterColor: '#3BE9DE'},
    {value: 6, color:  Colors.light.icon1, gradientCenterColor: '#8F80F3'},
    {value: 3, color: Colors.light.tabIconSelected1, gradientCenterColor: '#FF7F97'},
  ]

  const renderDot = (color : any) => {
    return (
      <View
        style={[styles.legendDot, { backgroundColor: color }]}
      />
    )
  }

  const renderLegendComponent = () => {
    return (
      <>
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            {renderDot(Colors.light.tabIconDefault1)}
            <Text style={styles.legendText}>Dispensed: 81%</Text>
          </View>
          <View style={styles.legendItem}>
            {renderDot(Colors.light.icon1)}
            <Text style={styles.legendText}>Rejected: 6%</Text>
          </View>
        </View>
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            {renderDot(Colors.light.tabIconSelected)}
            <Text style={styles.legendText}>Pending: 10%</Text>
          </View>
          <View style={styles.legendItem}>
            {renderDot(Colors.light.tabIconSelected1)}
            <Text style={styles.legendText}>Other: 3%</Text>
          </View>
        </View>
      </>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Performance</Text>
      <View style={styles.chartContainer}>
        <View style={{ padding: 20, alignItems: 'center' }}>
          <PieChart
            data={pieData}
            donut
            showGradient
            sectionAutoFocus
            radius={90}
            innerRadius={60}
            innerCircleColor={isDarkMode ? Colors.dark.background : Colors.light.tabIconDefault}
            centerLabelComponent={() => {
              return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 22, color: isDarkMode ? Colors.dark.text : 'white', fontWeight: 'bold' }}>
                    47%
                  </Text>
                  <Text style={{ fontSize: 14, color: isDarkMode ? Colors.dark.textSecondary : 'white' }}>Excellent</Text>
                </View>
              )
            }}
          />
        </View>
        {renderLegendComponent()}
      </View>
    </View>
  )
}

export default PieChartComp
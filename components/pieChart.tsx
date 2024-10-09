import { Colors } from "@/constants/Colors";
import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { widthPercentageToDP } from "react-native-responsive-screen";

const PieChartComp = () => {
  const pieData = [
  {
    value: 81,
    color: Colors.light.tabIconDefault1,
    gradientCenterColor: Colors.light.background,
    focused: true,
  },
  {value: 10, color: Colors.light.tabIconSelected, gradientCenterColor: '#3BE9DE'},
  {value: 6, color: Colors.light.icon1, gradientCenterColor: '#8F80F3'},
  {value: 3, color: Colors.light.tabIconSelected1, gradientCenterColor: '#FF7F97'},
];

const renderDot = (color:any) => {
  return (
    <View
      style={{
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: color,
        marginRight: 10,
      }}
    />
  );
};

const renderLegendComponent = () => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 120,
            marginRight: 20,
          }}>
          {renderDot(Colors.light.tabIconDefault1)}
          <Text style={{color: Colors.main.primary}}>Dispensed: 81%</Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
          {renderDot(Colors.light.icon1)}
          <Text style={{color: Colors.main.primary}}>Rejected: 6%</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 120,
            marginRight: 20,
          }}>
          {renderDot(Colors.light.tabIconSelected)}
          <Text style={{color: Colors.main.primary}}>Pending: 10%</Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
          {renderDot(Colors.light.tabIconSelected1)}
          <Text style={{color: Colors.main.primary}}>Other: 3%</Text>
        </View>
      </View>
    </>
  );
};

return (
  <View
    style={{
      flex: 1,
    }}>
    <Text style={{fontFamily: 'sans-serif',color: Colors.light.icon1, fontSize: 16, fontWeight: 'bold',
        paddingLeft: widthPercentageToDP('5%'), paddingTop: widthPercentageToDP('2%')

    }}>
        Performance
      </Text>
    <View
      style={{
        margin: 20,
        padding: 16,
        borderRadius: 20,
        backgroundColor: Colors.light.tint,
      }}>
      <View style={{padding: 20, alignItems: 'center'}}>
        <PieChart
          data={pieData}
          donut
          showGradient
          sectionAutoFocus
          radius={90}
          innerRadius={60}
          innerCircleColor={Colors.light.tabIconDefault}
          centerLabelComponent={() => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
                  47%
                </Text>
                <Text style={{fontSize: 14, color: 'white'}}>Excellent</Text>
              </View>
            );
          }}
        />
      </View>
      {renderLegendComponent()}
    </View>
  </View>);
}

export default PieChartComp;
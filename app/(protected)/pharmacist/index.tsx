import React from 'react'
import { Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import { PhoneIcon } from 'react-native-heroicons/outline'
import { BellAlertIcon } from 'react-native-heroicons/outline'
import { InboxIcon } from 'react-native-heroicons/solid'
import CategoryCard from '@/components/CategoryCard';
import SortCategoryCard from '@/components/SortCategoryCard';
import Destination from '@/components/DestinationComp';
import PieChartComp  from '@/components/pieChart'

const ios = Platform.OS==='ios';
const topMargin= ios? 'mt-3' : 'mt-10';
const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView className={"space-y-6"+topMargin} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.greetingText}>Hi, Jonathan</Text>
              <Text style={styles.subText}>May you always be healthy</Text>
            </View>
            <View style={styles.headerIcons}>
              <TouchableOpacity>
                <BellAlertIcon size={25} strokeWidth={1} color={"gray"} style={styles.icon}/>
              </TouchableOpacity>
              <TouchableOpacity>
                <PhoneIcon size={25} strokeWidth={1} color={"gray"}  style={styles.icon}/>
              </TouchableOpacity>
              <TouchableOpacity>
                  <InboxIcon size={25} strokeWidth={1} color={"gray"}  style={styles.icon}/>
              </TouchableOpacity>
            </View>
          </View>

          {/* Search bar */}
          <View className='mx-5 mb-4'>
            <View className="flex-row items-center bg-neutral-100 rounded-full p-4 space-x-2 pl-6">
              <MagnifyingGlassIcon size={20} strokeWidth={3} color={"gray"}/>
              <TextInput
                placeholder="Search"
                placeholderTextColor={'gray'}
                className="flex-1 text-base mb-1 pl-1 tracking-wider"
                style={{fontSize: wp(4), width: wp(80)}}
              />
            </View>
          </View>

          {/* Categories */}
          <View className={'mt-4'}>
            <CategoryCard/>
          </View>

          {/* Soft categories */}
          <View className='mb-4'>
            <SortCategoryCard/>
          </View>

          {/* Destination */}
          <View>
            <Destination/>
          </View>

          <View>
            <PieChartComp/>
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8EFD3',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('3%'),
    marginBottom: hp('2%'),
  },
  profileImage: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    left:wp('6%')

  },
  greetingText: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
  },
  subText: {
    fontSize: wp('3.5%'),
    color: '#777',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    fontSize: wp('6%'),
    marginHorizontal: wp('2%'),
  }
});
export default Home
import React from 'react'
import { Image, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import CategoryCard from '@/components/CategoryCard';
import SortCategoryCard from '@/components/SortCategoryCard';
import Destination from '@/components/DestinationComp';

const ios = Platform.OS==='ios';
const topMargin= ios? 'mt-3' : 'mt-10';
const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-slate-120">
      <ScrollView className={"space-y-6"+topMargin} >

          {/* AVATAR */}
          <View className="mx-5 flex-row justify-between items-center mb-10">
            <Text style={{fontSize: wp(7)}} className="font-bold text-neutral-700"> Lets' Discover</Text>
            <TouchableOpacity>
              <Image
                source={require('@/assets/images/react-logo.png')}
                style={{height:hp(12), width: wp(12)}}
              />
            </TouchableOpacity>
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
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
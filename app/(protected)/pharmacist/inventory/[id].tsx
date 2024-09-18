// import React, { useState } from 'react';
// import { View, Text, Image,SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { StatusBar } from 'expo-status-bar';
// import { ChevronLeftIcon, ClockIcon, HeartIcon } from 'react-native-heroicons/solid';
// import { theme } from '@/constants/Colors';
// import { destinationData } from '@/assets/dummy';


// const InventoryItem = () => {
//   const { id } = useLocalSearchParams(); 
//   const router = useRouter();
//   const item = destinationData.find(d => d.id === Number(id)); 


//   if (!item) {
//     return <Text>Item not found</Text>;
//   }
//   const [isFavourite, toggleFavourite] = useState(false)

//   return (
//     <View className='bg-white flex-1'>
//       <Image
//         source={item.image}
//         style={{width: wp(100), height: hp(55)}}
//       />
//       <StatusBar style='light' />

//       {/* back button */}
//       <SafeAreaView className='flex-row justify-between items-center w-full absolute'>
//         <TouchableOpacity
//           onPress={() => router.back()}
//           className='p-2 rounded-full ml-4'
//           style={{backgroundColor: 'rgba(255,255,255,0.5)'}}
//         >
//           <ChevronLeftIcon size={wp(7)} color='white' strokeWidth={4}/>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => toggleFavourite(!isFavourite)}
//           className='p-2 rounded-full mr-4'
//           style={{backgroundColor: 'rgba(255,255,255,0.5)'}}
//         >
//           <HeartIcon size={wp(7)} color={isFavourite? 'red':'white'} strokeWidth={4}/>
//         </TouchableOpacity>
//       </SafeAreaView>

//       {/* Title description and button */}
//       <View style={{borderTopLeftRadius: 40, borderTopRightRadius: 40}} className="px-5 flex flex-1 justify-between bg-white pt-8 -mt-14">
//         <ScrollView showsVerticalScrollIndicator={false} className="space-y-5">
//           <View className="flex-row jsutify-between items-start">
//             <Text style={{fontSize: wp(7)}} className="font-bold flex-1 text-neutral-700">
//               {item.title}
//             </Text>
//             <Text style={{fontSize: wp(7), color:theme.text}} className="font-semibold">
//               ${item.price}
//             </Text>
//           </View>
//           <Text style={{fontSize: wp(3.7)}} className='text-neutral-700 tracking-wider mb-2'>
//             {item.longDescription}
//           </Text>
//           <View className="flex-row justify-between mx-1">
//             <View className='flex-row space-x-2 items-start'>
//               <ClockIcon size={wp(7)} color={'skyblue'}/>
//               <View className="flex space-y-2">
//                 <Text style={{fontSize: wp(4.5)}} className='font-bold text-neutral-700'>{item.duration}</Text>
//                 <Text className="text-neutral-600 tracking-wide">Duration</Text>
//               </View>
//             </View>
//             <View className='flex-row space-x-2 items-start'>
//               <ClockIcon size={wp(7)} color={'skyblue'}/>
//               <View className="flex space-y-2">
//                 <Text style={{fontSize: wp(4.5)}} className='font-bold text-neutral-700'>{item.duration}</Text>
//                 <Text className="text-neutral-600 tracking-wide">Duration</Text>
//               </View>
//             </View>
//             <View className='flex-row space-x-2 items-start'>
//               <ClockIcon size={wp(7)} color={'skyblue'}/>
//               <View className="flex space-y-2">
//                 <Text style={{fontSize: wp(4.5)}} className='font-bold text-neutral-700'>{item.duration}</Text>
//                 <Text className="text-neutral-600 tracking-wide">Duration</Text>
//               </View>
//             </View>
//           </View>
//         </ScrollView>
//         <TouchableOpacity style={{backgroundColor:theme.bg(0.7), height: wp(15), width: wp(50) }} className="mb-6 mx-auto flex justify-center items-center rounded-full">
//           <Text  className="text-white font-bold" style={{fontSize: wp(5.5)}}>Book now</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// export default InventoryItem;


import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import QRCode from 'react-native-qrcode-svg'; // QR code generator
import { InventoryItem as ItemType } from '@/assets/types';
import { inventoryData } from '@/assets/dummy';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

const InventoryItem = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const item: ItemType | undefined = inventoryData.find((data) => data.id === id);

  useEffect(() => {
    if (!item) {
      Alert.alert('Item Not Found', 'The selected item does not exist.', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    }
  }, [item]);

  if (!item) {
    return null;
  }

  // const renderOrderItem = ({ item }:{item: ItemType}) => (
  //   <View style={styles.orderItem}>
  //     <View style={styles.orderDetails}>
  //       <Text style={styles.orderAmount}>{item.amount}</Text>
  //       <Text style={styles.orderNumber}>{item.sku}</Text>
  //       <Text style={styles.orderCustomer}>{item.customer}</Text>
  //     </View>
  //     <Icon name="chevron-forward" size={hp('3%')} color="#9CA3AF" />
  //   </View>
  // );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{headerShown:false}}/>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={hp('3%')} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{item.name}</Text>
      </View>

      {/* Add Stock Button */}
      <TouchableOpacity style={styles.addStockButton}>
        <Text style={styles.addStockButtonText}>+ Add Stock</Text>
      </TouchableOpacity>

      {/* Product Details */}
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>ID</Text>
        <Text style={styles.detailValue}>{item.id}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Category</Text>
        <Text style={styles.detailValue}>{item.category}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Quantity</Text>
        <Text style={styles.detailValue}>{item.quantity} units</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Expiration</Text>
        <Text style={styles.detailValue}>5/25/2025</Text>
      </View>

      {/* Supplier Section */}
      <TouchableOpacity style={styles.supplierContainer}>
        <Text style={styles.supplierLabel}>Manufacturer</Text>
        <Text style={styles.supplierName}>{item.manufacturer}</Text>
        <Icon name="chevron-forward" size={hp('3%')} color="#9CA3AF" />
      </TouchableOpacity>

      {/* QR Code */}
      <View style={styles.barcodeContainer}>
        <QRCode value={item.sku} size={150} />
        <Text style={styles.barcodeText}>{item.sku}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  headerText: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    marginLeft: wp('4%'),
  },
  addStockButton: {
    backgroundColor: '#374151',
    paddingVertical: hp('1%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  addStockButtonText: {
    color: '#fff',
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp('0.8%'),
  },
  detailLabel: {
    color: '#6B7280',
    fontSize: hp('2%'),
  },
  detailValue: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  supplierContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: hp('2%'),
    borderRadius: wp('2%'),
    marginVertical: hp('2%'),
  },
  supplierLabel: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  supplierName: {
    color: '#6B7280',
    fontSize: hp('2%'),
  },
  barcodeContainer: {
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  barcodeText: {
    fontSize: hp('2%'),
    marginTop: hp('1%'),
  },
  recentOrdersTitle: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    marginVertical: hp('2%'),
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('1.5%'),
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  orderDetails: {
    flex: 1,
  },
  orderAmount: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  orderNumber: {
    fontSize: hp('2%'),
    color: '#6B7280',
  },
  orderCustomer: {
    fontSize: hp('1.8%'),
    color: '#9CA3AF',
  },
  listContent: {
    paddingBottom: hp('10%'),
  },
});

export default InventoryItem;

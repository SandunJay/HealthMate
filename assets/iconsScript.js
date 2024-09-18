import { AntDesign, Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

export const icons = {
    index: (props)=> <AntDesign name="home" size={26} {...props} />,
    // explore: (props)=> <Feather name="compass" size={26} {...props} />,
    // create: (props)=> <AntDesign name="pluscircleo" size={26} {...props} />,
    profile: (props)=> <AntDesign name="user" size={26} {...props} />,
    inventory: (props)=> <MaterialCommunityIcons name="warehouse" size={26} {...props} />,
    records: (props)=> <MaterialCommunityIcons name="bookshelf" size={26} {...props} />,
    scanner: (props)=> <AntDesign name="scan1" size={26} {...props} />,
    default: (props) => <Feather name="alert-circle" size={26} {...props} />,

}
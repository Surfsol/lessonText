import { Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;

const wp = (param: number) => param * (deviceWidth / 100);

export { wp };
import { Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  // const user = true;
  // const justInstalled = false;

  // if (!user && justInstalled) {
  //   return <Redirect href="onboarding/onboarding1" />;
  // } else if (!user) {
  //   return <Redirect href="/auth/LoginScreen" />;
  // } else {
  return <Redirect href="/onboarding/welcome" />;
  // }
}

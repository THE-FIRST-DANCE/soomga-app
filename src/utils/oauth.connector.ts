import { API_URL } from "@env";
import { useNavigation } from "@react-navigation/native";

type OAuthProvider = "google" | "line";

export function onOAuthConnect(provider: OAuthProvider, redirectUrl?: string) {
  const navigation = useNavigation();
}

export function onGoogleLogin(redirectUrl?: string) {
  onOAuthConnect("google", redirectUrl);
}

export function onLineLogin(redirectUrl?: string) {
  onOAuthConnect("line", redirectUrl);
}

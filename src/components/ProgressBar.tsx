import Colors from "@/modules/Color";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

interface ProgressBarProps {
  totalStep: number;
  currentStep: number;
}

export const ProgressBar = ({ totalStep, currentStep }: ProgressBarProps) => {
  const loaderValue = useRef(new Animated.Value(0)).current;

  const load = (step: number) => {
    if (totalStep !== 0) {
      const calculatedValue = (step / totalStep) * 100;

      Animated.timing(loaderValue, {
        toValue: calculatedValue,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  };

  const width = loaderValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  useEffect(() => {
    load(currentStep);
  }, [currentStep]);

  return (
    <View>
      <View style={styles.bar}>
        <Animated.View
          style={{
            width,
            height: 3,
            backgroundColor: Colors.PRIMARY,
            borderTopRightRadius: 2,
            borderBottomRightRadius: 2,
          }}
        />
      </View>
      <Text style={styles.step}>
        {currentStep}/{totalStep}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    width: "100%",
    height: 2,
    backgroundColor: "#f0f0f0",
  },
  step: {
    color: Colors.GRAY_DARK,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
});

import { Slider } from "@miblanchard/react-native-slider";
import { View, Text, StyleSheet } from "react-native";
import Colors from "@/modules/Color";

interface SliderProps {
  caption: string;
  minimumValue: number;
  maximumValue: number;
  step: number;
  range: number[];
  setRange: (value: number[]) => void;
}

function SliderComponent({
  caption,
  minimumValue,
  maximumValue,
  step,
  range,
  setRange,
}: SliderProps) {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.caption}>{caption}</Text>
      <View style={styles.sliderContainer}>
        <Text style={{ fontSize: 20 }}>
          {range[0]}　　 ~ 　　 {range[1]}
        </Text>
        <Slider
          containerStyle={{ width: 300 }}
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          value={range}
          onValueChange={setRange}
          step={step}
          thumbTintColor={Colors.BASKETBALL_ORANGE}
          minimumTrackTintColor={Colors.BASKETBALL_ORANGE}
          thumbStyle={{
            backgroundColor: Colors.WHITE,
            elevation: 10,
          }}
        />
      </View>
    </View>
  );
}

export default SliderComponent;

const styles = StyleSheet.create({
  caption: { margin: 5, fontSize: 20, fontWeight: "bold" },
  sliderContainer: {
    height: 100,
    padding: 15,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.GRAY_DARK,
    alignItems: "center",
  },
});

import { View, Text, ImageBackground, StyleSheet } from "react-native";
import Colors from "@/modules/Color";

/* vector-icons */
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

type GuideInfoType = {
  guide: {
    id: number;
    photo: string;
    name: string;
    birthDate: Date;
    gender: string;
    description: string;
    stars: number;
    language: string[];
  };
};

function GuideInfo({ guide }: GuideInfoType) {
  const calculateAgeRange = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    const ageRange =
      age >= 10 && age < 20
        ? "10대"
        : age >= 20 && age < 30
        ? "20대"
        : age >= 30 && age < 40
        ? "30대"
        : age >= 40 && age < 50
        ? "40대"
        : age >= 50 && age < 60
        ? "50대"
        : "60대 이상";

    return ageRange;
  };

  calculateAgeRange(guide.birthDate);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: guide.photo,
        }}
        style={styles.guidePhoto}
        imageStyle={{ borderRadius: 100 }}
      >
        <View
          style={{
            ...styles.gender,
            backgroundColor:
              guide.gender === "M" ? Colors.MALE_BLUE : Colors.FEMALE_PINK,
          }}
        />
      </ImageBackground>
      <View>
        <Text style={{ fontSize: 40 }}>{guide.name}</Text>
        <View style={[styles.rowFlexView, styles.marginRight5]}>
          <View style={[styles.rowFlexView, styles.marginRight5]}>
            <Octicons
              name="person"
              size={24}
              color="black"
              style={styles.marginRight5}
            />
            <Text>{calculateAgeRange(guide.birthDate)}</Text>
          </View>
          <View style={styles.rowFlexView}>
            <MaterialIcons
              name="language"
              size={24}
              color="black"
              style={styles.marginRight5}
            />
            <Text style={{ fontSize: 12, lineHeight: 25 }}>
              {guide.language.join(", ")}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default GuideInfo;

const styles = StyleSheet.create({
  container: { flexDirection: "row", width: "100%", padding: 15 },
  guidePhoto: {
    width: 90,
    height: 90,
    marginHorizontal: 10,
    alignItems: "flex-end",
  },
  gender: {
    width: 20,
    height: 20,
    borderRadius: 100,
    zIndex: 1,
  },
  rowFlexView: {
    flexDirection: "row",
  },
  marginRight5: {
    marginRight: 5,
  },
});

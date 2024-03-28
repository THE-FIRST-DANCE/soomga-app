import Screen from "@/components/Screen";
import FeedItem from "@/components/sos/FeedItem";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/modules/Color";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SosStackParamList } from "@/stacks/SosStack";
import { useQuery } from "@tanstack/react-query";
import { getSos } from "@/api/SosApi";
import { SosType } from "@/interface/Sos";

const SosScreen = () => {
  const [sosList, setSosList] = useState<SosType[]>([]);

  const navigation = useNavigation<NavigationProp<SosStackParamList>>();

  const handleCreate = () => {
    navigation.navigate("SosCreateScreen");
  };

  const { data } = useQuery({
    queryKey: ["sos", 1],
    queryFn: () => getSos(1),
  });

  useEffect(() => {
    if (data) {
      setSosList(data);
    }
  }, [data]);

  return (
    <Screen title="SOS">
      <View style={styles.container}>
        <View style={styles.feedList}>
          <FlatList
            data={sosList}
            renderItem={({ item }) => <FeedItem item={item} />}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

        <TouchableOpacity onPress={handleCreate} style={styles.createButton}>
          <MaterialCommunityIcons
            name="pencil-plus-outline"
            size={24}
            color={Colors.GRAY_DARK}
          />
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default SosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    padding: 20,
  },
  feedList: {
    flex: 1,
    width: "100%",
  },
  createButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY,
  },
});

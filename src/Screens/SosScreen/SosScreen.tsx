// Libraries
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useInfiniteQuery } from "@tanstack/react-query";

// Modules
import Colors from "@/modules/Color";

// API
import { getSos } from "@/api/SosApi";

// Interfaces
import { SosType } from "@/interface/Sos";
import { SosStackParamList } from "@/stacks/SosStack";
import { MainStackParamList } from "@/stacks/MainStack";

// Components
import FeedItem from "@/components/sos/FeedItem";
import Screen from "@/components/Screen";

const SosScreen = () => {
  const [sosList, setSosList] = useState<SosType[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<SosStackParamList>>();
  type SosScreenRouteProp = RouteProp<MainStackParamList, "SosStack">;
  const route = useRoute<SosScreenRouteProp>();
  const cursor = route.params?.cursor;

  const handleCreate = () => {
    navigation.navigate("SosCreateScreen", {});
  };

  const { data, fetchNextPage, hasNextPage, isFetching, refetch } =
    useInfiniteQuery({
      queryKey: ["sos"],
      queryFn: getSos,
      initialPageParam: cursor,
      getNextPageParam: (lastPage) => {
        if (lastPage.nextCursor) {
          return lastPage.nextCursor;
        }
      },
    });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    if (data) {
      const sos = data.pages.flatMap((page) => page.items);

      setSosList(sos);
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
            onEndReached={() => {
              if (hasNextPage) {
                fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.6}
            ListFooterComponent={() => {
              if (isFetching) {
                return <ActivityIndicator />;
              }

              return null;
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
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

// Libraries
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useInfiniteQuery } from "@tanstack/react-query";

// Components
import Screen from "@/components/Screen";
import TouristArticle from "@/components/tourist/TouristArticle";

// Modules
import { Areas } from "@/modules/Area";
import Colors from "@/modules/Color";

// Api
import { getTouristList } from "@/api/TouristApi";

// Interface
import { Tourist } from "@/interface/Tourist";
import React from "react";

const TouristScreen = () => {
  const [areas, setAreas] = useState<number[]>([]);
  const [search, setSearch] = useState<string>("");
  const [boards, setBoards] = useState<Tourist[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleArea = (areaId: number) => {
    if (areas.includes(areaId)) {
      setAreas(areas.filter((item) => item !== areaId));
    } else {
      setAreas([...areas, areaId]);
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetching, refetch } =
    useInfiniteQuery({
      queryKey: ["tourist", { areas }],
      queryFn: ({ pageParam }) => {
        return getTouristList({
          pageParam,
          areas,
        });
      },
      initialPageParam: null,
      getNextPageParam: (lastPage) => {
        if (lastPage.nextCursor) {
          return lastPage.nextCursor;
        }
      },
    });

  const fetchMore = () => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    if (data) {
      const newBoards = data.pages.flatMap((page) => page.items);
      setBoards(newBoards);
    }
  }, [data]);

  const flatListHeader = () => {
    return (
      <>
        <View style={styles.areaSection}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>지역</Text>
          <View style={styles.areas}>
            {Areas.map((area) => (
              <TouchableOpacity
                onPress={() => handleArea(area.id)}
                key={area.id}
                style={[
                  styles.area,
                  {
                    backgroundColor: areas.includes(area.id)
                      ? Colors.PRIMARY
                      : Colors.WHITE,
                  },
                ]}
              >
                <Text style={{ textAlign: "center" }}>{area.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </>
    );
  };

  return (
    <Screen
      right={
        <View style={styles.searchView}>
          <TextInput
            placeholder="검색어를 입력해주세요."
            style={styles.search}
            value={search}
            onChangeText={setSearch}
          />
          <AntDesign
            style={{
              position: "absolute",
              right: 10,
            }}
            name="search1"
            size={20}
            color="black"
          />
        </View>
      }
    >
      <View style={styles.container}>
        {/* 게시글 */}
        <View style={styles.articles}>
          <FlatList
            data={boards}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <TouristArticle item={item} />}
            onEndReached={fetchMore}
            onEndReachedThreshold={0.5}
            ListHeaderComponent={flatListHeader}
            ListFooterComponent={() => {
              if (isFetching) {
                return <ActivityIndicator />;
              }

              return null;
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Screen>
  );
};

export default TouristScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  areaSection: {
    marginBottom: 15,
  },
  areas: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
    marginTop: 10,
  },
  area: {
    padding: 7,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.WHITE,
  },
  tabs: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 15,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  tabText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  articles: {
    flexDirection: "column",
    gap: 15,
  },
  searchView: {
    position: "absolute",
    right: 20,
    width: 300,
    flexDirection: "row",
    alignItems: "center",
  },
  search: {
    width: "100%",
    height: 40,
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
  },
});

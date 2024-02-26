import { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";

/* vector-icons */
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

/* props */
type highlightSearchTextType = {
  (text: string, search: string): React.ReactElement;
};

function Search() {
  /* 검색어 */
  const [searchText, setSearchText] = useState("");

  /* 임시 데이터 : 백엔드 데이터와 연결 필요 */
  const [data, setData] = useState([
    { id: "1", name: "서울", sight: "경복궁" },
    { id: "2", name: "부산", sight: "해운대" },
    { id: "3", name: "대전 대덕구", sight: "동춘당" },
    { id: "4", name: "대전 서구", sight: "대전정부청사" },
    { id: "5", name: "대전 동구", sight: "성심당" },
    { id: "6", name: "인천", sight: "월미도" },
    { id: "7", name: "울산", sight: "울산대공원" },
    { id: "8", name: "광주", sight: "유스퀘어" },
    { id: "9", name: "수원", sight: "수원 화성" },
    { id: "10", name: "청주", sight: "서원대학교" },
  ]);

  /* 검색어와 일치하는 속성 필터링 */
  const filteredData = data.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.sight.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  /* 검색어와 일치하는 부분 하이라이트 효과 */
  const highlightSearchText: highlightSearchTextType = (
    text: string,
    search: string
  ) => {
    const parts = text.split(new RegExp(`(${search})`, "gi"));
    return (
      <Text>
        {parts.map((part: string, index: number) =>
          part.toLowerCase() === search.toLowerCase() ? (
            <Text key={index} style={{ color: "red" }}>
              {part}
            </Text>
          ) : (
            part
          )
        )}
      </Text>
    );
  };

  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.searchBar}>
        <AntDesign
          name="search1"
          size={20}
          color="black"
          style={{ margin: 13 }}
        />
        <TextInput
          placeholder="관광지, 지역 이름으로 검색"
          style={{ margin: 5 }}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        {
          /* 검색어 삭제 버튼 */
          searchText.length !== 0 && (
            <MaterialIcons
              name="cancel"
              size={24}
              color="gray"
              style={styles.cancelButton}
              onPress={() => setSearchText("")}
            />
          )
        }
      </View>
      {
        /* 검색어와 일치하는 데이터 있을 시 검색 결과 표시*/
        searchText.length !== 0 && filteredData.length !== 0 ? (
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.result}>
                <Text>{highlightSearchText(item.name, searchText)} | </Text>
                <Text>{highlightSearchText(item.sight, searchText)}</Text>
              </TouchableOpacity>
            )}
            style={styles.results}
          />
        ) : /* 일치하는 검색어가 없을 경우 검색 결과 없음 표시 */
        filteredData.length == 0 ? (
          <View style={styles.results}>
            <Text style={{ color: "gray" }}>검색 결과가 없습니다.</Text>
          </View>
        ) : null
      }
    </View>
  );
}

export default Search;

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  /* 검색창 스타일 */
  searchBar: {
    width: screenWidth - 20,
    height: 50,
    marginTop: 50,
    borderRadius: 20,
    backgroundColor: "#d0d2d4",
    flexDirection: "row",
  },
  /* 검색어 삭제 버튼 스타일 */
  cancelButton: { position: "absolute", right: 20, top: 13 },
  /* 검색 결과 컨테이너 스타일 */
  results: {
    width: screenWidth - 40,
    padding: 10,
    textAlign: "left",
    borderWidth: 2,
    borderColor: "#DC2626",
    borderRadius: 20,
    backgroundColor: "white",
    position: "absolute",
    top: 100,
    zIndex: 1,
  },
  /* 각 검색 결과 스타일 */
  result: {
    marginVertical: 5,
    flexDirection: "row",
  },
});

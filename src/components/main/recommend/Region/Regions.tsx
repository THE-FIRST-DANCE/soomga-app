import {
  View,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

/* Pages */
import Region from "@regionMain/Region";

function Regions() {
  /* 임시 데이터 */
  const regions = [
    {
      id: 1,
      name: "서울",
      photo:
        "https://cdn.pixabay.com/photo/2015/02/14/08/26/gwanghwamun-636113_1280.jpg",
    },
    {
      id: 2,
      name: "부산",
      photo:
        "https://media.istockphoto.com/id/467652752/ko/%EC%82%AC%EC%A7%84/%EB%B6%80%EC%82%B0-%EB%8F%84%EC%8B%9C.jpg?s=2048x2048&w=is&k=20&c=mecf5lXDl00j14bvovXQC-piKHUfuwF0F0kAgDnk0Y4=",
    },
    {
      id: 3,
      name: "대구",
      photo:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAyMjhfMjA5%2FMDAxNjc3NTc1NzI4NjI5.RVQWAcLzmSMD7SyQ1z7VpuL_IIXrkiecMu60wO4clFUg.E1UwZp61256dDkQB48ltCURI3x8u-kpaYZY6TWuGhPcg.JPEG.mingi60502%2F20230225%25A3%25DF184342.jpg&type=sc960_832",
    },
    {
      id: 4,
      name: "인천",
      photo:
        "https://media.istockphoto.com/id/470125314/ko/%EC%82%AC%EC%A7%84/%EC%86%A1%EB%8F%84-%EA%B3%B5%EC%9B%90-%EB%B0%8F-%ED%95%9C%EA%B5%AD-%EA%B4%80%EA%B5%AC-%EC%9D%B8%EC%B2%9C-%ED%95%9C%EA%B5%AD.jpg?s=2048x2048&w=is&k=20&c=J71FmzRjfnIX98XJkUU7CFa2xwkvhlXMnR5gXJenBKQ=",
    },
    {
      id: 5,
      name: "대전",
      photo:
        "https://media.istockphoto.com/id/1442418904/ko/%EC%82%AC%EC%A7%84/%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD-%EB%8C%80%EC%A0%84%EC%97%90%EC%84%9C-%ED%91%B8%EB%A5%B8-%ED%95%98%EB%8A%98%EC%9D%84-%EB%B0%B0%EA%B2%BD%EC%9C%BC%EB%A1%9C-%ED%95%9C-%EC%97%91%EC%8A%A4%ED%8F%AC-%EB%8B%A4%EB%A6%AC%EC%9D%98-%EC%95%84%EB%A6%84%EB%8B%A4%EC%9A%B4-%EC%82%AC%EC%A7%84.jpg?s=2048x2048&w=is&k=20&c=LHMK__m4KZRHa8QmZ-NizywvfE0vTxSVmCE1WY1tGi8=",
    },
  ];

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>지역 추천</Text>
        <TouchableOpacity style={styles.moreButton}>
          <Text>+ 더보기</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 20 }}
      >
        {regions.map((region) => (
          <Region key={region.id} photo={region.photo} name={region.name} />
        ))}
      </ScrollView>
    </View>
  );
}

export default Regions;

const styles = StyleSheet.create({
  /* 더보기 버튼 스타일 */
  moreButton: {
    marginRight: 10,
    marginTop: 3,
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    borderColor: "#DC2626",
    backgroundColor: "white",
    elevation: 5,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  /* 제목 스타일 */
  title: { fontWeight: "700", fontSize: 25, marginLeft: 5 },
});

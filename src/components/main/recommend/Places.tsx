import { StyleSheet, Dimensions, ScrollView, Alert } from "react-native";

import Place from "./Place";

function Places() {
  /* 임시 데이터 */
  const places = [
    {
      id: 1,
      photo:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEyMjVfNjIg%2FMDAxNzAzNTA0NDUyNTMx.KI5VQZel_r8tMUUI23kkoPwRS5QL4C2K6aGuwAePwZcg.hqXMts-qzUIhP1ylSXI745mL62ZBoKSarmNbQfBCASAg.JPEG.dnjsdlf6072%2F20231224%25A3%25DF203153.jpg&type=sc960_832",
      name: "이월드",
      lat: 35.853355,
      lng: 128.563884,
      distance: 18,
      address: "대구 달서구 두류공원로 200 이월드",
      stars: 4.55,
    },
    {
      id: 2,
      photo:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEyMDhfMTI4%2FMDAxNzAyMDQ2OTgzNjM1.QzoYnDj0ODs2TcvkKSESQShoJAtTK0FKk0l8ukZo0K4g.c2fw7Lnxoh4KwShnRWUW1nDIDuAa_CcghRRe68cLIe8g.JPEG.hj2307%2F20231108_140643.jpg&type=sc960_832",
      name: "수성못",
      lat: 35.826554,
      lng: 128.621862,
      distance: 30,
      address: "대구 수성구 두산동 512",
      stars: 4.52,
    },
    {
      id: 3,
      photo:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA1MjFfMjI0%2FMDAxNjIxNTY5Mjg5OTA5.venyhr5c_DC9seqKqritutOqEP4v2idJpGhLGsWbjFkg.Gs3BLRbk8PDzZfD27nut9ryx4logRp2cDWtLf1mplLEg.JPEG.sh2j0725%2F20210519%25A3%25DF171637.jpg&type=sc960_832",
      name: "대구삼성라이온즈파크",
      lat: 35.841005,
      lng: 128.681996,
      distance: 32,
      address: "대구 수성구 야구전설로 1 대구삼성라이온즈파크",
      stars: 4.52,
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      {places.map((place) => (
        <Place
          key={place.id}
          photo={place.photo}
          name={place.name}
          lat={place.lat}
          lng={place.lng}
          distance={place.distance}
          address={place.address}
          stars={place.stars}
        />
      ))}
    </ScrollView>
  );
}

export default Places;

const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    width: screenWidth - 50,
    padding: 5,
  },
});

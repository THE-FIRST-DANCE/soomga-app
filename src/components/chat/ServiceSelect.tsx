import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ServiceProps } from "./ChatReservationModal";
import { Dispatch, SetStateAction } from "react";
interface ServiceSelectProps {
  services: ServiceProps[];
  handleSelectService: () => void;
  setSelectedService: Dispatch<SetStateAction<ServiceProps>>;
}

function ServiceSelect({
  services,
  handleSelectService,
  setSelectedService,
}: ServiceSelectProps) {
  return (
    <View style={{ marginTop: 20 }}>
      <FlatList
        contentContainerStyle={styles.serviceList}
        data={services}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.service}
            onPress={() => {
              handleSelectService();
              setSelectedService(item);
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                flex: 0.4,
                borderBottomLeftRadius: 10,
                borderTopLeftRadius: 10,
              }}
            />
            <View style={{ flex: 1, padding: 5 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
                <Text style={styles.price}>￦{item.price}</Text>
              </View>
              <Text style={{ fontSize: 10, flexWrap: "wrap", marginTop: 5 }}>
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default ServiceSelect;

const styles = StyleSheet.create({
  serviceList: { gap: 20, marginTop: 10 },
  service: {
    flexDirection: "row",
    width: "100%",
    height: 90,
    borderRadius: 10,
    borderWidth: 0.5,
    overflow: "hidden",
  },
  price: {
    fontSize: 10,
    alignSelf: "flex-end",
    marginLeft: 5,
  },
});

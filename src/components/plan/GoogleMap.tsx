import Colors from "@/modules/Color";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";

interface GoogleMapProps {
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  marker?: {
    lat: number;
    lng: number;
  }[];
  customMarker?: {
    position: {
      lat: number;
      lng: number;
    };
    icon: string;
    title: number;
  }[];
  children?: React.ReactNode;
  setMarker?: (marker: { lat: number; lng: number }[]) => void;
  moveMark?: boolean;
}

const GoogleMap = ({
  center = {
    lat: 37.5,
    lng: 127,
  },
  marker = [],
  customMarker = [],
  setMarker,
  moveMark,
}: GoogleMapProps) => {
  const [region, setRegion] = useState({
    latitude: center.lat,
    longitude: center.lng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markers, setMarkers] = useState(marker);
  const [customMarkers, setCustomMarkers] = useState(customMarker);
  const [polyline, setPolyline] = useState<
    {
      latitude: number;
      longitude: number;
    }[]
  >([]);

  useEffect(() => {
    setRegion({
      ...region,
      latitude: center.lat,
      longitude: center.lng,
    });
  }, [JSON.stringify(center)]);

  useEffect(() => {
    setMarkers(marker);
  }, [JSON.stringify(marker)]);

  useEffect(() => {
    if (
      customMarker.length > 1 &&
      customMarker[0].position.lat ===
        customMarker[customMarker.length - 1].position.lat &&
      customMarker[0].position.lng ===
        customMarker[customMarker.length - 1].position.lng
    ) {
      setCustomMarkers(customMarker.slice(0, customMarker.length - 1));
    } else setCustomMarkers(customMarker);
  }, [JSON.stringify(customMarker)]);

  useEffect(() => {
    setPolyline(
      customMarkers.map((item) => ({
        latitude: item.position.lat,
        longitude: item.position.lng,
      }))
    );
  }, [JSON.stringify(customMarkers)]);

  return (
    <MapView
      style={{ width: "100%", height: "100%", position: "relative" }}
      provider={PROVIDER_GOOGLE}
      region={region}
    >
      {markers.map((m, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: m.lat,
            longitude: m.lng,
          }}
          draggable={moveMark}
          onDragEnd={(e) => {
            setMarkers(
              markers.map((item, i) =>
                i === index
                  ? {
                      lat: e.nativeEvent.coordinate.latitude,
                      lng: e.nativeEvent.coordinate.longitude,
                    }
                  : item
              )
            );
            setMarker &&
              setMarker(
                markers.map((item, i) =>
                  i === index
                    ? {
                        lat: e.nativeEvent.coordinate.latitude,
                        lng: e.nativeEvent.coordinate.longitude,
                      }
                    : item
                )
              );
          }}
        />
      ))}

      {customMarkers.map((item, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: item.position.lat,
            longitude: item.position.lng,
          }}
        >
          <View
            style={{
              position: "relative",
              width: 30,
              height: 30,
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item.icon }}
              style={{ width: "100%", height: "100%", position: "absolute" }}
            />
            <Text style={{ color: Colors.PRIMARY, fontSize: 20 }}>
              {item.title}
            </Text>
          </View>
        </Marker>
      ))}

      <Polyline
        coordinates={polyline}
        strokeWidth={3}
        strokeColor={Colors.DANGER}
      />
    </MapView>
  );
};

export default GoogleMap;

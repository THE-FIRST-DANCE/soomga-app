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
}

const GoogleMap = ({
  center = {
    lat: 37.5,
    lng: 127,
  },
  marker = [],
  customMarker = [],
}: GoogleMapProps) => {
  const [region, setRegion] = useState({
    latitude: center.lat,
    longitude: center.lng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markers, setMarkers] = useState(marker);
  const [customMarkers, setCustomMarkers] = useState(customMarker);

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
    setCustomMarkers(customMarker);
  }, [JSON.stringify(customMarker)]);

  return (
    <MapView
      style={{ width: "100%", height: "100%" }}
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
        />
      ))}

      {customMarkers.slice(0, -1).map((item, index) => (
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
        coordinates={customMarkers.map((item) => ({
          latitude: item.position.lat,
          longitude: item.position.lng,
        }))}
        strokeWidth={3}
        strokeColor={Colors.DANGER}
      />
    </MapView>
  );
};

export default GoogleMap;

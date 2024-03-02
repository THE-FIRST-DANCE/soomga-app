import React, { useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

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
  return (
    <MapView
      style={{ width: "100%", height: "100%" }}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: center.lat,
        longitude: center.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {marker.map((m, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: m.lat,
            longitude: m.lng,
          }}
        />
      ))}
    </MapView>
  );
};

export default GoogleMap;

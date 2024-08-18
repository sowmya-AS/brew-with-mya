import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import styled from "@emotion/native";
import tw from "tailwind-react-native-classnames";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackIcon from "../assets/back.svg";

const HeaderContainer = styled.View<{ insets: any }>`
  ${tw`flex-row items-center bg-white `}
  padding-top: ${({ insets }) => `${insets.top}px`};
  height: 80px; 
`;

const Title = styled.Text`
  ${tw`text-black text-xl font-bold flex-1 text-center`}
`;
const Separator = styled.View`
  ${tw`absolute bottom-0 left-0 w-full`}
  height: 1px;
  background-color: #d1d5db; 
`;
const CustomHeader = ({ title }: { title: string }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();

  const isBackIconVisible =
    route.name !== "Home" &&
    route.name !== "CoffeeTypes" &&
    route.name !== "Overview";

  return (
    <HeaderContainer insets={insets}>
      {isBackIconVisible && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ padding: 8 }}
        >
          <BackIcon width={24} height={24} />
        </TouchableOpacity>
      )}

      <Title>{title}</Title>

      {route.name !== "Home" && <Separator />}
    </HeaderContainer>
  );
};

export default CustomHeader;

import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import styled from "@emotion/native";
import Modal from "react-native-modal"; // Import react-native-modal
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import HomeIcon from "../assets/home.svg";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Container = styled.View`
  ${tw`flex-1 justify-center items-center bg-white`}
`;

const Title = styled.Text`
  ${tw`text-2xl font-bold mb-4`}
`;

const HowItWorks = styled.Text`
  ${tw`text-lg text-blue-400  font-bold underline mt-4`}
`;

const StepText = styled.Text`
  ${tw`text-lg text-black mb-4 `}
`;

const CloseButton = styled.TouchableOpacity`
  ${tw`py-2 px-4  rounded-lg`}
  background-color: #AED7A0;
`;

const CloseButtonText = styled.Text`
  ${tw`text-white text-lg font-bold text-center`}
`;
const ModalContainer = styled.View`
  ${tw`bg-white p-4 rounded-lg justify-center items-center`}
`;

const Home = ({ navigation }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <Container>
      <Title>Welcome to Brew with Mya</Title>
      <Title>Tap the machine to start</Title>

      <TouchableOpacity onPress={() => navigation.navigate("CoffeeTypes")}>
        <HomeIcon />
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleModal}>
        <HowItWorks>How it works</HowItWorks>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <ModalContainer>
          <ScrollView contentContainerStyle={tw`p-4`}>
            <Title>Brew your coffee in 4 simple steps</Title>

            <StepText>1. Select your Coffee Style</StepText>
            <StepText>2. Choose your Coffee Size</StepText>
            <StepText>3. Add Extras (Optional)</StepText>
            <StepText>4. Review and Tap on Brew</StepText>

            <CloseButton onPress={toggleModal}>
              <CloseButtonText>Got it!</CloseButtonText>
            </CloseButton>
          </ScrollView>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

export default Home;

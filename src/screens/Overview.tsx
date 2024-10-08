import React, { useState } from "react";
import {
  View,
  FlatList,
  Alert,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import styled from "@emotion/native";
import tw from "tailwind-react-native-classnames";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import { Video } from "expo-av";
import { setSelectedExtras } from "../redux/coffeeSlice";
import { getSvgIcon, getDisplayName } from "../utils/coffeeUtils";
import CoffeeTypes from "./CoffeeTypes";
import CoffeeSizes from "./CoffeeSizes";
import Extras from "./Extras";
import { CoffeeState, NavigationProp } from "../../types";

const Container = styled.View`
  ${tw`flex-1 bg-white p-4`}
`;

const Card = styled.View`
  ${tw`rounded-lg p-4 `}
  background-color: #AED7A0;
`;

const TileText = styled.Text`
  ${tw`text-white text-lg font-bold ml-2`}
`;

const ExtraText = styled.Text`
  ${tw`text-lg text-white font-semibold ml-2`}
`;

const SubsectionTile = styled.View`
  ${tw`flex-row items-center justify-between px-4 py-2 rounded-lg mt-2 `}
  background-color: #9BC88B;
`;

const SubsectionText = styled.Text`
  ${tw`text-lg text-white ml-2 p-2`}
`;

const Separator = styled.View`
  ${tw`bg-white my-2`}
  height: 0.8px;
`;

const EditableRow = styled.TouchableOpacity`
  ${tw`flex-row items-center justify-between p-4  rounded-lg`}
  background-color: #AED7A0;
`;

const EditText = styled.Text`
  ${tw`text-white text-lg font-semibold`}
`;

const BrewButton = styled.TouchableOpacity`
  ${tw`py-3 px-5 rounded-lg items-center self-center mt-4  w-full`}
  background-color: #AED7A0;
`;

const BrewButtonText = styled.Text`
  ${tw`text-white text-lg font-bold`}
`;

const CancelButton = styled.TouchableOpacity`
  ${tw`py-3 px-5 rounded-lg items-center self-center mt-4 bg-red-500 w-full`}
`;

const CancelButtonText = styled.Text`
  ${tw`text-white text-lg font-bold`}
`;

const HomeText = styled.Text`
  ${tw`text-white text-xl font-bold p-2`}
`;
const Heading = styled.Text`
  ${tw`text-2xl font-bold mb-4`}
  color: black;
  text-align: center;
`;

const BrewedText = styled.Text`
  ${tw`text-xl font-bold self-center m-2 text-black `}
`;
const BrewedButton = styled.TouchableOpacity`
  ${tw`self-center bg-black p-3 rounded-full mt-12 `}
`;

const CloseButton = styled.TouchableOpacity`
  ${tw`self-end`}
`;

const CheckCircle = styled.View`
  ${tw`w-6 h-6 rounded-full items-center justify-center border-2 ml-4`}
  border-color: white;
  background-color: transparent;
`;

const ExtrasContainer = styled.View`
  ${tw`mb-2`}
`;
const ExtrasContent = styled.View`
  ${tw`flex-row items-center p-4`}
`;
const TileContainer = styled.View`
  ${tw`flex-row items-center`}
`;
const ModalView = styled.View`
  ${tw`w-full h-full m-2`}
`;

const EditModalView = styled.View`
  ${tw`h-5/6 bg-white rounded-t-lg p-5`}
`;
const ModifyExtrasView = styled.View`
  ${tw`flex-row justify-between `}
`;

const Overview = ({ navigation }: { navigation: NavigationProp }) => {
  const { selectedType, selectedSize, selectedExtras, types, sizes, extras } =
    useSelector((state: { coffee: CoffeeState }) => state.coffee);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);
  const [brewModalVisible, setBrewModalVisible] = useState(false);
  const [isVideoDone, setIsVideoDone] = useState(false);

  const handleEditPress = (type: string) => {
    setModalType(type);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleBrewPress = () => {
    setBrewModalVisible(true);
  };

  const handleBrewDone = () => {
    setBrewModalVisible(false);
    navigation.navigate("Home");
  };

  const handleClearExtras = () => {
    dispatch(setSelectedExtras([]));
  };

  const handleCancelOrderPress = () => {
    Alert.alert(
      "Cancel Order",
      "Are you sure you want to cancel? You will be directed to the home screen.",
      [
        { text: "No", onPress: () => {}, style: "cancel" },
        { text: "Yes", onPress: () => navigation.navigate("Home") },
      ]
    );
  };

  const type = types.find((t) => t._id === selectedType?._id);
  const size = sizes.find((s) => s._id === selectedSize);
  const selectedExtrasDetails = extras
    .map((extra) => {
      const selectedSubsection = extra.subselections?.find((sub) =>
        selectedExtras.includes(sub._id)
      );
      return selectedSubsection
        ? { extraName: extra.name, subsectionName: selectedSubsection.name }
        : null;
    })
    .filter((detail) => detail !== null);

  const renderExtraItem = ({
    item,
  }: {
    item: { extraName: string; subsectionName: string };
  }) => (
    <ExtrasContainer>
      <ExtrasContent>
        {getSvgIcon(item.extraName)}
        <ExtraText>{getDisplayName(item.extraName)}</ExtraText>
      </ExtrasContent>
      <Separator />
      <SubsectionTile>
        <SubsectionText>{getDisplayName(item.subsectionName)}</SubsectionText>
        <CheckCircle>
          <Icon name="checkmark" size={16} color="white" />
        </CheckCircle>
      </SubsectionTile>
      <Separator />
    </ExtrasContainer>
  );

  const renderModalContent = () => {
    switch (modalType) {
      case "CoffeeTypes":
        return (
          <CoffeeTypes
            navigation={navigation}
            isModal
            closeModal={closeModal}
          />
        );
      case "Sizes":
        return (
          <CoffeeSizes
            navigation={navigation}
            isModal
            closeModal={closeModal}
          />
        );
      case "Extras":
        return (
          <Extras navigation={navigation} isModal closeModal={closeModal} />
        );
      default:
        return null;
    }
  };

  const { width, height } = Dimensions.get("window");
  const videoWidth = width * 1;
  const videoHeight = height * 0.7;

  return (
    <Container>
      <ScrollView>
        <Heading>Your order details</Heading>
        <Card>
          <EditableRow onPress={() => handleEditPress("CoffeeTypes")}>
            <TileContainer>
              {getSvgIcon(type ? type.name : "default")}
              <TileText>{type?.name}</TileText>
            </TileContainer>
            <EditText>Edit</EditText>
          </EditableRow>
          <Separator />

          {selectedSize ? (
            <EditableRow onPress={() => handleEditPress("Sizes")}>
              <TileContainer>
                {getSvgIcon(size ? size.name : "default")}
                <TileText>{size?.name}</TileText>
              </TileContainer>
              <EditText>Edit</EditText>
            </EditableRow>
          ) : (
            <EditableRow onPress={() => handleEditPress("Sizes")}>
              <TileContainer>
                <TileText>Select Size</TileText>
              </TileContainer>
              <EditText>Add</EditText>
            </EditableRow>
          )}
          <Separator />

          {selectedExtrasDetails.length > 0 ? (
            <>
              <FlatList
                data={selectedExtrasDetails}
                renderItem={renderExtraItem}
                keyExtractor={(item, index) => index.toString()}
                scrollEnabled={false}
              />

              <ModifyExtrasView>
                <EditableRow onPress={() => handleEditPress("Extras")}>
                  <ExtraText>Edit Extras</ExtraText>
                </EditableRow>
                <EditableRow onPress={handleClearExtras}>
                  <ExtraText>Clear Extras</ExtraText>
                </EditableRow>
              </ModifyExtrasView>
            </>
          ) : (
            <EditableRow onPress={() => handleEditPress("Extras")}>
              <TileContainer>
                <ExtraText>No Extras</ExtraText>
              </TileContainer>
              <EditText>Add</EditText>
            </EditableRow>
          )}
        </Card>

        <CancelButton onPress={handleCancelOrderPress}>
          <CancelButtonText>Cancel Order</CancelButtonText>
        </CancelButton>

        <BrewButton onPress={handleBrewPress}>
          <BrewButtonText>Brew Your Coffee</BrewButtonText>
        </BrewButton>

        <Modal
          isVisible={modalVisible}
          onBackdropPress={closeModal}
          style={tw`justify-end m-0`}
        >
          <EditModalView>
            <CloseButton onPress={closeModal}>
              <Icon name="close" size={24} color="black" />
            </CloseButton>
            {renderModalContent()}
          </EditModalView>
        </Modal>

        <Modal
          isVisible={brewModalVisible}
          style={tw`justify-center items-center m-0 bg-white`}
        >
          <ModalView>
            <Video
              source={require("../assets/coffee-brewing.mp4")}
              rate={0.7}
              volume={1.0}
              isMuted
              resizeMode="contain"
              shouldPlay
              style={{ width: videoWidth, height: videoHeight }}
              onPlaybackStatusUpdate={(status: any) => {
                if (status.isLoaded && status.didJustFinish) {
                  setIsVideoDone(true);
                }
              }}
            />

            {isVideoDone && (
              <View>
                <BrewedText>Your coffee is perfectly brewed!</BrewedText>
                <BrewedButton onPress={handleBrewDone}>
                  <HomeText>Brew another coffee</HomeText>
                </BrewedButton>
              </View>
            )}
          </ModalView>
        </Modal>
      </ScrollView>
    </Container>
  );
};

export default Overview;

import React, { useState } from "react";
import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import styled from "@emotion/native";
import Icon from "react-native-vector-icons/Ionicons";

import tw from "tailwind-react-native-classnames";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedExtras } from "../redux/coffeeSlice";
import { CoffeeState, Extra, Subsection, NavigationProp } from "../../types";
import { getSvgIcon, getDisplayName } from "../utils/coffeeUtils";
import DownArrowIcon from "../assets/down-arrow.svg";
import UpArrowIcon from "../assets/up-arrow.svg";

const Container = styled.View`
  ${tw`flex-1 bg-white p-4`}
`;

const Heading = styled.Text`
  ${tw`text-2xl font-bold mb-4`}
  color: black;
  text-align: center;
`;

const ExtraButton = styled.TouchableOpacity`
  ${tw`rounded-lg shadow-lg p-4 mb-4`}
  background-color: #AED7A0;
`;

const ExtraTextContainer = styled.View`
  ${tw`justify-between flex-row items-center mb-2 `}
`;

const ExtraTextLeft = styled.View`
  ${tw`flex-row items-center`}
`;

const SubsectionContainer = styled.View`
  ${tw`flex-row items-center justify-between m-2 rounded-lg p-2`}
  background-color: #9BC88B;
`;

const ExtraText = styled.Text`
  ${tw`text-lg text-white font-semibold ml-2`}
`;

const SubsectionText = styled.Text`
  ${tw`text-lg text-white ml-2 py-2`}
`;



const CheckCircle = styled.View`
  ${tw`w-6 h-6 rounded-full items-center justify-center border-2 ml-4`}
  border-color: white;
  background-color: transparent;
`;

const Separator = styled.View`
  ${tw`bg-white my-2`}
  height: 0.8px;
`;

const ReviewButton = styled.TouchableOpacity`
  ${tw`rounded-lg py-3 px-5 mb-8 w-full `}
  background-color: #AED7A0;
  align-self: center;
`;

const ReviewButtonText = styled.Text`
  ${tw`text-white text-lg text-center font-bold `}
`;

const ClearExtrasButton = styled.TouchableOpacity`
  ${tw`rounded-lg py-3 px-5 mb-4 w-full`}
  background-color: #AED7A0;
  align-self: center;
`;

const ClearExtrasButtonText = styled.Text`
  ${tw`text-white text-lg text-center font-bold`}
`;

const Extras = ({
  navigation,
  isModal = false,
  closeModal,
}: {
  navigation: NavigationProp;
  isModal?: boolean;
  closeModal?: () => void;
}) => {
  const dispatch = useDispatch();

  const extras = useSelector(
    (state: { coffee: CoffeeState }) => state.coffee.extras
  );
  const selectedExtras = useSelector(
    (state: { coffee: CoffeeState }) => state.coffee.selectedExtras
  );

  const [expandedExtraId, setExpandedExtraId] = useState<string | null>(null);
  const [selectedSubsections, setSelectedSubsections] = useState<{
    [key: string]: string | null;
  }>({});

  const handleExtraPress = (extraId: string) => {
    setExpandedExtraId(expandedExtraId === extraId ? null : extraId);
  };

  const handleSubsectionPress = (extraId: string, subsectionId: string) => {
    const updatedSelectedSubsections = {
      ...selectedSubsections,
      [extraId]: subsectionId,
    };
    setSelectedSubsections(updatedSelectedSubsections);

    const flattenedSelectedExtras = Object.values(
      updatedSelectedSubsections
    ).filter((val): val is string => val !== null);
    dispatch(setSelectedExtras(flattenedSelectedExtras));
  };

  const handleClearExtras = () => {
    setSelectedSubsections({});
    dispatch(setSelectedExtras([]));
  };

  const renderSubsections = (subsections: Subsection[], extraId: string) => (
    <>
      <Separator />
      {subsections.map((subsection) => (
        <TouchableOpacity
          key={subsection._id}
          onPress={() => handleSubsectionPress(extraId, subsection._id)}
        >
          <SubsectionContainer>
            <SubsectionText>{getDisplayName(subsection.name)}</SubsectionText>

            <CheckCircle>
              {selectedSubsections[extraId] === subsection._id && (
                <Icon name="checkmark" size={16} color="white" />
              )}
            </CheckCircle>
            {/* <CheckCircle selected={selectedSubsections[extraId] === subsection._id} /> */}
          </SubsectionContainer>
        </TouchableOpacity>
      ))}
    </>
  );

  const hasSelectedSubsections = Object.values(selectedSubsections).some(
    (value) => value !== null
  );

  const renderItem = ({ item }: { item: Extra }) => {
    const IconComponent = getSvgIcon(item.name);

    return (
      <View>
        <ExtraButton onPress={() => handleExtraPress(item._id)}>
          <ExtraTextContainer>
            <ExtraTextLeft>
              {IconComponent}
              <ExtraText>{getDisplayName(item.name)}</ExtraText>
            </ExtraTextLeft>
            {expandedExtraId === item._id ? (
              <UpArrowIcon width={24} height={24} fill="#fff" />
            ) : (
              <DownArrowIcon width={24} height={24} fill="#fff" />
            )}
          </ExtraTextContainer>
          {expandedExtraId === item._id &&
            renderSubsections(item.subselections || [], item._id)}
        </ExtraButton>
      </View>
    );
  };

  return (
    <Container>
      <ScrollView>
        <Heading>Select your extras (optional)</Heading>

        <FlatList
          data={extras}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          scrollEnabled={false}
        />

        {hasSelectedSubsections && (
          <ClearExtrasButton onPress={handleClearExtras}>
            <ClearExtrasButtonText>Clear Extras</ClearExtrasButtonText>
          </ClearExtrasButton>
        )}

        {!isModal && (
          <ReviewButton onPress={() => navigation.navigate("Overview")}>
            <ReviewButtonText>Review my order</ReviewButtonText>
          </ReviewButton>
        )}
      </ScrollView>
    </Container>
  );
};

export default Extras;

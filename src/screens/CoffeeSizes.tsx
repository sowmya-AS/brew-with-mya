import React from "react";
import { FlatList } from "react-native";
import styled from "@emotion/native";
import tw from "tailwind-react-native-classnames";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSize } from "../redux/coffeeSlice";
import { NavigationProp, Size, CoffeeState } from "../../types";

import { getSvgIcon } from "../utils/coffeeUtils";

const Container = styled.View`
  ${tw`flex-1 bg-white p-4`}
`;

const Heading = styled.Text`
  ${tw`text-2xl font-bold mb-4`}
  color: black;
  text-align: center;
`;

const Card = styled.TouchableOpacity`
  ${tw`rounded-lg shadow-lg p-4 mb-4 flex-row items-center`}
  background-color: #9BC88B;
`;

const CardText = styled.Text`
  ${tw`text-lg font-bold ml-4`}
  color: white;
`;

const SizesScreen = ({
  navigation,
  isModal = false,
  closeModal,
}: {
  navigation: NavigationProp;
  isModal?: boolean;
  closeModal?: () => void;
}) => {
  const dispatch = useDispatch();

  const receivedSizeIds = useSelector(
    (state: { coffee: CoffeeState }) => state.coffee.selectedType?.sizes ?? []
  );
  const allSizes = useSelector(
    (state: { coffee: CoffeeState }) => state.coffee.sizes
  );

  const matchedSizes = allSizes.filter((size: Size) =>
    receivedSizeIds.includes(size._id)
  );

  const handleSizePress = (sizeId: string) => {
    dispatch(setSelectedSize(sizeId));
    if (isModal && closeModal) {
      closeModal();
    } else {
      navigation.navigate("Extras");
    }
  };

  const renderItem = ({ item }: { item: Size }) => {
    const IconComponent = getSvgIcon(item.name);

    return (
      <Card onPress={() => handleSizePress(item._id)}>
        {IconComponent}
        <CardText>{item.name}</CardText>
      </Card>
    );
  };

  return (
    <Container>
      <Heading>Select your size</Heading>
      <FlatList
        data={matchedSizes}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </Container>
  );
};

export default SizesScreen;

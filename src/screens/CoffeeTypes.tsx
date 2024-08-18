import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import styled from '@emotion/native';
import tw from 'tailwind-react-native-classnames';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setTypes, setSelectedType, setSizes, setExtras, setSelectedSize ,setSelectedExtras} from '../redux/coffeeSlice';
import { CoffeeState, CoffeeType, NavigationProp } from '../../types';
import { getSvgIcon } from '../utils/coffeeUtils'; 

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
  background-color: #AED7A0;
`;

const CardText = styled.Text`
  ${tw`text-lg font-bold ml-4`}
  color: white;
`;

const CoffeeTypes = ({
  navigation,
  isModal = false,
  closeModal,
}: {
  navigation: NavigationProp;
  isModal?: boolean;
  closeModal?: () => void;
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get(
          'https://darkroastedbeans.coffeeit.nl/coffee-machine/60ba1ab72e35f2d9c786c610'
        );
        dispatch(setTypes(response.data.types));
        dispatch(setSizes(response.data.sizes));
        dispatch(setExtras(response.data.extras));
      } catch (error) {
        console.error(error);
      }
    };

    fetchTypes();
  }, [dispatch]);

  const handleTypePress = (type: CoffeeType) => {
    dispatch(setSelectedType(type));
    dispatch(setSelectedSize(null)); 
    dispatch(setSelectedExtras([]));
    if (isModal && closeModal) {
      closeModal();
    } else {
      navigation.navigate('Sizes');
    }
  };

  const types = useSelector((state: { coffee: CoffeeState }) => state.coffee.types);

  const renderItem = ({ item }: { item: CoffeeType }) => {
    const IconComponent = getSvgIcon(item.name);

    return (
      <Card onPress={() => handleTypePress(item)}>
        {IconComponent}
        <CardText>{item.name}</CardText>
      </Card>
    );
  };

  return (
    <Container>
      <Heading>Select your style</Heading>
      <FlatList
        data={types}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </Container>
  );
};

export default CoffeeTypes;

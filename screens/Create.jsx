import React, { useState } from 'react';

// UI
import { View, Text, ImageBackground, ScrollView, Image, TextInput } from 'react-native';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { create, colors, colorSet } from './../style';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Create = ({ navigation, route }) => {
  const { data } = route.params;
  const [contactsData, setContactsData] = useState(data);
  const [selectedData, setSelectedData] = useState(
    data.filter((item) => {
      return item.selected;
    }),
  );
  const [searchKey, setSearchKey] = useState('');

  const toNextPage = () => {
    navigation.navigate('Details', { selectedData });
  };

  const toggleSelected = (index, item) => {
    if (index == -1) {
      index = data.indexOf(item);
    }

    const { selected } = data[index];
    let newSelected = [];

    if (selected) {
      data[index].selected = false;

      const id = selectedData.indexOf(item);
      selectedData.splice(id, 1);
      newSelected = [...selectedData];
    } else {
      data[index].selected = true;
      data[index].colorId = index;
      newSelected = [data[index], ...selectedData];
    }
    setContactsData([...data]);
    setSelectedData(newSelected);
  };

  return (
    <View>
      <ImageBackground style={create.imagebg} source={require('./../assets/croods2.png')}>
        <View style={create.topSection}>
          <View style={create.searchView}>
            <TextInput
              style={create.searchbar}
              placeholder="Search"
              placeholderTextColor={colors.gray}
              selectionColor={colors.orange}
              value={searchKey}
              onChangeText={(text) => setSearchKey(text)}
            />
            <View style={create.close}>
              <TouchableOpacity onPress={() => setSearchKey('')}>
                <AntDesign style={create.searchbarCloseText} name="closecircle" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={create.selectedView}>
            <ScrollView horizontal={true}>
              {selectedData.map((item, index) => {
                const { picture, name, selected, colorId } = item;
                const color = colorId % 5;

                return (
                  <View key={index} style={{ marginRight: 15 }}>
                    <View style={[create.imgContainer, { borderColor: colorSet[color] }]}>
                      <Image style={create.face} source={{ uri: picture.medium }} />
                      <View style={create.faceClosebtn}>
                        <TouchableOpacity onPress={() => toggleSelected(-1, item)} style={{ padding: 3 }}>
                          <AntDesign style={create.closeIcon} name="closecircle" />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <Text style={create.faceName}>{name.first}</Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
      <View style={create.bottomSection}>
        <ScrollView>
          {contactsData.map((item, index) => {
            const { picture, name, phone, selected } = item;
            const fullname = `${name.first} ${name.last}`;
            const color = index % 5;
            if (fullname.includes(searchKey)) {
              return (
                <View key={index}>
                  <View style={create.contactItem}>
                    <View style={[create.imgContainer, { borderColor: colorSet[color] }]}>
                      <Image style={create.face} source={{ uri: picture.medium }} />
                    </View>
                    <View style={create.contactDetails}>
                      <View>
                        <Text style={create.contactHead}>{fullname}</Text>
                        <Text style={create.contactSub}>{phone}</Text>
                      </View>
                      <TouchableOpacity onPress={() => toggleSelected(index, item)} key={index}>
                        {selected && <Ionicons style={create.contactCheck} name="ios-checkmark-circle" size={35} />}
                        {(!selected || selected === undefined) && (
                          <MaterialCommunityIcons
                            style={create.contactUnCheck}
                            name="checkbox-blank-circle-outline"
                            size={35}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={create.thinLine} />
                </View>
              );
            }
          })}
        </ScrollView>

        {selectedData.length !== 0 && (
          <View style={create.next}>
            <TouchableOpacity onPress={toNextPage}>
              <AntDesign name="arrowright" size={30} color={colors.white} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default Create;

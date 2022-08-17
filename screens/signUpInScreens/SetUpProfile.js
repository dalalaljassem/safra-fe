import React, { useState, useEffect } from 'react';
import {
  Pressable,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  // CheckBox,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Input } from '@rneui/themed';
import userStore from '../../components/stores/userStore';
import { Popover, Button, Modal, FormControl, Box } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import { Calendar } from 'react-native-calendars';

const SetUpProfile = ({ route }) => {
  const username = route.params.username;
  const password = route.params.password;
  const [user, setUser] = useState({
    username: username,
    password: password,
    budget: 0,
    departDate: '',
    returnDate: '',
    activities: [],
    image: '',
  });

  const formatDate = (date) => {
    let day = date[8] + date[9];
    if (date[8] == '0') {
      day = date[0];
    }
    let month = date[5] + date[6];
    if (date[5] == '0') {
      month = date[6];
    }
    let year = date[0] + date[1] + date[2] + date[3];
    if (date == '') {
      return date;
    }
    return `${day} / ${month} / ${year}`;
  };
  // const [isOpen, setIsOpen] = useState(false);
  // const [isOpen2, setIsOpen2] = useState(false);
  // const [isOpen3, setIsOpen3] = useState(false);

  // const onClose = () => setIsOpen(false);
  // const onClose2 = () => setIsOpen2(false);
  // const onClose3 = () => setIsOpen3(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showDateModal2, setShowDateModal2] = useState(false);
  // const onCloseDate = () => setIsOpenDate(false);
  const [image, setImage] = useState('');
  // const [input, setInput] = useState('');
  // const [departDate, setDepartDate] = useState('');
  // const [returnDate, setReturnDate] = useState('');
  const [selectedDate, setSelectedDate] = useState({});
  const [selectedDate2, setSelectedDate2] = useState({});
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const selectDay = (day) => {
    let date = {};
    date[`${day.dateString}`] = {
      color: '#C0D6DF',
      selected: true,
      textColor: '#166088',
    };
    return date;
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.cancelled) {
      let filename = result.uri.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let img_type = match ? `image/${match[1]}` : `image`;
      // setUser({
      //   ...user,
      //   image: {
      //     uri:
      //       Platform.OS === 'android'
      //         ? result.uri
      //         : result.uri.replace('file://', ''),
      //     name: filename,
      //     type: img_type,
      //   },
      // });
      setUser({ ...user, image: result.uri });

      setImage(result.uri);
      console.log(user);
    }
  };

  const handleSubmit = async () => {
    userStore.register(user);
  };
  let activities = ['swimming', 'diving', 'dancing'];
  let selectedActivities = [];
  return (
    <>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.titleBox}>
          <Text style={styles.title}> Setup Your Profile </Text>
        </View>

        <Input
          onChangeText={(budget) => {
            setUser({ ...user, budget });
          }}
          placeholder="Budget"
        />

        {/* <Input
          onChangeText={(activities) => {
            activities = [activities];
            setUser({ ...user, activities });
          }}
          placeholder="Activities"
        /> */}

        {/* <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
        /> */}
        <View style={styles.activities}>
          <Text style={styles.selectActivities}>
            Select Your Favourite Activities:
          </Text>
          {activities.map((a) => (
            <BouncyCheckbox
              style={styles.activitiesList}
              size={25}
              fillColor="#63C9B3"
              unfillColor="#FFFFFF"
              text={a}
              iconInnerStyle={{ borderWidth: 2 }}
              textStyle={{ fontFamily: 'JosefinSans-Regular' }}
              onPress={() => {
                if (selectedActivities.includes(a)) {
                  selectedActivities = selectedActivities.filter(
                    (ac) => ac != a
                  );
                } else {
                  selectedActivities.push(a);
                }

                console.log(selectedActivities);

                setUser({ ...user, activities: selectedActivities });
              }}
            />
          ))}
        </View>

        <View style={styles.dateBtn}>
          <View style={styles.btnWithDate}>
            <Box alignItems="center">
              <Button
                style={styles.dateBtnColor}
                onPress={() => setShowDateModal(true)}
              >
                Select Departure Date
              </Button>
            </Box>
          </View>
          <Text>{formatDate(user.departDate)}</Text>
        </View>

        <Modal isOpen={showDateModal} onClose={() => setShowDateModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Select Departure Date</Modal.Header>
            <Modal.Body>
              <Calendar
                initialDate={'2022-07-27'}
                minDate={'2022-07-27'}
                maxDate={'2023-07-27'}
                onDayPress={(day) => {
                  console.log('selected day', day);
                  setSelectedDate(selectDay(day));

                  setUser({ ...user, departDate: day.dateString });
                }}
                onDayLongPress={(day) => {
                  console.log('selected day', day);
                }}
                onMonthChange={(month) => {
                  console.log('month changed', month);
                }}
                hideArrows={false}
                hideExtraDays={true}
                disableMonthChange={false}
                firstDay={6}
                hideDayNames={false}
                showWeekNumbers={false}
                onPressArrowLeft={(subtractMonth) => subtractMonth()}
                onPressArrowRight={(addMonth) => addMonth()}
                disableArrowLeft={false}
                disableArrowRight={false}
                disableAllTouchEventsForDisabledDays={true}
                markedDates={selectedDate}
                enableSwipeMonths={true}
                theme={{
                  calendarBackground: '#166088',
                  // calendarBackground: '#63C9B3',
                  selectedDayBackgroundColor: '#C0D6DF',
                  selectedDayTextColor: '#166088',
                  selectedDotColor: '#166088',

                  dayTextColor: '#DBE9EE',
                  textDisabledColor: '#729DAF',
                  dotColor: '#DBE9EE',

                  monthTextColor: '#DBE9EE',
                  textMonthFontWeight: 'bold',

                  arrowColor: '#DBE9EE',
                }}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowDateModal(false);
                    setSelectedDate({});
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                    // handleSubmit();
                    setShowDateModal(false);
                    setSelectedDate({});
                  }}
                >
                  Save
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        <View style={styles.dateBtn}>
          <View style={styles.btnWithDate}>
            <Box alignItems="center">
              <Button
                style={styles.dateBtnColor2}
                onPress={() => setShowDateModal2(true)}
              >
                Select Return Date
              </Button>
            </Box>
          </View>
          <Text>{formatDate(user.returnDate)}</Text>
        </View>

        <Modal isOpen={showDateModal2} onClose={() => setShowDateModal2(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Select Return Date</Modal.Header>
            <Modal.Body>
              <Calendar
                initialDate={'2022-07-27'}
                minDate={'2022-07-27'}
                maxDate={'2023-07-27'}
                onDayPress={(day) => {
                  console.log('selected day', day);
                  setSelectedDate2(selectDay(day));
                  setUser({ ...user, returnDate: day.dateString });
                }}
                onDayLongPress={(day) => {
                  console.log('selected day', day);
                }}
                onMonthChange={(month) => {
                  console.log('month changed', month);
                }}
                hideArrows={false}
                hideExtraDays={true}
                disableMonthChange={false}
                firstDay={6}
                hideDayNames={false}
                showWeekNumbers={false}
                onPressArrowLeft={(subtractMonth) => subtractMonth()}
                onPressArrowRight={(addMonth) => addMonth()}
                disableArrowLeft={false}
                disableArrowRight={false}
                disableAllTouchEventsForDisabledDays={true}
                markedDates={selectedDate2}
                enableSwipeMonths={true}
                theme={{
                  calendarBackground: '#166088',
                  // calendarBackground: '#63C9B3',
                  selectedDayBackgroundColor: '#C0D6DF',
                  selectedDayTextColor: '#166088',
                  selectedDotColor: '#166088',

                  dayTextColor: '#DBE9EE',
                  textDisabledColor: '#729DAF',
                  dotColor: '#DBE9EE',

                  monthTextColor: '#DBE9EE',
                  textMonthFontWeight: 'bold',

                  arrowColor: '#DBE9EE',
                }}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowDateModal2(false);
                    setSelectedDate2({});
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                    // handleSubmit();
                    setShowDateModal2(false);
                    setSelectedDate2({});
                  }}
                >
                  Save
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        <View style={styles.dateBtn}>
          <View style={styles.btnWithDate}>
            <Box alignItems="center">
              <Button style={styles.dateBtnColor} onPress={pickImage}>
                Pick Profile Image
              </Button>
            </Box>
          </View>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={{
              uri: image,
            }}
          />
        </View>
        <Pressable onPress={handleSubmit} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </Pressable>
      </SafeAreaView>
    </>
  );
};

export default SetUpProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  mainContainer: {
    justifyContent: 'space-between',
    marginHorizontal: 35,
  },
  titleBox: {
    paddingTop: 65,
    paddingBottom: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    letterSpacing: 0.5,
    color: 'hsl(174, 62%, 47%)',
    fontWeight: 'bold',
  },

  saveButton: {
    backgroundColor: '#63C9B3',
    justifyContent: 'center',
    alignItems: 'center',
    height: '9%',
    paddingHorizontal: '22%',
    borderRadius: 20,
    marginTop: '10%',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 20,
  },
  dateBtn: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 10,
    flexDirection: 'row',
  },
  dateBtnColor: {
    backgroundColor: '#63C9B3',
  },
  dateBtnColor2: {
    backgroundColor: '#63C9B3',
    paddingRight: 35,
  },
  image: {
    width: '15%',
    height: '100%',
    borderRadius: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  activities: {
    marginLeft: 10,
    marginBottom: 10,
  },
  selectActivities: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  activitiesList: {
    marginBottom: 5,
  },
});

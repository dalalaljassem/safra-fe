import { Popover, Button, Modal, FormControl, Box } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import {
  Pressable,
  Text,
  StyleSheet,
  TextInput,
  View,
  Image,
} from 'react-native';
import userStore from './stores/userStore';
import { AlertDialog } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import { useState, useEffect } from 'react';
import React from 'react';
function EditProfileButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTwo, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const onClose = () => setIsOpen(false);
  const onClose2 = () => setIsOpen2(false);
  const onClose3 = () => setIsOpen3(false);
  // setShowDateModal2
  // const [isOpenDate, setIsOpenDate] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  // const onCloseDate = () => setIsOpenDate(false);
  const [image, setImage] = useState('');
  const [input, setInput] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [selectedDate, setSelectedDate] = useState({});

  const cancelRef = React.useRef(null);
  const [user, setUser] = useState({
    budget: userStore.user.budget,
    departDate: userStore.user.departDate,
    returnDate: userStore.user.returnDate,
    activities: userStore.user.activities,
    image: userStore.user.image,
  });
  const selectDay = (day) => {
    let date = {};
    date[`${day.dateString}`] = {
      color: '#C0D6DF',
      selected: true,
      textColor: '#166088',
    };
    return date;
  };
  const dateRange = (startDate, endDate) => {
    let dates = {};
    dates[`${startDate}`] = {
      color: '#C0D6DF',
      selected: true,
      startingDay: true,
      textColor: '#166088',
    };

    const start = new Date(startDate);
    console.log(start);

    const end = new Date(endDate);
    console.log(end);

    let date = start;

    const datesList = [];

    while (date < end) {
      console.log(date);
      date.setDate(date.getDate() + 1);
      datesList.push(new Date(date));
    }
    datesList.pop();
    // dates[`${startDate}`] = {
    //   selected: true,
    //   color: '#C0D6DF',
    //   textColor: '#166088',
    //   startingDay: true,
    // };
    datesList.forEach((d) => {
      dates[`${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}`] =
        {
          color: '#C0D6DF',
          selected: true,
          textColor: '#166088',
        };
      console.log(
        `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}`
      );
    });

    dates[`${endDate}`] = {
      color: '#C0D6DF',
      endingDay: true,
      selected: true,
      textColor: '#166088',
    };

    console.log(dates);

    return dates;
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
      setUser({
        ...user,
        image: {
          uri:
            Platform.OS === 'android'
              ? result.uri
              : result.uri.replace('file://', ''),
          name: filename,
          type: img_type,
        },
      });
      //   setUser({ ...user, image: result.uri });
      setImage(result.uri);
    }
  };

  const handleChange = (name, value) => {
    if (name === 'budget') {
      //   setUser({ ...user, [name]: value.replace(/\d/g, '') });
      //   setUser({ ...user, [name]: value.replace(/[^d]/g, '') });
      setUser({ ...user, [name]: value });
    }
    if (name === 'activities') {
      //   setUser({ ...user, [name]: value.replace(/\d/g, '') });
      //   setUser({ ...user, [name]: value.replace(/[^d]/g, '') });
      value = value.split(',');
      setUser({ ...user, [name]: value });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    if (departDate !== '') {
      console.log('departDate================' + departDate);
      setUser({ ...user, ['departDate']: departDate });
    }
    // if (returnDate !== '') {
    // setUser({ ...user, returnDate: new Date(returnDate) });
    setUser({ ...user, ['returnDate']: returnDate });
    // }
    console.log(user);

    userStore.updateUser(user, userStore.user.id);

    setTimeout(function () {
      setImage('');
    }, 500);
  };

  return (
    <Popover
      trigger={(triggerProps) => {
        return (
          <Pressable {...triggerProps} transparent>
            <AntDesign name="ellipsis1" size={32} color="black" />
          </Pressable>
        );
      }}
    >
      <Popover.Content w="90">
        <Popover.Arrow />

        <Popover.Body alignItems="center">
          <Pressable onPress={() => setShowModal(true)}>
            <Text style={styles.edit}>Edit</Text>
          </Pressable>
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth="400px">
              <Modal.CloseButton />
              <Modal.Header>Edit Profile</Modal.Header>
              <Modal.Body>
                <FormControl>
                  <View style={styles.imageTitleAndButton}>
                    <FormControl.Label>Image: </FormControl.Label>
                    <Box alignItems="center">
                      <Button onPress={pickImage}>Add Image</Button>
                    </Box>
                    <Image
                      resizeMode="cover"
                      style={styles.image}
                      source={{
                        uri: image,
                      }}
                    />
                  </View>
                </FormControl>
                <FormControl>
                  <FormControl.Label>Budget</FormControl.Label>
                  <TextInput
                    // value={input}
                    keyboardType="number-pad"
                    style={styles.input}
                    onChangeText={(text) => {
                      handleChange('budget', text);
                    }}
                  ></TextInput>
                </FormControl>
                <FormControl>
                  <FormControl.Label>Activities</FormControl.Label>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => {
                      handleChange('activities', text);
                    }}
                  ></TextInput>
                </FormControl>
                <FormControl>
                  <FormControl.Label>Departure Date</FormControl.Label>
                  <View style={styles.btnWithDate}>
                    {/* <Pressable onPress={() => setShowDateModal(true)}>
                      <Text style={styles.dateBtn}>Select Date</Text>
                    </Pressable> */}
                    <Box alignItems="center">
                      <Button onPress={() => setShowDateModal(true)}>
                        Select Departure Date
                      </Button>
                    </Box>
                    <Text>{departDate}</Text>
                  </View>

                  <Modal
                    isOpen={showDateModal}
                    onClose={() => setShowDateModal(false)}
                  >
                    <Modal.Content maxWidth="400px">
                      <Modal.CloseButton />
                      <Modal.Header>Select Departure Date</Modal.Header>
                      <Modal.Body>
                        <Calendar
                          // Initially visible month. Default = now
                          initialDate={'2022-07-27'}
                          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                          minDate={'2022-07-27'}
                          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                          maxDate={'2023-07-27'}
                          // Handler which gets executed on day press. Default = undefined

                          onDayPress={(day) => {
                            console.log('selected day', day);
                            setSelectedDate(selectDay(day));
                            setDepartDate(day.dateString);
                          }}
                          // Handler which gets executed on day long press. Default = undefined
                          onDayLongPress={(day) => {
                            console.log('selected day', day);
                          }}
                          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                          // monthFormat={'yyyy MM'}
                          // Handler which gets executed when visible month changes in calendar. Default = undefined
                          onMonthChange={(month) => {
                            console.log('month changed', month);
                          }}
                          // Hide month navigation arrows. Default = false
                          hideArrows={false}
                          // Replace default arrows with custom ones (direction can be 'left' or 'right')
                          // renderArrow={(direction) => <></>}
                          // Do not show days of other months in month page. Default = false
                          hideExtraDays={true}
                          // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
                          // day from another month that is visible in calendar page. Default = false
                          disableMonthChange={false}
                          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
                          firstDay={6}
                          // Hide day names. Default = false
                          hideDayNames={false}
                          // Show week numbers to the left. Default = false
                          showWeekNumbers={false}
                          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                          onPressArrowLeft={(subtractMonth) => subtractMonth()}
                          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                          onPressArrowRight={(addMonth) => addMonth()}
                          // Disable left arrow. Default = false
                          disableArrowLeft={false}
                          // Disable right arrow. Default = false
                          disableArrowRight={false}
                          // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                          disableAllTouchEventsForDisabledDays={true}
                          // Replace default month and year title with custom one. the function receive a date as parameter
                          // renderHeader={(date) => {
                          //   date;
                          // }}
                          // Enable the option to swipe between months. Default = false
                          // markingType={'period'}
                          markedDates={selectedDate}
                          // markedDates={{
                          //   '2022-08-16': {
                          //     color: '#C0D6DF',
                          //     selected: true,
                          //     startingDay: true,
                          //     textColor: '#166088',
                          //   },

                          //   '2022-08-17': {
                          //     color: '#C0D6DF',
                          //     selected: true,
                          //     textColor: '#166088',
                          //   },
                          //   '2022-08-18': {
                          //     color: '#C0D6DF',
                          //     selected: true,
                          //     textColor: '#166088',
                          //   },
                          //   '2022-08-19': {
                          //     color: '#C0D6DF',
                          //     selected: true,
                          //     textColor: '#166088',
                          //   },
                          //   '2022-08-20': {
                          //     color: '#C0D6DF',
                          //     endingDay: true,
                          //     selected: true,
                          //     textColor: '#166088',
                          //   },
                          // }}
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
                </FormControl>

                <FormControl>
                  <FormControl.Label>Return Date</FormControl.Label>
                  <View style={styles.btnWithDate}>
                    {/* <Pressable onPress={() => setShowDateModal(true)}>
                      <Text style={styles.dateBtn}>Select Date</Text>
                    </Pressable> */}
                    <Box alignItems="center">
                      <Button onPress={() => setShowModal2(true)}>
                        Select Return Date
                      </Button>
                    </Box>
                    <Text>{returnDate}</Text>
                  </View>

                  <Modal
                    isOpen={showModal2}
                    onClose={() => setShowModal2(false)}
                  >
                    <Modal.Content maxWidth="400px">
                      <Modal.CloseButton />
                      <Modal.Header>Select Return Date</Modal.Header>
                      <Modal.Body>
                        <Calendar
                          // Initially visible month. Default = now
                          initialDate={'2022-07-27'}
                          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                          minDate={'2022-07-27'}
                          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                          maxDate={'2023-07-27'}
                          // Handler which gets executed on day press. Default = undefined

                          onDayPress={(day) => {
                            console.log('selected day', day);
                            setSelectedDate(selectDay(day));
                            setReturnDate(day.dateString);
                          }}
                          // Handler which gets executed on day long press. Default = undefined
                          onDayLongPress={(day) => {
                            console.log('selected day', day);
                          }}
                          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                          // monthFormat={'yyyy MM'}
                          // Handler which gets executed when visible month changes in calendar. Default = undefined
                          onMonthChange={(month) => {
                            console.log('month changed', month);
                          }}
                          // Hide month navigation arrows. Default = false
                          hideArrows={false}
                          // Replace default arrows with custom ones (direction can be 'left' or 'right')
                          // renderArrow={(direction) => <></>}
                          // Do not show days of other months in month page. Default = false
                          hideExtraDays={true}
                          // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
                          // day from another month that is visible in calendar page. Default = false
                          disableMonthChange={false}
                          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
                          firstDay={6}
                          // Hide day names. Default = false
                          hideDayNames={false}
                          // Show week numbers to the left. Default = false
                          showWeekNumbers={false}
                          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                          onPressArrowLeft={(subtractMonth) => subtractMonth()}
                          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                          onPressArrowRight={(addMonth) => addMonth()}
                          // Disable left arrow. Default = false
                          disableArrowLeft={false}
                          // Disable right arrow. Default = false
                          disableArrowRight={false}
                          // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                          disableAllTouchEventsForDisabledDays={true}
                          // Replace default month and year title with custom one. the function receive a date as parameter
                          // renderHeader={(date) => {
                          //   date;
                          // }}
                          // Enable the option to swipe between months. Default = false
                          // markingType={'period'}
                          markedDates={selectedDate}
                          // markedDates={{
                          //   '2022-08-16': {
                          //     color: '#C0D6DF',
                          //     selected: true,
                          //     startingDay: true,
                          //     textColor: '#166088',
                          //   },

                          //   '2022-08-17': {
                          //     color: '#C0D6DF',
                          //     selected: true,
                          //     textColor: '#166088',
                          //   },
                          //   '2022-08-18': {
                          //     color: '#C0D6DF',
                          //     selected: true,
                          //     textColor: '#166088',
                          //   },
                          //   '2022-08-19': {
                          //     color: '#C0D6DF',
                          //     selected: true,
                          //     textColor: '#166088',
                          //   },
                          //   '2022-08-20': {
                          //     color: '#C0D6DF',
                          //     endingDay: true,
                          //     selected: true,
                          //     textColor: '#166088',
                          //   },
                          // }}
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
                              setShowModal2(false);
                              setSelectedDate({});
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            onPress={() => {
                              // handleSubmit();
                              setShowModal2(false);
                              setSelectedDate({});
                            }}
                          >
                            Save
                          </Button>
                        </Button.Group>
                      </Modal.Footer>
                    </Modal.Content>
                  </Modal>
                </FormControl>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="ghost"
                    colorScheme="blueGray"
                    onPress={() => {
                      setShowModal(false);
                      // setSelectedDate({});
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onPress={() => {
                      handleSubmit();
                      setShowModal(false);
                    }}
                  >
                    Save
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
          <Pressable onPress={() => setIsOpen(!isOpen)}>
            <Text style={styles.logout}>Logout</Text>
          </Pressable>
          <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header>Logout</AlertDialog.Header>
              <AlertDialog.Body>
                Are you sure you want to logout?
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="unstyled"
                    colorScheme="coolGray"
                    onPress={onClose}
                    ref={cancelRef}
                  >
                    Cancel
                  </Button>
                  <Button colorScheme="danger" onPress={userStore.logout}>
                    Yes
                  </Button>
                </Button.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
}

export default EditProfileButton;

const styles = StyleSheet.create({
  edit: {
    fontSize: 15,
    marginBottom: 10,
  },
  logout: {
    fontSize: 15,
    color: 'red',
  },
  input: {
    height: 30,
    borderWidth: 1,
    fontSize: 20,
    borderColor: 'grey',
    borderRadius: 5,
  },

  imageTitleAndButton: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
  },
  image: {
    width: '15%',
    height: '100%',
    borderRadius: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  btnWithDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateBtn: {},
});

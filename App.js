import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon1 from 'react-native-vector-icons/Entypo'
import AsyncStorage from "@react-native-community/async-storage";
import * as Animatable from 'react-native-animatable';
import {
  Dimensions, View, Image, Text, StatusBar, TouchableOpacity,
  ScrollView, Modal, TextInput, FlatList
} from 'react-native';
const { height, width } = Dimensions.get('screen')
export default function app() {
  const [name_task, setname_task] = useState('')
  const [id, setid] = useState(0)
  const [obj, setobj] = useState({})
  const [taskwarn, settaskwarn] = useState('')
  const [idwarn, setidwarn] = useState('')
  const [index, setindex] = useState(0)
  const [counter, setcounter] = useState(0)
  const [show, setshow] = useState(false)
  const [show1, setshow1] = useState(false)
  const [show2, setshow2] = useState(false)
  const [listArray, setlistArray] = useState([])

  useEffect(() => {
    start()
  }, [])
  async function start() {
    // await AsyncStorage.setItem('arrayStored', "[]")
    // alert(JSON.stringify(listArray))
    // await AsyncStorage.setItem('arrayStored', "[]")
    let arrayStored = await AsyncStorage.getItem('arrayStored')
    if (arrayStored == null) {
      arrayStored = []
    }
    else {
      arrayStored = JSON.parse(arrayStored)
    }
    // alert(arrayStored.length)
    setlistArray(arrayStored)
  }
  async function add() {
    let arr = listArray
    let count = counter
    let obj = {
      name_task: name_task,
      id: count,
      apear: true
    }
    arr.push(obj)
    arr = JSON.stringify(arr)
    setlistArray(JSON.parse(arr))

    setshow(false)
    count += 1
    setcounter(count)
    await AsyncStorage.setItem('arrayStored', arr)
    setname_task('')
    setid(0)
  }
  async function del(index) {
    let ar = []
    ar = listArray
    ar.splice(index, 1)
    ar = JSON.stringify(ar)
    setlistArray(JSON.parse(ar))
    await AsyncStorage.setItem('arrayStored', ar)
  }
  async function update(index) {
    let arr = []
    arr = listArray
    arr[index].name_task = name_task
    arr[index].id = id
    arr = JSON.stringify(arr)
    setlistArray(JSON.parse(arr))

    await AsyncStorage.setItem('arrayStored', arr)
    setshow1(false)
  }
  function vilidation(type, index) {
    let check = true
    if (name_task.trim() == "") {
      settaskwarn('Enter the Task warn name')
      check = false
    }
    else {
      settaskwarn('')
    }

    if (check) {
      if (type == "add") {
        add()
      } else {
        update(index)
      }
    }

  }
  return (
    <>
      <StatusBar backgroundColor="#0aa" />

      <View style={{
        width: width,
        height: height,
        backgroundColor: "#fff",


      }}>
        <Image source={require('./img/25.jpg')} style={{
          width: width,
          height: height * 0.35
        }} />
        <View style={{
          alignItems: "center"
        }}>


          <Text style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#000",
            fontStyle: "italic"
          }}>
            Welcome to do list
          </Text>
          <Text style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#000",
            fontStyle: "italic",
            marginTop: 20
          }}>
            Your Tasks
          </Text>
        </View>



        <FlatList

          data={listArray}

          // horizontal={true}

          // keyExtractor={(item, index) => index.toString()}

          renderItem={({ item, index }) =>
            <>

              <View style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}>
                < TouchableOpacity
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#87cefa",
                    borderRadius: 25,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 10

                  }}
                  onPress={() => {
                    setshow1(true)
                    setname_task(item.name_task)
                    setid(item.id)
                    // setobj(item)
                    setindex(index)
                  }}
                >
                  <Icon name="edit" size={30} color="#ff4500" style={{

                  }} />
                </TouchableOpacity>
                <View style={{
                  maxWidth: width * .7,
                  // height: 40,
                  marginTop: 10,
                  borderRadius: 10,
                  backgroundColor: "#87cefa",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 20

                }}>
                  <Text style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#ff4500"
                  }}>
                    {item.name_task}
                  </Text>
                </View>

              </View>
            </>
          }

        />

      </View>

      <Modal

        visible={show}
        onRequestClose={() => setshow(false)}>
        <View style={{
          width: width,
          height: height,
          backgroundColor: "#fff",
          alignItems: "center"
        }}>
          <Image source={require('./img/27.jpg')} style={{
            width: width,
            height: height * 0.40
          }} />
          <View style={{
            alignItems: "center"
          }}>


            <Text style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#000",
              marginTop: 20,
            }}>
              Welcome to Add Task
            </Text>
          </View>
          <TextInput style={{
            width: "85%",
            height: 40,
            backgroundColor: "#ccc",
            borderWidth: 1.5,
            borderColor: "#000",
            color: "#000",
            padding: 9,
            marginTop: 30,
            borderRadius: 10
          }} placeholder='Enter the name task'
            placeholderTextColor='#000'
            value={name_task}
            onChangeText={(value) => setname_task(value)}
          />
          <Text style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#f00"
          }}>
            {taskwarn}
          </Text>
          <TextInput style={{
            width: "85%",
            height: 40,
            backgroundColor: "#ccc",
            borderWidth: 1.5,
            borderColor: "#000",
            color: "#000",
            padding: 9,
            marginTop: 10,
            borderRadius: 10
          }} placeholder='Enter the id task'
            placeholderTextColor='#000'
            value={id + ""}
            keyboardType='numeric'
            onChangeText={(value) => setid(value)}
          />
          <Text style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#f00"
          }}>
            {idwarn}
          </Text>
          <TouchableOpacity style={{
            width: 130,
            height: 40,
            borderRadius: 15,
            backgroundColor: "#ff4500",
            borderWidth: 2,
            borderColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30
          }}
            onPress={() => {
              vilidation("add", "")

            }}
          >
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: "#fff"
            }}>
              +Add Task
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        visible={show1}
        onRequestClose={() => setshow1(false)}>
        <View style={{
          width: width,
          height: height,
          backgroundColor: "#fff",
          alignItems: "center"
        }}>
          <Image source={require('./img/24.jpg')} style={{
            width: width,
            height: height * 0.40
          }} />
          <View style={{
            alignItems: "center"
          }}>


            <Text style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#000",
              marginTop: 20,
            }}>
              Welcome to edit Task
            </Text>
          </View>
          <TextInput style={{
            width: "85%",
            height: 40,
            backgroundColor: "#fff",
            borderWidth: 1.5,
            borderColor: "#ee82ee",
            color: "#ee82ee",
            padding: 9,
            marginTop: 30,
            borderRadius: 10
          }} placeholder='Enter the name task'
            placeholderTextColor='#ee82ee'
            value={name_task}
            onChangeText={(value) => {
              setname_task(value)

            }}
          />
          <Text style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#f00"
          }}>
            {taskwarn}
          </Text>
          <TextInput style={{
            width: "85%",
            height: 40,
            backgroundColor: "#fff",
            borderWidth: 1.5,
            borderColor: "#ee82ee",
            color: "#ee82ee",
            padding: 9,
            marginTop: 10,
            borderRadius: 10
          }} placeholder='Enter the id task'
            placeholderTextColor='#ee82ee'
            value={id + ""}
            onChangeText={(value) => {
              setid(value)

            }}
          />
          <Text style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#f00"
          }}>
            {idwarn}
          </Text>
          <TouchableOpacity style={{
            width: 130,
            height: 40,
            borderRadius: 15,
            backgroundColor: "#ccc",
            borderWidth: 2,
            borderColor: "#000",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30
          }}
            onPress={() => {
              vilidation("update", index)
            }}
          >
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: "#000"
            }}>
              update
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal visible={show2}
        onRequestClose={() => setshow2(false)
        }
      >
        <View style={{
          width: width,
          height: height,
          backgroundColor: "#ffa07a",

        }}>
          <Image source={require('./img/26.jpg')} style={{
            width: width,
            height: height * 0.35
          }} />
          <View style={{
            alignItems: "center"
          }}>


            <Text style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#000",
              marginTop: 20,
            }}>
              Welcome to delete Task
            </Text>
          </View>
          {listArray.map((item, index) =>
            <>
              <View style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}>
                <View style={{
                  width: 80,
                  height: 40,
                  marginTop: 10,
                  borderRadius: 10,
                  backgroundColor: "#2f4f4f",
                  alignItems: "center",
                  justifyContent: "center",

                }}>
                  <Text style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#ff4500"
                  }}>
                    {item.name_task}
                  </Text>
                </View>
                < TouchableOpacity
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#2f4f4f",
                    borderRadius: 25,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 10,
                    marginLeft: 20

                  }}
                  onPress={() => {
                    del(index)
                  }}

                >

                  <Icon name="restore-from-trash" size={30} color="#ff4500" style={{

                  }} />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </Modal>

      < TouchableOpacity
        style={{
          width: 70,
          height: 70,
          backgroundColor: "#87cefa",
          borderRadius: 35,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: 100,
          right: 20
        }}
        onPress={() => {

          setshow2(true)
        }}
      >
        <Icon1 name="trash" size={40} color="#ff4500" style={{

        }} />
      </TouchableOpacity>

      < TouchableOpacity
        style={{
          width: 70,
          height: 70,
          backgroundColor: "#87cefa",
          borderRadius: 35,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: 20,
          right: 20
        }}
        onPress={() => {

          setshow(true)
        }}
      >
        <Icon name="post-add" size={40} color="#ff4500" style={{

        }} />
      </TouchableOpacity>
    </>
  )
}
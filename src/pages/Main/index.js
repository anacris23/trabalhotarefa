import React, { Component } from 'react';

import {
  View, Text, ScrollView, TouchableOpacity,
} from 'react-native';
import api from '../../services/api';
// import { Container } from './styles';

export default class Main extends Component {
  state = {
    data: [],
  };

  componentDidMount = async () => {
    const res = await api.get('/api/tasks');
    this.setState({ data: res.data });
  };

  updateCompleted = async (id) => {
    await api.put(`/api/tasks/${id}`, { completed: true });
    this.componentDidMount();
  };

  updateNotCompleted = async (id) => {
    await api.put(`/api/tasks/${id}`, { completed: false });
    this.componentDidMount();
  };


  render() {
    const { data } = this.state;
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#b0c4de' }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#F5F5F5',
          }}
        >
          <Text
            style={{
              fontSize: 40,
              color: '#191970',
              margin: 10,
              fontWeight: 'bold',
              marginBottom: 30,
            }}
          >
            Lista de tarefas
          </Text>
          
          {data.map(task => (!task.completed ? (
            <TouchableOpacity key={task._id} onPress={() => this.updateCompleted(task._id)}>
              <Text
                style={{
                  fontSize: 20,
                  borderWidth: 2,
                  borderRadius: 10,
                  textAlign: 'center',
                  margin: 5,
                  color: '#4B0082',
                  fontWeight: 'bold',
                }}
              >

                {task.task}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity key={task._id} onPress={() => this.updateNotCompleted(task._id)}>
              <Text
                style={{
                  fontSize: 20,
                  borderWidth: 2,
                  borderRadius: 10,
                  borderColor: 'black',
                  textAlign: 'center',
                  textDecorationLine: 'line-through',
                  margin: 5,
                  color: 'green',
                  fontWeight: 'bold',
                }}
              >
                {task.task}
              </Text>
            </TouchableOpacity>
          )))}
        </View>
      </ScrollView>
    );
  }
}

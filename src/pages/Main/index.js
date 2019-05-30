import React, { Component } from 'react';

import {
  View, Text, ScrollView, TouchableOpacity,
} from 'react-native';
import { write } from 'fs';
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

  //= {() => this.updateStatus(task._id, task.completed)
  render() {
    const { data } = this.state;
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#b0c4de' }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#b0c4de',
          }}
        >
          <Text
            style={{
              fontSize: 40,
              color: 'write',
              margin: 10,
              fontWeight: 'bold',
            }}
          >
            Tarefas
          </Text>

          {data.map(task => (!task.completed ? (
            <TouchableOpacity key={task._id} onPress={() => this.updateCompleted(task._id)}>
              <Text
                style={{
                  fontSize: 35,

                  textAlign: 'center',
                  margin: 5,
                  color: 'red',
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
                  fontSize: 35,
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

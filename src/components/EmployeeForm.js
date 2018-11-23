import React, { Component } from 'react'
import { View, Text, Picker } from 'react-native'
import { connect } from 'react-redux'
import { employeeUpdate } from '../actions'
import { CardSection, Input } from './common'

class EmployeeForm extends Component {
    updateName = text => this.props.employeeUpdate({ prop: 'name', value: text })

    updatePhone = text => this.props.employeeUpdate({ prop: 'phone', value: text })

    updateShift = text => this.props.employeeUpdate({ prop: 'shift', value: text })


    render() {
      const { name, phone, shift, employeeUpdate } = this.props
      return (
        <View>
          <CardSection>
            <Input
              label="Name"
              placeholder="Jane"
              value={name}
              onChangeText={this.updateName}
            />
          </CardSection>

          <CardSection>
            <Input
              label="Phone"
              placeholder="555-555-555"
              value={phone}
              onChangeText={this.updatePhone}
            />
          </CardSection>

          <CardSection style={{ flexDirection: 'column' }}>
            <Text style={styles.pickerTextStyle}>Shift</Text>
            <Picker
              selectedValue={shift}
              onValueChange={this.updateShift}
            >
              <Picker.Item label="Monday" value="Monday" />
              <Picker.Item label="Tuesday" value="Tuesday" />
              <Picker.Item label="Wednesday" value="Wednesday" />
              <Picker.Item label="Thursday" value="Thursday" />
              <Picker.Item label="Friday" value="Friday" />
              <Picker.Item label="Saturday" value="Saturday" />
              <Picker.Item label="Sunday" value="Sunday" />
            </Picker>
          </CardSection>

        </View>
      )
    }
}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20,
  },
}

const mapStateToPorps = (state) => {
  const { name, phone, shift } = state.employeeForm
  return { name, phone, shift }
}

export default connect(mapStateToPorps, { employeeUpdate })(EmployeeForm)

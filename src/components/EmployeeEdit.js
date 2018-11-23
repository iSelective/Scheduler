import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import EmployeeForm from './EmployeeForm'
import { employeeUpdate, employeeSave, employeeDelete } from '../actions'
import { Card, CardSection, Button, ModalConfirm } from './common'

class EmployeeEdit extends Component {
  state = { showModal: false }

  componentDidMount() {
    const { employee, employeeUpdate } = this.props
    _.each(employee, (value, prop) => {
      employeeUpdate({ prop, value })
    })
  }

  onButtonSavePress() {
    const { name, phone, shift, employee, employeeSave } = this.props
    employeeSave({ name, phone, shift, uid: employee.uid })
  }

  onAccept() {
    const { employeeDelete } = this.props
    const { uid } = this.props.employee
    employeeDelete({ uid })
  }

  onDecline() {
    this.setState({ showModal: false })
  }

  onButtonShowModal() {
    this.setState({ showModal: !this.state.showModal })
  }

  render() {
    return (
      <Card>
        <EmployeeForm />
        <CardSection>
          <Button onPress={this.onButtonSavePress.bind(this)}>
                        Save Changes
          </Button>
        </CardSection>

        {/* Every time the button is pressed, it sets the state of the modal to 'true', thus showing it */}
        <CardSection>
          <Button onPress={this.onButtonShowModal.bind(this)}>
            Delete Employee
          </Button>
        </CardSection>

        <ModalConfirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to permanently delete this?
        </ModalConfirm>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm
  return { name, phone, shift }
}

export default connect(mapStateToProps, { employeeUpdate, employeeSave, employeeDelete })(EmployeeEdit)

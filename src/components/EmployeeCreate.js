import React, { Component } from 'react'
import { connect } from 'react-redux'
import { employeeUpdate, employeeCreate, clearEmployeeForm } from '../actions'
import { Card, CardSection, Button } from './common'
import EmployeeForm from './EmployeeForm'

class EmployeeCreate extends Component {
  componentDidMount() {
    const { clearEmployeeForm } = this.props
    clearEmployeeForm()
  }

  onButtonPress() {
    const { name, phone, shift, employeeCreate } = this.props

    employeeCreate({ name, phone, shift: shift || 'Monday' }) // If a shift is not provided (empty), the return value is Monday by default
  }

  render() {
    return (
      <Card>
        <EmployeeForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
                    Create
          </Button>
        </CardSection>
      </Card>
    )
  }
}


const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm

  return { name, phone, shift }
}

export default connect(mapStateToProps, { employeeUpdate, employeeCreate, clearEmployeeForm })(EmployeeCreate)

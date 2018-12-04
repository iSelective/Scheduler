import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { emailChanged, passwordChanged, loginUser } from '../actions'
import {
  Card, CardSection, Input, Button, Spinner,
} from './common'

class LoginForm extends Component {
  constructor() {
    super()
    this.onButtonPress = this.onButtonPress.bind(this)
    this.onEmailChange = this.onEmailChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
  }

  onEmailChange(text) {
    const { emailChanged } = this.props
    emailChanged(text)
  }

  onPasswordChange(text) {
    const { passwordChanged } = this.props
    passwordChanged(text)
  }

  onButtonPress() {
    const { email, password, loginUser } = this.props
    loginUser({ email, password })
  }

  renderButton() {
    const { loading } = this.props
    if (loading) {
      return <Spinner size="large" />
    }
    return (
      <Button onPress={this.onButtonPress}>
                Login
      </Button>
    )
  }

  renderError() {
    const { error } = this.props
    if (error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {error}
          </Text>
        </View>
      )
    }
    return false
  }

  render() {
    const { email, password } = this.props
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange}
            value={email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange}
            value={password}
          />
        </CardSection>

        {this.renderError()}
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    )
  }
}
const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
}

const mapStateToProps = ({ authentication }) => {
  const {
    email, password, error, loading,
  } = authentication

  return {
    email, password, error, loading,
  }
}

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm)

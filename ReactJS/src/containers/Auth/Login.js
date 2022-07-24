import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'abc',
            password: 'abcabc',
            isShowPassword: false,
            errMessage: '',
        }
    }

    handleOnChangeUserName = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleOnClickLogin = async () => {
        this.setState({
            errMessage: '',
        });
        try {
            await handleLoginApi(this.state.username, this.state.password);
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message,
                    });
                }
            }
        }
    }

    handleOnClickEye = () => {
        if (this.state.isShowPassword) {
            this.setState({
                isShowPassword: false,
            })

        } else {
            this.setState({
                isShowPassword: true,
            })
        }
    }

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>Username:</label>
                            <input type="text" className="form-control" placeholder="Enter user name"
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUserName(event)} />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password:</label>
                            <div className="col-12 form-group password-input">
                                <input
                                    type={this.state.isShowPassword ? "text" : "password"} className="form-control" placeholder="Enter password"
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangePassword(event)} />
                                <span onClick={() => this.handleOnClickEye()}><i class={this.state.isShowPassword ? "fas fa-eye-slash" : "fas fa-eye"} ></i></span>

                            </div>
                        </div>
                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12 text-center">
                            <button className="btn-login"
                                onClick={() => this.handleOnClickLogin()}>Login</button>
                        </div>
                        <div className="col-12">
                            <span className="forgot-password">Forgot your password?</span>
                        </div>
                        <div className="col-12 text-center login-with">
                            <span className="">Or login with:</span>
                        </div>
                        <div className="col-12 social-login text-center">
                            <i class="fab fa-google col-1"></i>
                            <i class="fab fa-facebook-f col-1"></i>
                            <i class="fab fa-github col-1"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

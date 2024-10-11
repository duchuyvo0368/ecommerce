import PropTypes from "prop-types";
import React, {Fragment, useState} from "react";
import MetaTags from "react-meta-tags";
import {Link, useHistory} from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {FacebookLoginButton, GoogleLoginButton} from "react-social-login-buttons";
import {checkPhoneNumberEmail, handleLoginService} from "../../services/services";
import {toast} from "react-toastify";

const LoginRegister = ({ location }) => {
  const { pathname } = location;

  const [inputValues, setInputValues] = useState({
    email: '', password: 'passwordsecrect', lastName: '', phonenumber: '', isOpen: false, dataUser: {}
  });
  const handleOnChange = event => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });

  };
    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            let res = await handleLoginService({
                email: inputValues.email,
                password: inputValues.password
            });
            if (res && res.errCode === 0) {
                localStorage.setItem("userData", JSON.stringify(res.user));
                localStorage.setItem("token", JSON.stringify(res.accessToken));

                if (res.user.roleId === "R1" || res.user.roleId === "R4") {
                    window.location.href = "/admin";
                } else {
                    window.location.href = "/";
                }
            } else {
                toast.error(res.errMessage);
            }
        } catch (error) {
            console.error("Login failed:", error);
            toast.error("Có lỗi xảy ra trong quá trình đăng nhập");
        }
    };
  let handleLoginSocial = async (email) => {
    const element = document.querySelector('form');
    element.addEventListener('submit', event => {
      event.preventDefault();

    });
    let res = await handleLoginService({
      email: email,
      password: inputValues.password
    })

  }



  return (
      <Fragment>
        <MetaTags>
          <title>Flone | Login</title>
          <meta
              name="description"
              content="Compare page of flone react minimalist eCommerce template."
          />
        </MetaTags>
        <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
        <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
          Login Register
        </BreadcrumbsItem>
        <LayoutOne headerTop="visible">
          {/* breadcrumb */}

          <Breadcrumb />
          {inputValues.isOpen === false &&
          <div className="login-register-area pt-100 pb-100">
            <div className="container">
              <div className="row">
                <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                  <div className="login-register-wrapper">
                    <Tab.Container defaultActiveKey="login">
                      <Nav variant="pills" className="login-register-tab-list">
                        <Nav.Item>
                          <Nav.Link eventKey="login">
                            <h4>Login</h4>
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="register">
                            <h4>Register</h4>
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <Tab.Content>
                        <Tab.Pane eventKey="login">
                          <div className="login-form-container">
                            <div className="login-register-form">
                              <form onSubmit={handleLogin}>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={(event) => handleOnChange(event)}
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    onChange={(event) => handleOnChange(event)}
                                    placeholder="Password"
                                    required
                                />
                                <div className="button-box">
                                  <div className="login-toggle-btn">
                                    <input type="checkbox"/>
                                    <label className="ml-10">Remember me</label>
                                    <Link to={process.env.PUBLIC_URL + "/"}>
                                      Forgot Password?
                                    </Link>
                                  </div>
                                  <button className="submit btn btn-primary btn-block js-sign-in-button" type="submit">
                                      <span>Đăng nhập</span>
                                  </button>
                                  <div>
                                    <FacebookLoginButton className="facebook-btn" text="Đăng nhập với Facebook"
                                                         iconSize="15px"/>
                                    <GoogleLoginButton className="google-btn" text="Đăng nhập với Google"
                                                       iconSize="15px"/>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="register">
                          <div className="login-form-container">
                            <div className="login-register-form">
                              <form>
                                <input
                                    type="text"
                                    placeholder="Username"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                />
                                <input
                                    placeholder="Email"
                                    type="email"
                                />
                                <div className="button-box">
                                  <button type="submit">
                                    <span>Register</span>
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </div>
                </div>
              </div>
            </div>
          </div>
          }
        </LayoutOne>
      </Fragment>
  );
};

LoginRegister.propTypes = {
  location: PropTypes.object
};

export default LoginRegister;

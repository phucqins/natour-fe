import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { updateSettings } from "../utils/utils";
import { useDispatch } from "react-redux";
import { authActions } from "../store/index";

import Helmet from "../components/Helmet";
import UserNavBar from "../components/UserNavBar";
import AdminNavBar from "../components/AdminNavBar";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user);
  const token = useSelector((state) => state.authentication.token);

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const photoInputRef = useRef();

  const currentPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const infoChangeHandler = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", nameInputRef.current.value);
    form.append("email", emailInputRef.current.value);
    form.append("photo", photoInputRef.current.files[0]);
    // (form.getAll("name"));
    const data = await updateSettings(form, "data", token);
    data.data.user;
    dispatch(
      authActions.setUser({
        user: data.data.user,
      })
    );
  };

  const passwordChangeHandler = async (e) => {
    e.preventDefault();
    const updateData = {
      passwordCurrent: currentPasswordInputRef.current.value,
      password: newPasswordInputRef.current.value,
      passwordConfirm: confirmPasswordInputRef.current.value,
    };

    const data = await updateSettings(updateData, "password", token);

    dispatch(
      authActions.login({
        user: data.data.user,
        token: data.token,
      })
    );
  };

  // if (userPasswordForm)
  //   userPasswordForm.addEventListener('submit', async (e) => {
  //     e.preventDefault();
  //     document.querySelector('.btn--save-password').textContent = 'Updating...';

  //     const passwordCurrent = document.getElementById('password-current').value;
  //     const password = document.getElementById('password').value;
  //     const passwordConfirm = document.getElementById('password-confirm').value;
  //     await updateSettings(
  //       { passwordCurrent, password, passwordConfirm },
  //       'password'
  //     );

  //     document.querySelector('.btn--save-password').textContent =
  //       'Save password';
  //     document.getElementById('password-current').value = '';
  //     document.getElementById('password').value = '';
  //     document.getElementById('password-confirm').value = '';
  //   });
  if (user) {
    return (
      <Helmet title={user.name.split(" ")[0]}>
        <main className="main">
          <div className="user-view">
            <nav className="user-view__menu">
              <UserNavBar />
              {user.role === "admin" && <AdminNavBar />}
            </nav>
            <div className="user-view__content">
              <div className="user-view__form-container">
                <h2 className="heading-secondary ma-bt-md">
                  Your account settings
                </h2>
                <form
                  className="form form-user-data"
                  onSubmit={infoChangeHandler}
                >
                  <div className="form__group">
                    <label className="form__label" htmlFor="name">
                      Name
                    </label>
                    <input
                      className="form__input"
                      id="name"
                      name="name"
                      required="required"
                      type="text"
                      defaultValue={user.name}
                      ref={nameInputRef}
                    />
                  </div>
                  <div className="form__group ma-bt-md">
                    <label className="form__label" htmlFor="email">
                      Email address
                    </label>
                    <input
                      className="form__input"
                      id="email"
                      name="email"
                      required="required"
                      type="email"
                      defaultValue={user.email}
                      ref={emailInputRef}
                    />
                  </div>
                  <div className="form__group form__photo-upload">
                    <img
                      alt="User"
                      className="form__user-photo"
                      src={`https://natours.s3.ap-southeast-1.amazonaws.com/${user.photo}`}
                    />
                    <input
                      accept="image/*"
                      className="form__upload"
                      id="photo"
                      name="photo"
                      type="file"
                      ref={photoInputRef}
                    />
                    <label htmlFor="photo">Choose new photo</label>
                  </div>
                  <div className="form__group right">
                    <button className="btn btn--small btn--green">
                      Save settings
                    </button>
                  </div>
                </form>
              </div>
              <div className="line">&nbsp;</div>
              <div className="user-view__form-container">
                <h2 className="heading-secondary ma-bt-md">Password change</h2>
                <form
                  className="form form-user-password"
                  onSubmit={passwordChangeHandler}
                >
                  <div className="form__group">
                    <label className="form__label" htmlFor="password-current">
                      Current password
                    </label>
                    <input
                      className="form__input"
                      id="password-current"
                      minLength="8"
                      placeholder="••••••••"
                      required="required"
                      type="password"
                      ref={currentPasswordInputRef}
                    />
                  </div>
                  <div className="form__group">
                    <label className="form__label" htmlFor="password">
                      New password
                    </label>
                    <input
                      className="form__input"
                      id="password"
                      minLength="8"
                      placeholder="••••••••"
                      required="required"
                      type="password"
                      ref={newPasswordInputRef}
                    />
                  </div>
                  <div className="form__group ma-bt-lg">
                    <label className="form__label" htmlFor="password-confirm">
                      Confirm password
                    </label>
                    <input
                      className="form__input"
                      id="password-confirm"
                      minLength="8"
                      placeholder="••••••••"
                      required="required"
                      type="password"
                      ref={confirmPasswordInputRef}
                    />
                  </div>
                  <div className="form__group right">
                    <button className="btn btn--small btn--green btn--save-password">
                      Save password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </Helmet>
    );
  } else {
    return <div className="">Please log in again!</div>;
  }
};

export default UserProfile;

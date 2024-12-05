import React, { ChangeEvent, ReactEventHandler, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../AccountDetails/AccountDetails.css";
import EditSVG from "../../../../components/SVGs/EditSVG";
import { AppDispatch, RootState } from "../../../../redux/Store";
import "./AccountEditForm.css";
import { ValidatedTextInput } from "../../../../components/ValidateInput/ValidatedTextInput";
import { validEmail } from "../../../../services/validator";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { updateEmail } from "../../../../redux/Slices/UserSlice";
import { useNavigate } from "react-router-dom";
import { error } from "console";
import { unwrapResult } from "@reduxjs/toolkit";
export const AccountEditFormEmail: React.FC = () => {
  const stateUser = useSelector((state: RootState) => state.user);

  const [valid, setValid] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  const state = useSelector((state: RootState) => state.user);
  const dispatcher: AppDispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    setValid(validEmail(e.target.value));
  };

  const update = () => {
    setValid(validEmail(email));
    if (state.loggedIn && valid && email) {
      dispatcher(updateEmail({ email: state.loggedIn.email, newEmail: email }))
        .then(unwrapResult)
        .then(() => {
          if (!stateUser.error) {
            navigate("/account");
          }
        })
        .catch(() => {});
    }
  };

  return (
    <div className="account-details-container">
      <h1>Change Your Email</h1>
      <div className="account-edit-form">
        {stateUser.error ? (
          <div className="account-edit-form-row">
            <div>{stateUser.errorMessage}</div>
          </div>
        ) : (
          <></>
        )}

        <div className="account-edit-form-row">
          <h4 className="account-edit-form-row-title">Current Email Address</h4>
          <p className="account-edit-form-row-text">
            {stateUser.loggedIn?.email}
          </p>
        </div>
        <div className="account-edit-form-row">
          <ValidatedTextInput
            valid={valid}
            name="email"
            label="Email Adress"
            changeValue={handleChange}
          />
          {valid ? (
            <></>
          ) : (
            <span className="error">
              <ErrorOutlineIcon /> Please enter a valid email.
            </span>
          )}
        </div>
        <div className="account-edit-form-row">
          <div className="account-edit-form-row-button" onClick={update}>
            Save
          </div>
          <div
            className="account-edit-form-row-button"
            onClick={() => {
              navigate("/account");
            }}
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

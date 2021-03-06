import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { updatePet, getPetByPetId } from '../../../../state/actions/index';
import { useOktaAuth } from '@okta/okta-react';
import { useParams, useHistory } from 'react-router-dom';
import { Input, Button } from 'antd';

// styles
import './UpdatePetForm.css';

// Photos
import logo from '../../../../assets/GroomerExpressLogo.png';

const UpdatePetForm = props => {
  let Params = useParams();
  let History = useHistory();
  const { authState } = useOktaAuth();
  const { id } = useParams();

  const [data, setData] = useState({
    name: '',
    type: '',
    photo: '',
    notes: '',
  });

  useEffect(() => {
    props.getPetByPetId(Params.id, authState);
  }, [id]);

  const handleChange = e => {
    const newData = {
      ...data,
      [e.target.name]: e.target.value,
    };
    setData(newData);
  };

  const handleSubmit = e => {
    e.preventDefault();
    let userResponse = window.confirm(
      `Are you sure you'd like to change ${Params.name}'s information?`
    );
    const updatedPetData = {
      ...props.petFoundById,
      id: Params.id,
      name: data.name,
      type: data.type,
      photo: data.photo,
      notes: data.notes,
    };
    if (userResponse === true) {
      props.updatePet(updatedPetData, authState);
      return History.push('/PetPortal');
    } else {
      return History.push('/PetPortal');
    }
  };

  const handleCancel = e => {
    e.preventDefault();
    History.push('/PetPortal');
  };

  const handleDashboardClick = () => {
    History.push('/');
  };

  return (
    <div className="updatePetContainer">
      <div className="PetManagementHeader">
        <img
          className="logo"
          onClick={handleDashboardClick}
          src={logo}
          alt="Express Groomer Logo."
        />
      </div>
      <form className="updatePetForm">
        <div className="inputContainer">
          <label className="formLabel">
            Name:
            <Input
              className="input"
              type="text"
              placeholder={props.petFoundById.name}
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          </label>
          <label className="formLabel">
            Type:
            <Input
              className="input"
              type="text"
              placeholder={props.petFoundById.type}
              name="type"
              value={data.type}
              onChange={handleChange}
            />
          </label>
          <label className="formLabel">
            Photo src:
            <Input
              className="input"
              type="text"
              placeholder={props.petFoundById.photo}
              name="photo"
              value={data.photo}
              onChange={handleChange}
            />
          </label>
          <label className="formLabel">
            Notes:
            <Input
              className="input"
              type="text"
              placeholder={props.petFoundById.notes}
              name="notes"
              value={data.notes}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="btnContainer">
          <Button className="canBtn" onClick={handleCancel}>
            Cancel
          </Button>
          {data.name && data.type && data.photo && data.notes ? (
            <Button className="subBtn submit" onClick={handleSubmit}>
              Submit
            </Button>
          ) : (
            <div className="subBtn">Submit</div>
          )}
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    petFoundById: state.petFoundById,
  };
};

export default connect(mapStateToProps, { updatePet, getPetByPetId })(
  UpdatePetForm
);

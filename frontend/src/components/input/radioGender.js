const RadioGender = ({ handleRegisterChange }) => {
  return (
    <div className="reg_grid">
      <label htmlFor="male">
        <span> Male</span>
        <input
          type="radio"
          name="gender"
          id="male"
          value="male"
          checked
          onChange={handleRegisterChange}
        />
      </label>
      <label htmlFor="female">
        <span>Female</span>
        <input
          type="radio"
          name="gender"
          id="female"
          value="female"
          onChange={handleRegisterChange}
        />
      </label>
    </div>
  );
};

export default RadioGender;

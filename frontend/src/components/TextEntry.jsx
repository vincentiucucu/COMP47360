const BasicTextEntry = (props) => {
  return (
    <div>
      <input
        className='BasicTextEntry'
        type={props.type}
        placeholder={props.placeholder}
        // value={foodTruckName}
      />
    </div>
  );
};

export default BasicTextEntry;

const Button = (props) => {
    return (
        <button className={props.className} onClick={props.onClick}>{props.btnName}</button>
    );
}

export default Button;

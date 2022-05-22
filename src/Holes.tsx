import { Button } from "@mui/material";

import "./Holes.css";

interface IHolesProps {
    quantity: number;
    clickHandler: CallableFunction;
}

const Holes = ({quantity, clickHandler}: IHolesProps) => {
    return (
        <div className="holes">
        {new Array(quantity).fill(null).map((item, index) => (<Button variant="outlined" key={index} onClick={() => clickHandler(index)}>Hole № {index}</Button>))}
        </div>
    );
};

export default Holes;
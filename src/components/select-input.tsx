import {Input, Label, Row} from "reactstrap";
import React from "react";

interface SelectInputProps {
    name: string;
    labelName: string;
    value: any;
    arrayOption: string[];
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SelectInput: React.FC<SelectInputProps> = props => {
    const {labelName, name, value, arrayOption, handleChange} = props;

    return (
        <Row className={"mt-1"}>
            <Label for={labelName}>{labelName}</Label>
            <Input
                name={name}
                required
                type="select"
                value={value}
                onChange={handleChange}
            >
                {arrayOption.length > 0 &&
                    arrayOption.map(option => <option key={option}>{option}</option>)}
            </Input>
        </Row>
    );
};

export default SelectInput;

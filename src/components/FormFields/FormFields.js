import React, { useState } from 'react';
import './FormFields.css'
import CustomHTML from "../CustomHTML/CustomHTML";

function FormFields({fields, showErrors}) {
    const getFieldValues = () => {
        return fields.map( field => field.getValue() );
    };

    const [fieldValues, setFieldValues] = useState(getFieldValues());

    const onChangeHandler = (event, field) => {
        field.setValue(event.target.value);
        setFieldValues(getFieldValues());
    };

    const getFieldClass = (field) => {
        return showErrors && !field.isValid()?'invalid':null;
    };

    const fieldsComp = fields.map( (field,i) => (
        <li key={i} className={getFieldClass(field)}>
            <label>
                <CustomHTML html={field.getTitle()} />
            </label>
            <input type="text" value={fieldValues[i]} onChange={ (event) => onChangeHandler(event, field) }  />
        </li>
    ));

    return (
        <ul className="form-fields">
            {fieldsComp}
        </ul>
    );
}

export default FormFields;
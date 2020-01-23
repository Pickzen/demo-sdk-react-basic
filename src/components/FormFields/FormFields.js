import React, { useState } from 'react';
import './FormFields.css'
import CustomHTML from "../CustomHTML/CustomHTML";

function FormFields({fields, showErrors}) {
    const getFieldValues = () => {
        return fields.map( field => field.getValue() );
    };

    const [fieldValues, setFieldValues] = useState(getFieldValues());

    const onChangeHandler = (event, field) => {
        if (field.getType()==='checkbox') {
            field.setValue(event.target.checked);
        } else {
            field.setValue(event.target.value);
        }

        setFieldValues(getFieldValues());
    };

    const getFieldErrorClass = (field) => {
        return showErrors && !field.isValid()?'invalid':'';
    };

    const fieldsComp = fields.map( (field,i) => {
        const type = field.getType();

        let el;
        if (type==='checkbox') {
            el = (
                <label>
                    <CustomHTML className="title" html={field.getTitle()} />
                    <input type="checkbox" checked={fieldValues[i]} onChange={ (event) => onChangeHandler(event, field) }  />
                </label>
            );
        } else {
            el = (
                <>
                    <label>
                        <CustomHTML className="title" html={field.getTitle()} />
                    </label>
                    <input type="text" value={fieldValues[i]} onChange={ (event) => onChangeHandler(event, field) }  />
                </>
            )
        }

        return (
            <li key={i} className={`${field.getType()} ${getFieldErrorClass(field)}`}>
                {el}
            </li>);
    });

    return (
        <ul className="form-fields">
            {fieldsComp}
        </ul>
    );
}

export default FormFields;
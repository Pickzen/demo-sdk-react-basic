import React, { useState } from 'react';
import './FormFields.css'
import CustomHTML from "../CustomHTML/CustomHTML";

function FormFields({fields, showErrors}) {
    const getFieldValues = () => {
        return fields.map( field => field.getValue() );
    };

    const [fieldValues, setFieldValues] = useState(getFieldValues());

    const onChangeHandler = (event, field) => {
        let type = field.getType();

        if (type==='checkbox') {
            field.setValue(event.target.checked);
        } else if (type==='selector') {

            if(true){
                field.setValue(event.target.value)
            }else{
                event.target.checked?field.setValue(event.target.value):field.removeValue(event.target.value);
            }

        } else if (type==='dropdown') {
            field.setValue(event.target.value);
        } else {
            field.setValue(event.target.value);
        }
        setFieldValues(getFieldValues());
        console.log(getFieldValues())
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
                    <CustomHTML className="title" html={field.getTitle()}/>
                    <input type="checkbox" checked={fieldValues[i]}
                           onChange={(event) => onChangeHandler(event, field)}/>
                </label>
            );
        } else if (type==='selector') {
            if (true){
                const getProgessPercentage = () =>{
                    return !field.getValue()
                    ?0
                    :Math.floor(field.getOptions().findIndex((e)=>e.id === field.getValue())/(field.getOptions().length - 1) * 100)
                }

                el = (
                    <>
                        <div className='slider'>
                            <div className='progress' style={{width:getProgessPercentage() + '%'}}/>
                            <div className='thumb-progress' style={{width:getProgessPercentage() + 2 + '%'}}>
                                <div className='thumb'/>
                            </div>
          
                            <div className='steps'>
                                {field.getOptions().map((o)=>{
                                    return <input type='radio' value={o.getId()} onClick={(event) => {event.preventDefault();onChangeHandler(event, field)}} key={o.getId()}/>
                                })}
                            </div> 
                            <div className='legend'>
                                {field.getOptions().map((o,i)=>{
                                    return <p className={`${field.getValue()===o.getId()?'selected':''}`} key={o.getId()}>{o.getTitle()}</p>
                                })}
                            </div> 
                        </div>
                    </>
                )
            }else{
                el = (
                    <>
                        <label>
                            <CustomHTML className="title" html={field.getTitle()}/>
                        </label>
    
                        {
                            field.getOptions().map(o => {
                                return (
                                    <span key={o.getId()}>
                                        <input type={field.isMultiple() ? 'checkbox' : 'radio'}
                                               value={o.getId()} name={field.getId()}
                                               onChange={(event) => onChangeHandler(event, field)} />
                                        <label htmlFor={o.getId()}>{o.getTitle()}</label>
                                    </span>
                                )
                            })
                        }
    
                    </>
    
                );
            }



        } else if (type==='dropdown') {
            el = (
                <>
                    <label>
                        <CustomHTML className="title" html={field.getTitle()}/>
                    </label>

                    <select defaultValue="0" onChange={(event) => onChangeHandler(event, field)}>
                        <option disabled value="0">Select...</option>
                        {field.getOptions().map(o => <option value={o.getId()} key={o.getId()}>{o.getTitle()}</option>)}
                    </select>

                </>

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
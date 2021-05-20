import React, {useState} from 'react';
import CustomHTML from "../CustomHTML/CustomHTML";
import './Result.css'

const Result = ({value:result}) => {
	const [id, setId] = useState(result.getId());
	const [image, setImage] = useState(result.getImage(true));
	const [title, setTitle] = useState(result.getTitle());
	const [price, setPrice] = useState(result.getLocalizedPrice());

	const selectVariantHandler = (variantId) => {
		const variant = result.getVariant(variantId);
		setId(variant.getId());
		setImage(variant.getImage(true));
		setPrice(variant.getLocalizedPrice());
	}

	const selectResultHandler = (id) => {
		alert(`Selected result ${id}`);
	}

	const getVariantsSelector = () => {
		return (
			<select onChange={(e) => selectVariantHandler(e.target.value)}>
				{
					result.getVariants().map( (variant, index) => {
						return <option key={variant.getId()} value={variant.getId()}>{variant.getTitle()}</option>
					})
				}
			</select>
		)
	}

	return (
		<div className="result">
			<div className="image" style={{backgroundImage:`url(${image})`}}></div>

			<CustomHTML html={title} />

			<div className="price">{price}</div>

			{result.hasVariants()?getVariantsSelector():null}

			<button onClick={ (e) => selectResultHandler(id)}>Select</button>
		</div>
	)
};

export default Result;
import React, {useEffect, useState} from 'react';
import CustomHTML from "../CustomHTML/CustomHTML";
import './Result.css'

const Result = ({value}) => {
	const [result, setResult] = useState(value);

	useEffect( () => {
		if (result.hasVariants()) {
			// Preselects the first variant
			let firstVariantId = result.getFirstVariant().getId();
			selectVariantHandler(firstVariantId);
		}
	}, []);

	const selectVariantHandler = (variantId) => {
		let updatedResult = result.setVariant(variantId);
		setResult(updatedResult);
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
			<div className="image" style={{backgroundImage:`url(${result.getImage()})`}}></div>

			<CustomHTML html={result.getTitle()} />

			<div className="price">{result.getLocalizedPrice()}</div>

			{result.hasVariants()?getVariantsSelector():null}

			<button onClick={ (e) => selectResultHandler(result.getId())}>Select</button>
		</div>
	)
};

export default Result;
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {filters} from '../../../../../../../Others/filter.js';
import {dataArrayTypes} from '../../../../../../../Others/dataArray.js';

import warpByVectorActions from '../../../../../../../Actions/visualizationParameters/filters/warpByVector/warpByVector.js';

import Select from '../../../../../../Helpers/FormElements/Select/Select.js';
import ValidationInput from '../../../../../../Helpers/FormElements/ValidationInput/ValidationInput.js';

import './WarpByVectorParameters.less';

export class WarpByVectorParameters extends Component {

	/* Generic */

	constructor(props) {
		super(props);

		/* Attributes */
	}

	render() {

		/* Element */

		const element = (
			<tbody
				className="WarpByVectorParameters"
			>
				<tr
					className="fieldLine"
				>
					<td
						className="fieldLabel"
					>
						Vectors
					</td>
					<td
						className="fieldEditor"
					>
						<Select
							value={this.props.vectors}
							options={this.props.pointArrays.map((pointArray) => {
								return {
									text: pointArray.name,
									value: pointArray.name,
								};
							})}
							action={(vectors) => {
								this.setVectors(vectors);
							}}
						/>
					</td>
				</tr>
				<tr
					className="fieldLine"
				>
					<td
						className="fieldLabel"
					>
						ScaleFactors
					</td>
					<td
						className="fieldEditor"
					>
						<ValidationInput
							type="number"
							value={this.props.scaleFactor}
							action={(scaleFactor) => {
								this.setScaleFactor(scaleFactor);
							}}
						/>
					</td>
				</tr>
			</tbody>
		);

		/* Return */

		return element;
	}

	/* Specific */

	setVectors(vectors) {
		this.props.client.Viewer.setWarpByVectorFilterVectors(vectors).then((result) => {
			if(result)
			{
				this.props.setVectors(vectors);
			}
		});
	}

	setScaleFactor(scaleFactor) {
		this.props.client.Viewer.setWarpByVectorFilterScaleFactor(scaleFactor).then((result) => {
			if(result)
			{
				this.props.setScaleFactor(scaleFactor);
			}
		});
	}
}

WarpByVectorParameters.propTypes = {
	client: PropTypes.object.isRequired,
	pointArrays: PropTypes.array.isRequired,
	vectors: PropTypes.string.isRequired,
	setVectors: PropTypes.func.isRequired,
	scaleFactor: PropTypes.number.isRequired,
	setScaleFactor: PropTypes.func.isRequired,
};

WarpByVectorParameters.defaultProps = {
};

export default connect(
	(state) => {
		return {
			client: state.connection.client,
			pointArrays: state.visualizationParameters.dataArrays.filter((dataArray) => {
				return dataArray.type === dataArrayTypes.point;
			}),
			vectors: state.visualizationParameters.filters.parameters[filters.warpByVector].vectors,
			scaleFactor: state.visualizationParameters.filters.parameters[filters.warpByVector].scaleFactor,
		};
	},
	(dispatch) => {
		return {
			setVectors: (vectors) => {
				dispatch(warpByVectorActions.setVectors(vectors));
			},
			setScaleFactor: (scaleFactor) => {
				dispatch(warpByVectorActions.setScaleFactor(scaleFactor));
			},
		};
	}
)(WarpByVectorParameters);
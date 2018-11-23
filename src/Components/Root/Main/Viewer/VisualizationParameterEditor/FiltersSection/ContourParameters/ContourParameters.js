import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {filters} from '../../../../../../../Others/filter.js';
import {dataArrayTypes} from '../../../../../../../Others/dataArray.js';

import contourActions from '../../../../../../../Actions/visualizationParameters/filters/contour/contour.js';

import Select from '../../../../../../Helpers/FormElements/Select/Select.js';
import ValidationListInput from '../../../../../../Helpers/FormElements/ValidationListInput/ValidationListInput.js';

import './ContourParameters.less';

export class ContourParameters extends Component {

	/* Generic */

	constructor(props) {
		super(props);

		/* Attributes */
	}

	render() {

		/* Element */

		const element = (
			<tbody
				className="ContourParameters"
			>
				<tr
					className="fieldLine"
				>
					<td
						className="fieldLabel"
					>
						Data
					</td>
					<td
						className="fieldEditor"
					>
						<Select
							value={this.props.data.pointArrayName}
							options={this.props.pointArrays.map((pointArray) => {
								return {
									text: pointArray.name,
									value: pointArray.name,
								};
							})}
							action={(pointArrayName) => {
								this.setData(pointArrayName, this.props.data.field);
							}}
						/>
						<Select
							value={this.props.data.field}
							options={[
								{
									text: 'Mag',
									value: 'mag',
								},
								{
									text: 'X',
									value: 'X',
								},
								{
									text: 'Y',
									value: 'Y',
								},
								{
									text: 'Z',
									value: 'Z',
								},
							]}
							action={(field) => {
								this.setData(this.props.data.pointArrayName, field);
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
						Values
					</td>
					<td
						className="fieldEditor"
					>
						<ValidationListInput
							type="number"
							placeholder="Values"
							values={this.props.values}
							action={(values) => {
								this.setValues(values);
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

	setData(pointArrayName, field) {
		this.props.client.Viewer.setContourFilterData(pointArrayName, field).then((result) => {
			if(result)
			{
				this.props.setData({
					pointArrayName: pointArrayName,
					field: field,
				});
			}
		});
	}

	setValues(values) {
		this.props.client.Viewer.setContourFilterValues(values).then((result) => {
			if(result)
			{
				this.props.setValues(values);
			}
		});
	}
}

ContourParameters.propTypes = {
	client: PropTypes.object.isRequired,
	pointArrays: PropTypes.array.isRequired,
	data: PropTypes.shape({
		pointArrayName: PropTypes.string.isRequired,
		field: PropTypes.string.isRequired,
	}).isRequired,
	setData: PropTypes.func.isRequired,
	values: PropTypes.arrayOf(PropTypes.number).isRequired,
	setValues: PropTypes.func.isRequired,
};

ContourParameters.defaultProps = {
};

export default connect(
	(state) => {

		return {
			client: state.connection.client,
			pointArrays: state.visualizationParameters.dataArrays.filter((dataArray) => {
				return dataArray.type === dataArrayTypes.point;
			}),
			data: state.visualizationParameters.filters.parameters[filters.contour].data,
			values: state.visualizationParameters.filters.parameters[filters.contour].values,
		};
	},
	(dispatch) => {
		return {
			setData: (data) => {
				dispatch(contourActions.setData(data));
			},
			setValues: (values) => {
				dispatch(contourActions.setValues(values));
			},
		};
	}
)(ContourParameters);
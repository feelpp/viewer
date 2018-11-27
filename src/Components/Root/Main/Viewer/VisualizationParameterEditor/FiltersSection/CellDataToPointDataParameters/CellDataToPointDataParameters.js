import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {filters} from '../../../../../../../Others/filter.js';
import {dataArrayTypes} from '../../../../../../../Others/dataArray.js';

import cellDataToPointDataActions from '../../../../../../../Actions/visualizationParameters/filters/cellDataToPointData/cellDataToPointData.js';

import Select from '../../../../../../Helpers/FormElements/Select/Select.js';
import ValidationListInput from '../../../../../../Helpers/FormElements/ValidationListInput/ValidationListInput.js';

import './CellDataToPointDataParameters.less';

export class CellDataToPointDataParameters extends Component {

	/* Generic */

	constructor(props) {
		super(props);

		/* Attributes */
	}

	render() {

		/* Element */

		const element = (
			<tbody
				className="CellDataToPointDataParameters"
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
							value={this.props.data.cellArrayName}
							options={this.props.cellArrays.map((cellArray) => {
								return {
								        text: cellArray.name,
									value: cellArray.name,
								};
							})}
							action={(cellArrayName) => {
							    this.setData(cellArrayName, this.props.data.field);
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
								this.setData(this.props.data.cellArrayName, field);
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

	setData(cellArrayName, field) {
		this.props.client.Viewer.setCellDataToPointDataFilterData(cellArrayName, field).then((result) => {
			if(result)
			{
				this.props.setData({
					cellArrayName: cellArrayName,
					field: field,
				});
			}
		});
	}

	setValues(values) {
		this.props.client.Viewer.setCellDataToPointDataFilterValues(values).then((result) => {
			if(result)
			{
				this.props.setValues(values);
			}
		});
	}
}

CellDataToPointDataParameters.propTypes = {
	client: PropTypes.object.isRequired,
	cellArrays: PropTypes.array.isRequired,
	data: PropTypes.shape({
		cellArrayName: PropTypes.string.isRequired,
		field: PropTypes.string.isRequired,
	}).isRequired,
	setData: PropTypes.func.isRequired,
	values: PropTypes.arrayOf(PropTypes.number).isRequired,
	setValues: PropTypes.func.isRequired,
};

CellDataToPointDataParameters.defaultProps = {
};

export default connect(
	(state) => {

		return {
			client: state.connection.client,
			cellArrays: state.visualizationParameters.dataArrays.filter((dataArray) => {
				return dataArray.type === dataArrayTypes.cell;
			}),
			data: state.visualizationParameters.filters.parameters[filters.cellDataToPointData].data,
			values: state.visualizationParameters.filters.parameters[filters.cellDataToPointData].values,
		};
	},
	(dispatch) => {
		return {
			setData: (data) => {
				dispatch(cellDataToPointDataActions.setData(data));
			},
			setValues: (values) => {
				dispatch(cellDataToPointDataActions.setValues(values));
			},
		};
	}
)(CellDataToPointDataParameters);

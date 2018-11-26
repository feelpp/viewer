import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {filters, filterNames} from '../../../../../../Others/filter.js';

import visualizationParametersActions from '../../../../../../Actions/visualizationParameters/visualizationParameters.js';
import filtersActions from '../../../../../../Actions/visualizationParameters/filters/filters.js';
import warpByVectorActions from '../../../../../../Actions/visualizationParameters/filters/warpByVector/warpByVector.js';
import contourActions from '../../../../../../Actions/visualizationParameters/filters/contour/contour.js';

import WarpByVectorParameters from './WarpByVectorParameters/WarpByVectorParameters.js';
import ContourParameters from './ContourParameters/ContourParameters.js';
import PanelSection from '../../../../../Helpers/Panel/PanelSection/PanelSection.js';
import Select from '../../../../../Helpers/FormElements/Select/Select.js';
import Switch from '../../../../../Helpers/FormElements/Switch/Switch.js';

import './FiltersSection.less';

export class FiltersSection extends Component {

	/* Generic */

	constructor(props) {
		super(props);

		/* Attributes */
	}

	render() {

		/* FilterParameters */

		let filterParameters = null;

		if(this.props.filter === filters.warpByVector)
		{
			filterParameters = (
				<WarpByVectorParameters/>
			);
		}
		else if(this.props.filter === filters.contour)
		{
			filterParameters = (
				<ContourParameters/>
			);
		}

		/* Element */

		const element = (
			<div
				className="FiltersSection"
			>
				<PanelSection
					label="Filters"
					initialOpenStatus={this.props.initialOpenStatus}
				>
					<table
						className="fields"
					>
						<tbody>
							<tr
								className="fieldLine"
							>
								<td
									className="fieldLabel"
								>
									Display original data
								</td>
								<td
									className="fieldEditor"
								>
									<Switch
										value={this.props.dataDisplayStatus}
										disabled={this.props.filter === null}
										action={(dataDisplayStatus) => {
											this.setDataDisplayStatus(dataDisplayStatus);
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
									Filter
								</td>
								<td
									className="fieldEditor"
								>
									<Select
										value={this.props.filter}
										options={[
											{
												text: 'No filter',
												value: null,
											},
											{
												text: filterNames[filters.warpByVector],
												value: filters.warpByVector,
											},
											{
												text: filterNames[filters.contour],
												value: filters.contour,
											},
										]}
										action={(filter) => {
											this.setFilter(filter);
										}}
									/>
								</td>
							</tr>
						</tbody>
						{filterParameters}
					</table>
				</PanelSection>
			</div>
		);

		/* Return */

		return element;
	}

	/* Specific */

	setDataDisplayStatus(dataDisplayStatus) {
		this.props.client.Viewer.setDataDisplayStatus(dataDisplayStatus).then((result) => {
			if(result.value)
			{
				this.props.setDataDisplayStatus(dataDisplayStatus);
			}
		});
	}

	setFilter(filter) {
		if(filter === filters.warpByVector)
		{
			this.props.client.Viewer.enableWarpByVectorFilter().then((result) => {
				if(result.value)
				{
					/* Set parameters */

					this.props.setWarpByVectorFilterVectors(result.data.vectors);
					this.props.setWarpByVectorFilterScaleFactor(result.data.scaleFactor);

					/* Set filter */

					this.props.setFilter(filter);
				}
			});
		}
		else if(filter === filters.contour)
		{
			this.props.client.Viewer.enableContourFilter().then((result) => {
				if(result.value)
				{
					/* Set parameters */

					this.props.setContourFilterData(result.data.data);
					this.props.setContourFilterValues(result.data.values);

					/* Set filter */

					this.props.setFilter(filter);
				}
			});
		}
		else
		{
			this.props.client.Viewer.disableCurrentFilter().then(() => {

				/* Set filter */

				this.props.setFilter(filter);

				/* Display data */

				this.setDataDisplayStatus(true);
			});
		}
	}
}

FiltersSection.propTypes = {
	initialOpenStatus: PropTypes.bool,

	client: PropTypes.object.isRequired,
	dataDisplayStatus: PropTypes.bool.isRequired,
	setDataDisplayStatus: PropTypes.func.isRequired,
	filter: PropTypes.string,
	setFilter: PropTypes.func.isRequired,
	setWarpByVectorFilterVectors: PropTypes.func.isRequired,
	setWarpByVectorFilterScaleFactor: PropTypes.func.isRequired,
	setContourFilterData: PropTypes.func.isRequired,
	setContourFilterValues: PropTypes.func.isRequired,
};

FiltersSection.defaultProps = {
	initialOpenStatus: null,
};

export default connect(
	(state) => {
		return {
			initialOpenStatus: state.configuration.visualizationParameterEditor.sections.filters.initialOpenStatus,
			client: state.connection.client,
			dataDisplayStatus: state.visualizationParameters.dataDisplayStatus,
			filter: state.visualizationParameters.filters.filter,
		};
	},
	(dispatch) => {
		return {
			setDataDisplayStatus: (dataDisplayStatus) => {
				dispatch(visualizationParametersActions.setDataDisplayStatus(dataDisplayStatus));
			},
			setFilter: (filter) => {
				dispatch(filtersActions.setFilter(filter));
			},
			setWarpByVectorFilterVectors: (vectors) => {
				dispatch(warpByVectorActions.setVectors(vectors));
			},
			setWarpByVectorFilterScaleFactor: (scaleFactor) => {
				dispatch(warpByVectorActions.setScaleFactor(scaleFactor));
			},
			setContourFilterData: (data) => {
				dispatch(contourActions.setData(data));
			},
			setContourFilterValues: (values) => {
				dispatch(contourActions.setValues(values));
			},
		};
	}
)(FiltersSection);
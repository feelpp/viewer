import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {filters, filterNames} from '../../../../../../Others/filter.js';

import filtersActions from '../../../../../../Actions/visualizationParameters/filters/filters.js';
import warpByVectorActions from '../../../../../../Actions/visualizationParameters/filters/warpByVector/warpByVector.js';

import WarpByVectorParameters from './WarpByVectorParameters/WarpByVectorParameters.js';
import PanelSection from '../../../../../Helpers/Panel/PanelSection/PanelSection.js';
import Select from '../../../../../Helpers/FormElements/Select/Select.js';

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

	setFilter(filter) {
		if(filter === filters.warpByVector)
		{
			this.props.client.Viewer.enableWarpByVectorFilter().then((result) => {
				if(result.value)
				{
					/* Set parameters */

					this.props.setVectors(result.data.vectors);
					this.props.setScaleFactor(result.data.scaleFactor);

					/* Set filter */

					this.props.setFilter(filter);
				}
			});
		}
		else
		{
			this.props.client.Viewer.disableCurrentFilter().then(() => {
				this.props.setFilter(filter);
			});
		}
	}
}

FiltersSection.propTypes = {
	initialOpenStatus: PropTypes.bool,

	client: PropTypes.object.isRequired,
	filter: PropTypes.string,
	setFilter: PropTypes.func.isRequired,
	setVectors: PropTypes.func.isRequired,
	setScaleFactor: PropTypes.func.isRequired,
};

FiltersSection.defaultProps = {
	initialOpenStatus: null,
};

export default connect(
	(state) => {
		return {
			initialOpenStatus: state.configuration.visualizationParameterEditor.sectionInitialOpenStatus.filters,
			client: state.connection.client,
			filter: state.visualizationParameters.filters.filter,
		};
	},
	(dispatch) => {
		return {
			setFilter: (filter) => {
				dispatch(filtersActions.setFilter(filter));
			},
			setVectors: (vectors) => {
				dispatch(warpByVectorActions.setVectors(vectors));
			},
			setScaleFactor: (scaleFactor) => {
				dispatch(warpByVectorActions.setScaleFactor(scaleFactor));
			},
		};
	}
)(FiltersSection);
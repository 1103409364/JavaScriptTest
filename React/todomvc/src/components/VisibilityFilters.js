import React from "react";
import { connect } from "react-redux";
import { setFilter } from "../redux/actions";
import { VISIBILITY_FILTERS } from "../constants";

// 函数式定义的过滤器组件,props解构赋值传入activeFilter, setFilter
const VisibilityFilters = ({ activeFilter, setFilter }) => {
	return (
		<div className="visiblity-filters" >
			{Object.keys(VISIBILITY_FILTERS).map(filterKey => {
				const currentFilter = VISIBILITY_FILTERS[filterKey];
				
				return (
					<span
						key={`visibility-filter-${currentFilter}`}
						className={
							currentFilter !== activeFilter? "filter":"filter filter--active"
						}
						onClick={() => {
							setFilter(currentFilter);
						}}
					>
						{currentFilter}
					</span>
				);
			})}
		</div>
	)
}

const mapStateToProps = state => {
	return { activeFilter: state.visibilityFilter };
};
// export default VisibilityFilters;
export default connect(
	mapStateToProps,
	{ setFilter }
)(VisibilityFilters);
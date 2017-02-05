import * as ng from 'angular';

export function InputDateDirectiveFactory($filter: ng.IFilterService) {
	'ngInject';

	const date = $filter('date');
	const format = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(19|20)\d\d$/;

	return {
		restrict: 'A',
		require: 'ngModel',

		link: (scope: ng.IScope, element: JQuery, attrs: ng.IAttributes, ctrl: ng.INgModelController) => {
			ctrl.$formatters.push((value: Date) => date(value, 'dd.MM.yyyy'));

			ctrl.$parsers.push((value: string) => {
				if (!format.test(value)) return undefined;

				const parts = value.split('.');
				return new Date(
					parseInt(parts[2]),
					parseInt(parts[1]) - 1,
					parseInt(parts[0]),
					12, 0, 0, 0
				);
			});
		}
	};
}

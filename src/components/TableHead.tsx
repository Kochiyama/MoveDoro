import React from 'react';

export default function TableHead({ titles }) {
	return (
		<tr>
			{titles.map(title => {
				return <th>{title}</th>;
			})}
		</tr>
	);
}

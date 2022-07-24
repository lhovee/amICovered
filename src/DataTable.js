import { AiFillPhone } from "react-icons/ai";
import { Fragment } from "react";

function DataTable(props) {
return (
	<table className="data-table">
		<thead>
			<tr>
				<th>Name</th>
				<th>Practice Type</th>
				<th>Providers</th>
				<th>Address</th>
				<th>Contact</th>
			</tr>
		</thead>
		<tbody>
			{props.careProviders && props.careProviders.map((careProvider, index) => {
    		return <Fragment key={index}>
            <tr>
                <td>{careProvider.providerName}</td>
                <td>{careProvider.careTypes.map((careType, index) => {return careType})}</td>
                <td>
                    {careProvider.insuranceProviders.map((providerName, index) => {
                            return (<span>{providerName.lastIndexOf(providerName) ? `${providerName} ` :  `${providerName}, `}</span>);
                    })}
                </td>
                <td>
                    <td>{`${careProvider.street}, ${careProvider.city}, ${careProvider.state} ${careProvider.zip}`}</td>
    			</td>
                {/*TODO: not sure if this click will work on an html element? */}
                <td>{careProvider.phoneNumber && <span onClick={careProvider.number}><AiFillPhone /></span>}</td>
            </tr>
				</Fragment>
			})}
		</tbody>
	</table>
)}

export default DataTable;

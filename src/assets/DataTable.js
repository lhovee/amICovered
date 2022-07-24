import { AiFillPhone } from "react-icons/ai";
import { Fragment } from "react";

const careProviders = [
	{
		providerName: "Doctor Bob",
		phoneNumber: "(816) 228-4770",
		street: "Main Street",
		state: "Missouri",
		city: "Kansas City",
		zip: "64050",
		careType: "Family Doctor",
		insuranceProviders: ["BCBS of Kansas City", "Humana", "United Healthcare", "Missouri HealthNet", "CIGNA"],

	},
	{
		providerName: "Cockerell And Mcintosh Pediatrics",
		phoneNumber: "(816) 228-4770",
		street: "1203 SW State Route 7",
		state: "MO",
		city: "Blue Springs",
		zip: "64014",
		careType: "",
		insuranceProviders: ["BCBSof Kansas City", "Humana", "United Healthcare", "Missouri HealthNet", "CIGNA"],
	},
	{
		providerName: "Children's Mercy Adele Hall - Dental Clinic",
		phoneNumber:"(816) 234-3257",
		street: "2401 Gillham Rd",
		state: "MO",
		city: "Kansas City",
		zip: "64108",
		careType: "Dental Clinic",
		insuranceProviders: ["Blue Cross Blue Shield", "CIGNA"],
	},
	{
		providerName: "Children's Mercy College Boulevard",
		phoneNumber: "(913) 696-8000",
		street: "5520 College Boulevard",
		state: "KS",
		city: "Overland Park",
		zip: "66211",
		careType: "Speech/Language/Hearing",
		insuranceProviders: ["Blue Cross Blue Shield", "CIGNA"],
	},
	{
		providerName: "Children's Mercy Adele Hall - Heart Center",
		street: "2401 Gillham Rd",
		state: "MO",
		city: "Kansas City",
		zip: "64108",
		careType: "Pediatric Cardiology",
		insuranceProviders: ["Blue Cross Blue Shield", "CIGNA"],
	},
	{
		providerName: "Midtown Family Madicine",
		street: "3406 Broadway, Suite B",
		state: "MO",
		city: "Kansas City",
		zip: "64111",
		careType: "Famly Practice",
		insuranceProviders: ["AARP", "CIGNA", "Coventry", "Humana", "Medicare"],
	}
];

function DataTable() {
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
			{careProviders.map((careProvider, index) => {
    		return <Fragment key={index}>
					<tr>
        		<td>{careProvider.providerName}</td>
					</tr>
					<tr>
        		<td>{careProvider.careType}</td>
    			</tr>
    			<tr>
						<td>
								{careProvider.insuranceProviders?.map((providerName) => {
										return providerName;
								})}
						</td>
    			</tr>
    			<tr>
		        <td>{`${careProvider.street} + ${careProvider.state} + ${careProvider.city} + ${careProvider.zip}`}</td>
    			</tr>
    			<tr>
        		{/*TODO: not sure if this click will work on an html element? */}
        		<td>{careProvider.phoneNumber && <span onClick={careProvider.number}><AiFillPhone /></span>}</td>
    			</tr>
				</Fragment>
			})}
		</tbody>
	</table>
)}

export default DataTable;

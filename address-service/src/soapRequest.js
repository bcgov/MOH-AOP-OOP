
const zipCodeRequest = {
	url: 'https://graphical.weather.gov/xml/SOAP_server/ndfdXMLserver.php',
	request: `<soapenv:Envelope 
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
	xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
	xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
	xmlns:ndf="https://graphical.weather.gov/xml/DWMLgen/wsdl/ndfdXML.wsdl">
	<soapenv:Header/>
	<soapenv:Body>
	<ndf:LatLonListZipCode soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
		<zipCodeList xsi:type="xsd:string">$zipcode</zipCodeList>
	</ndf:LatLonListZipCode>
	</soapenv:Body>
</soapenv:Envelope>`,
	headers: {
		'user-agent': 'sampleTest',
		'Content-Type': 'text/xml;charset=UTF-8',
		'soapAction': 'https://graphical.weather.gov/xml/DWMLgen/wsdl/ndfdXML.wsdl#LatLonListZipCode'
	}
};

const addressValidationRequest = {
	url: process.env.ADDRESS_VALIDATOR_URL,
	request: `<soapenv:Envelope 
	xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
	xmlns:v4="http://validator5.AddressDoctor.com/Webservice5/v4">
   <soapenv:Header/>
   <soapenv:Body>
      <v4:Process>
         <v4:parameters>
            <v4:ProcessMode>FASTCOMPLETION</v4:ProcessMode>
         </v4:parameters>
         <v4:addresses>
            <v4:Address>
               <v4:Country>
                  <v4:string>{country}</v4:string>
               </v4:Country>
               <v4:AddressComplete>{address}</v4:AddressComplete>
            </v4:Address>
         </v4:addresses>
      </v4:Process>
   </soapenv:Body>
</soapenv:Envelope>`,
	headers: {
		'user-agent': 'node.js',
		'Content-Type': 'text/xml;charset=UTF-8'
	}
};

module.exports = { zip: zipCodeRequest, address: addressValidationRequest };
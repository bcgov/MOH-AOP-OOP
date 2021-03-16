export const log = () => {
  const baseUrl = this.appConstants['logBaseUrl'];
    // With Angular 5 we can't pass in undefined to the headers without runtime
    // errors, so now we default to 'n/a'.
    const refNumber = this.enrolDataService.application.referenceNumber ||
                      this.benefitDataService.benefitApp.referenceNumber ||
                      this.dataService.finAssistApp.referenceNumber ||
                      this.dataService.getMspAccountApp().referenceNumber ||
                      'n/a';

    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'logsource' : window.location.hostname,
        'timestamp' : moment().toISOString(),
        'program' : 'msp',
        'severity' : 'info',
        'referenceNumber' : refNumber,
        'applicationId' : this.getApplicationId(),
        'request_method' : request_method
    });
    const options = { headers: headers, responseType: 'text' as 'text' };

    const body = {
      meta: this.createMetaData(),
      body: logItem,
    };
}

export default {
  data: () => {
    return {
      selectedForm: "",
      submitterData: [],
      submissionData: [],
      supportingDocuments: []
    };
  },
  created() {
    switch (this.$store.state.uploadType) {
      case "AOP":
        this.selectedForm =
          "Diagnostic Facility Services Assignment of Payment and Medical Director Authorization (HLTH 1908)";
        break;
      case "COAOP":
        this.selectedForm =
          "Diagnostic Facility Services Cancellation of Assignment of Payment (HLTH 1926)";
        break;
      case "OOPA":
        this.selectedForm =
          "Laboratory Services Outpatient Operator Payment Administration (HLTH 2999)";
        break;
    }

    if (this.$store.state.uploadType === "AOP" || this.$store.state.uploadType === "COAOP") {
      this.submitterData = [
        { name: "First Name:", value: this.$store.state.firstName },
        { name: "Last Name:", value: this.$store.state.lastName },
        { name: "Email Address:", value: this.$store.state.emailAddress },
        { name: "Phone Number:", value: this.$store.state.phoneNumber },
        { name: "Phone Extension:", value: this.$store.state.phoneExtension },
        { name: "Organization:", value: this.$store.state.organization }
      ];
    } else {
      this.submitterData = [
        { name: "First Name:", value: this.$store.state.firstName },
        { name: "Last Name:", value: this.$store.state.lastName },
        { name: "Email Address:", value: this.$store.state.emailAddress },
        { name: "Phone Number:", value: this.$store.state.phoneNumber },
        { name: "Phone Extension:", value: this.$store.state.phoneExtension },
        { name: "Facility Name:", value: this.$store.state.facility }
      ];
    }

    if (this.$store.state.uploadType === "AOP" || this.$store.state.uploadType === "COAOP") {
      this.submissionData = [
        { name: "Practitioner Number:", value: this.$store.state.primaryNumber },
        { name: "Practitioner Last Name:", value: this.$store.state.primaryLastName },
        { name: "Comments:", value: this.$store.state.comments }
      ];
    } else {
      this.submissionData = [
        { name: "Primary Practitioner Number:", value: this.$store.state.primaryNumber },
        { name: "Primary Practitioner Last Name:", value: this.$store.state.primaryLastName },
        { name: "Secondary Practitioner Number:", value: this.$store.state.secondaryNumber },
        { name: "Secondary Practitioner Last Name:", value: this.$store.state.secondaryLastName },
        { name: "Comments:", value: this.$store.state.comments }
      ]
    }

    if (this.$store.state.uploadType === "AOP") {
      const label = this.$store.state.uploadedForms[0].name.slice(0, -7); 
      this.supportingDocuments = [ { name: 'HLTH 1908 Form:', value: label} ];
    } else if (this.$store.state.uploadType === "COAOP") {
      const label = this.$store.state.uploadedForms[0].name.slice(0, -7);
      this.supportingDocuments = [ { name: 'HLTH 1926 Form:', value: label } ];
    } else if (this.$store.state.uploadType === "OOPA") {
      const label = this.$store.state.uploadedForms[0].name.slice(0, -7);
      this.supportingDocuments = [ { name: 'HLTH 2999 Form:', value: label } ];
    }

    if (this.$store.state.uploadedCredentials && this.$store.state.uploadedCredentials.length > 0) {
      const label = this.$store.state.uploadedCredentials[0].name.slice(0, -7);
      const credentials = [ { name: "Credentials Document:", value: label } ];
      this.supportingDocuments = [...this.supportingDocuments, ...credentials];
    }
  }
};

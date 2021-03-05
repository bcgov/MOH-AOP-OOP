export const schema = {
  $id: 'AOPApplication.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  version: '1.0.0',
  definitions: {
    UploadTypeType: {
      type: 'string',
      enum: [
        'AOP',
        'COAOP',
        'OOPA'
      ]
    },
    CredentialsRequiredType: {
      type: 'boolean',
    },
    FirstNameType: {
      type: 'string',
    },
    LastNameType: {
      type: 'string',
    },
    EmailAddressType: {
      type: 'string',
    },
    PhoneNumberType: {
      type: 'string',
      pattern: '^[2-9]([0-9]{9})$'
    },
    OrganizationType: {
      type: 'string',
    },
    FacilityType: {
      type: 'string',
    },
    SubmissionTypeType: {
      type: 'string',
    },
    PrimaryNumberType: {
      type: 'string',
    },
    PrimaryLastNameType: {
      type: 'string',
    },
    SecondaryNumberType: {
      type: 'string',
    },
    SecondaryLastNameType: {
      type: 'string',
    },
    CommentsType: {
      type: 'string',
    },
    ContentType: {
      type: 'string',
      enum: [
        'image/jpeg',
        'application/pdf'
      ]
    },
    AttachmentUuidsType: {
      type: 'array',
      items: {
        type: 'string'
      },
      minItems: 1
    },
    AssignmentOfPaymentType: {
      type: 'object',
      properties: {
        uploadType: {
          $ref: '#/definitions/UploadTypeType'
        },
        credentialsRequired: {
          $ref: '#/definitions/CredentialsRequiredType'
        },
        firstName: {
          $ref: '#/definitions/FirstNameType'
        },
        lastName: {
          $ref: '#/definitions/LastNameType'
        },
        emailAddress: {
          $ref: '#/definitions/EmailAddressType'
        },
        phoneNumber: {
          $ref: '#/definitions/PhoneNumberType'
        },
        organization: {
          $ref: '#/definitions/OrganizationType'
        },
        facility: {
          $ref: '#/definitions/FacilityType'
        },
        submissionType: {
          $ref: '#/definitions/SubmissionTypeType'
        },
        primaryNumber: {
          $ref: '#/definitions/PrimaryNumberType'
        },
        primaryLastName: {
          $ref: '#/definitions/PrimaryLastNameType'
        },
        secondaryNumber: {
          $ref: '#/definitions/SecondaryNumberType'
        },
        secondaryLastName: {
          $ref: '#/definitions/SecondaryLastNameType'
        },
        comments: {
          $ref: '#/definitions/CommentsType'
        }
      },
      required: [
        'uploadType',
        'credentialsRequired',
        'firstName',
        'lastName',
        'emailAddress',
        'phoneNumber',
        'primaryNumber',
        'primaryLastName'
      ]
    },
    AttachmentType: {
      type: 'object',
      properties: {
        contentType: {
          $ref: '#/definitions/ContentType'
        },
        attachmentDocumentType: {
          type: 'string',
          enum: [
            'AOPFORM',
            'AOPCREDENTIAL'
          ]
        },
        attachmentUuid: {
          type: 'string'
        },
        attachmentOrder: {
          type: 'string'
        },
        description: {
          type: 'string'
        }
      },
      required: [
        'contentType',
        'attachmentDocumentType',
        'attachmentUuid'
      ]
    },
    AttachmentsType: {
      type: 'array',
      items: {
        attachment: {
          $ref: '#/definitions/AttachmentType'
        }
      }
    }
  },
  title: 'Application',
  type: 'object',
  properties: {
    assignmentOfPayment: {
      $ref: '#/definitions/AssignmentOfPaymentType'
    },
    uuid: {
      type: 'string'
    },
    attachments: {
      $ref: '#/definitions/AttachmentsType'
    }
  },
  required: [
    'assignmentOfPayment',
    'uuid',
    'attachments'
  ]
};


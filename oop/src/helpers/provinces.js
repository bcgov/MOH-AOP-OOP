export const provinceMap = {
    AB: 'Alberta',
    BC: 'British Columbia',
    MB: 'Manitoba',
    NB: 'New Brunswick',
    NL: 'Newfoundland and Labrador',
    NT: 'Northwest Territories',
    NS: 'Nova Scotia',
    NU: 'Nunavut',
    ON: 'Ontario',
    PE: 'Prince Edward Island',
    QC: 'Quebec',
    SK: 'Saskatchewan',
    YT: 'Yukon'
  };

export const getProvinceNameFromCode = (provinceCode) => {
    
    if (provinceCode && provinceMap[provinceCode]) {
      return provinceMap[provinceCode];
    }
    return provinceCode;
  };
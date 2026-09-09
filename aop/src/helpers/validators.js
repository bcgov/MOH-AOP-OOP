export const isValidPhone = (ph) => {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(ph);
};

export const isValidEmail = (email) => {
  return /^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9])\])$/i.test(
    email
  );
};

export const isValidLastName = (name) => {
  return /^([A-Z]+([.]?[ ]?[']?[-]?[A-Z]?)*)$/gi.test(name);
};

export const isValidSecondaryLastName = (name) => {
  return name === "" || /^([A-Z]+([.]?[ ]?[']?[-]?[A-Z]?)*)$/gi.test(name);
};

export const hasSecondaryNumber = (value, vm) => {
  const hasNumber = vm.secondaryNumber.length > 0;
  const hasNeither = vm.secondaryNumber.length < 1 && value.length < 1;
  return hasNeither || hasNumber;
};

export const hasSecondaryLastName = (value, vm) => {
  const hasLastName = vm.secondaryLastName.length > 0;
  const hasNeither = vm.secondaryLastName.length < 1 && value.length < 1;
  return hasNeither || hasLastName;
};

export const hasDistinctFiles = (value, vm) => {
  const credentialFileName = value && value[0] && value[0].name;
  const formFileName = vm.files && vm.files[0] && vm.files[0].name;
  return credentialFileName !== formFileName;
};

export const hasNoInvalidJSON = (val) => {
  return /^[^\\/"]*$/.test(val);
};

import routes from "./routes";

const steps = [
  { ...routes.SIGN_IN },
  { ...routes.SUBMISSION_INFO },
  { ...routes.REVIEW },
  { ...routes.SUBMISSION }
];

export default steps;

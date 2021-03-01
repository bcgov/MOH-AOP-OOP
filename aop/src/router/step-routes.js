import routes from "./routes";

const steps = [
  { ...routes.SIGN_IN },
  { ...routes.SUBMISSION_INFO },
  { ...routes.REVIEW },
  { ...routes.CONFIRMATION }
];

export default steps;

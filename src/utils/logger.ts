type loggerProp = {
  isError?: boolean;
  message: string;
};
export const logger = ({ isError, message }: loggerProp) => {
  !isError ? console.log(message) : console.error(message);
};

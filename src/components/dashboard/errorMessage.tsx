type PropType = {
  message?: string;
};

const ErrorMessage = (props: PropType) => {
  const { message } = props;

  return (
    <h5 className="text-sm font-semibold text-red-600">
      {message ? message : "Required"}
    </h5>
  );
};

export default ErrorMessage;

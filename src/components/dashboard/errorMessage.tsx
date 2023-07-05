type PropType = {
  alternateMessage?: string;
};

const ErrorMessage = (props: PropType) => {
  const { alternateMessage } = props;

  return (
    <h5 className="text-sm font-semibold text-red-600">
      {alternateMessage ? alternateMessage : "Required"}
    </h5>
  );
};

export default ErrorMessage;

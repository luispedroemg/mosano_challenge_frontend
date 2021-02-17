import React from 'react';

function ErrorMessage(props) {
  const { errors } = props;
  const errorList = errors.map((error) => (
    <div key={error.param}>{`${error.msg}${error.param ? ` on field: ${error.param}` : ''}`}</div>
  ));
  return (
    <div className="error">
      {errorList}
    </div>
  );
}

export default ErrorMessage;

import React from 'react';
import RegisterList from './RegisterList';

function RegisterListPaginated(props) {
  const {
    selectUser, registerList, totalUsers, setPage, userListPage,
  } = props;
  let { userListLimit } = props;
  if (!userListLimit) userListLimit = 2;

  const pages = [];
  if (totalUsers > 0) {
    const numPages = totalUsers / userListLimit;
    for (let pageIdx = 0; pageIdx < numPages; pageIdx += 1) {
      // eslint-disable-next-line react/jsx-filename-extension
      pages.push(<button key={pageIdx} type="button" onClick={() => setPage(pageIdx)} style={{ color: pageIdx === userListPage ? 'dodgerblue' : 'black' }}>{pageIdx}</button>);
    }
  }

  return (
    <div>
      <RegisterList registerList={registerList} selectUser={selectUser} />
      <div>{pages}</div>
      <div>{`Total: ${totalUsers}`}</div>
    </div>
  );
}

export default RegisterListPaginated;

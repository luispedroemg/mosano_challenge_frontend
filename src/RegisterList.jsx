import React from 'react';
import { useTranslation } from 'react-i18next';

import './RegisterList.css';

function RegisterList(props) {
  const { t } = useTranslation();
  const { registerList, onUserSelectCallback } = props;
  const currentListRows = registerList.map((listItem) => (
    // eslint-disable-next-line no-underscore-dangle
    <tr key={listItem._id} onClick={() => onUserSelectCallback(listItem)}>
      <td>{`${listItem.name} ${listItem.surname}`}</td>
      <td>{listItem.country.name}</td>
      <td>{new Date(listItem.birthday).toLocaleDateString('pt-PT')}</td>
    </tr>
  ));
  return (
    <div className="registerList">
      <table>
        <thead>
          <tr>
            <td>{t('Name')}</td>
            <td>{t('Country')}</td>
            <td>{t('Birthday')}</td>
          </tr>
        </thead>
        <tbody>
          {currentListRows}
        </tbody>
      </table>
    </div>
  );
}

export default RegisterList;

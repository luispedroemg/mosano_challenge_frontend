import React from 'react';
import { Trans } from 'react-i18next';

import './UserMessage.css';

function UserMessage(props) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const { selectedUser } = props;
  const birthdate = new Date(selectedUser.birthday);
  const nextBirthday = new Date(Date.now());
  nextBirthday.setMonth(birthdate.getMonth());
  nextBirthday.setDate(birthdate.getDate() + 1);
  const timeDiff = new Date(nextBirthday - birthdate);
  return (
    <div className="userMessage">
      <Trans
        i18nKey="userMessage"
        defaults="Hello {{name}} from {{country}}. On {{birthDay}} {{birthMonth}} you will have {{ageYears}} years"
        values={
          {
            name: `${selectedUser.name} ${selectedUser.surname}`,
            country: selectedUser.country.name,
            birthDay: birthdate.getDate(),
            birthMonth: monthNames[birthdate.getMonth()],
            ageYears: timeDiff.getUTCFullYear() - 1970,
          }
        }
      />
    </div>
  );
}

export default UserMessage;

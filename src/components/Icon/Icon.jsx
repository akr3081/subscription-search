import React from 'react';

export const ArrowIcon = (props) => (
  <svg height="48" viewBox="0 96 960 960" width="48" {...props}>
    <path
      d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const AddIcon = (props) => (
  <svg height="48" viewBox="0 96 960 960" width="48" {...props}>
    <path
      d="M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const RemoveIcon = (props) => (
  <svg height="48" viewBox="0 96 960 960" width="48" {...props}>
    <path d="M200 606v-60h560v60H200Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

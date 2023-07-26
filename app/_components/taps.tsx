'use client';

import React, { memo, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import classNames from 'classnames';
import { getLimitSplice } from '../_utils';

type TapProp = {
  data: any,
  limit?: number,
};

const TapWrapper = styled.div`
  display:inline-block;
  .default{
    opacity: 0;
    transition: 0.3s all ease-in-out;
    margin-top: -1.5em;
    display: block;
  }
  &:hover{
    .default{
      opacity: 1;
      margin-top: 0;
    }
  }
`;

const Taps = memo(({ data, limit = 5 } : TapProp) => {
  const [active, setActive] = useState(0);
  const [start, end] = getLimitSplice(data.length, active, limit);
  const displayLink = data.slice(start, end);
  return (
    <TapWrapper className="fixed top-63 right-0 px-2 pb-6 text-right">
      <ul>
        {
        displayLink.map((item:any) => (
          <li key={item.path} className={classNames({ default: item.index !== active })}>
            <Link
              href={`/other/${item.path}`}
              className="text-slate-500 hover:text-slate-950 dark:text-slate-300 dark:hover:text-slate-50"
              onClick={() => setActive(item.index)}
            >
              {item.path}
            </Link>
          </li>
        ))
      }
      </ul>
    </TapWrapper>
  );
});

export default Taps;

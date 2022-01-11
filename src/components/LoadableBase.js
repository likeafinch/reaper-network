import React from 'react';
import loadableBase from '@loadable/component';
import { default as Loading } from './Loading';

const loadable = (func) => loadableBase(func, { fallback: <Loading /> });

export default loadable;

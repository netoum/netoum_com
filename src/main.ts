import './style.css'
import '../src/components/menu.ts'
import '../src/components/clipboard.ts'

import { Themex } from '@netoum/themex';

const options = [
    {
      key: 'mode',
      default: 'light',
      values: ['light', 'dark']
    }
  ];
  
  new Themex(options);

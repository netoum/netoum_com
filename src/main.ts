import './style.css'
import '../src/components/menu'
import '../src/components/clipboard'

import { Themex } from '@netoum/themex';

const options = [
    {
      key: 'mode',
      default: 'light',
      values: ['light', 'dark']
    }
  ];
  
  new Themex(options);

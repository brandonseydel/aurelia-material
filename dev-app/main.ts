import { MaterialUI } from './../src/index';
import { DebugConfiguration } from '@aurelia/debug';
import { BasicConfiguration } from '@aurelia/jit-html-browser';
import { Aurelia, INode } from '@aurelia/runtime';
import { App } from './app';

global.au = new Aurelia()
  .register(BasicConfiguration, DebugConfiguration, MaterialUI.config(x => {
    x.prefix = 'meow';
  }))
  .app({
    host: document.querySelector('app') as INode,
    component: new App()
  })
  .start();



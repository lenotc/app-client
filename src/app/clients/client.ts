import {Region} from './region';
import {Bill} from '../bills/model/bill';

export class Client {
  id: number;
  name: string;
  alias: string;
  createAt: string;
  email: string;
  img: string;
  region: Region;
  bills: Bill[] = [];
}
